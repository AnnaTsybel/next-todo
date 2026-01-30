'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfile } from '@/app/features/users/hooks';
import { User, UpdateUserData } from '@/app/features/users/types';
import { profileSchema, ProfileFormData } from '@/app/features/users/validation';

export default function ProfileEdit({
    profile,
    onCancel,
    onSuccess,
}: {
    profile: User;
    onCancel: () => void;
    onSuccess: () => void;
}) {
    const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        values: {
            name: profile.name,
            surname: profile.surname ?? '',
        },
        mode: 'onBlur',
    });

    function onSubmit(data: ProfileFormData) {
        const payload: UpdateUserData = {
            name: data.name,
            surname: data.surname || undefined,
        };

        updateProfile(payload);

        onSuccess();
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
                <h1 className="mb-4 text-center text-xl font-semibold">Edit profile</h1>

                <div className="space-y-3">
                    <div>
                        <input
                            {...register('name')}
                            className="w-full rounded bg-zinc-800 px-3 py-2 text-sm"
                            placeholder="Name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register('surname')}
                            className="w-full rounded bg-zinc-800 px-3 py-2 text-sm"
                            placeholder="Surname"
                        />
                        {errors.surname && (
                            <p className="mt-1 text-xs text-red-400">{errors.surname.message}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting || isPending}
                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm disabled:opacity-50"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-zinc-700 px-4 py-2 text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
