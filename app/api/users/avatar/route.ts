import { NextRequest, NextResponse } from 'next/server';

import { getUserIdFromCookies } from '@/app/lib/auth';
import { ApiError, ErrorMessages, handleError } from '@/app/lib/errors';
import { supabaseSrv } from '@/app/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);
        }

        const formData = await req.formData();
        const file = formData.get('avatar');

        if (!file || !(file instanceof File)) {
            throw new ApiError(ErrorMessages.USER.AVATAR.NO_IMAGE, 400);
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(file.type))
            throw new ApiError(ErrorMessages.USER.AVATAR.INVALID_TYPE, 400);

        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) throw new ApiError(ErrorMessages.USER.AVATAR.SIZE, 400);

        const { data: userData, error: userError } = await supabaseSrv
            .from('users')
            .select('avatar_url')
            .eq('id', userId)
            .single();

        if (userError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        if (userData?.avatar_url) {
            const oldFilePath = `users/${userId}.webp`;

            const { error: deleteError } = await supabaseSrv.storage
                .from('avatars')
                .remove([oldFilePath]);

            if (deleteError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);
        }

        const fileExt = file.type.split('/')[1];
        const filePath = `users/${userId}.${fileExt}`;

        const { error: uploadError } = await supabaseSrv.storage
            .from('avatars')
            .upload(filePath, file, {
                upsert: true,
                contentType: file.type,
                cacheControl: '3600',
            });

        if (uploadError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        const { data: urlData } = supabaseSrv.storage.from('avatars').getPublicUrl(filePath);

        const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

        const { error: updateError } = await supabaseSrv
            .from('users')
            .update({
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (updateError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({
            ok: true,
        });
    } catch (error) {
        return handleError(error);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userId = await getUserIdFromCookies();

        if (!userId) {
            throw new ApiError(ErrorMessages.AUTH.UNAUTHORIZED, 401);
        }

        const { data: userData, error: userError } = await supabaseSrv
            .from('users')
            .select('avatar_url')
            .eq('id', userId)
            .single();

        if (userError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        if (!userData?.avatar_url) {
            throw new ApiError(ErrorMessages.USER.AVATAR.NO_DELETE_IMAGE, 404);
        }

        const filePath = `users/${userId}.webp`;

        const { error: deleteError } = await supabaseSrv.storage.from('avatars').remove([filePath]);

        if (deleteError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        const { error: updateError } = await supabaseSrv
            .from('users')
            .update({
                avatar_url: null,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (updateError) throw new ApiError(ErrorMessages.COMMON.SERVER_ERROR, 500);

        return NextResponse.json({
            ok: true,
        });
    } catch (error) {
        return handleError(error);
    }
}
