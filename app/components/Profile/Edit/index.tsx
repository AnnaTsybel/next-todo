'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfile } from '@/app/features/users/hooks';
import { User, UpdateUserData } from '@/app/features/users/types';
import { profileSchema, ProfileFormData } from '@/app/features/users/validation';
import { FormInput } from '../../ui/FormInput';

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
        <div className="relative flex min-h-screen items-center justify-center px-4 z-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md rounded-2xl p-6 shadow bg-card"
            >
                <h1 className="mb-4 text-center text-xl font-semibold">Edit profile</h1>
                <div className="space-y-3">
                    <FormInput placeholder="Name" register={register('name')} error={errors.name} />
                    <FormInput
                        placeholder="Surname"
                        register={register('surname')}
                        error={errors.surname}
                    />
                </div>
                <div className="mt-6 flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting || isPending}
                        className="flex-1 w-full rounded-lg px-4 py-2 text-md bg-accent text-button font-semibold cursor-pointer"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-zinc-700 px-4 py-2 text-sm cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
