'use client';

import { useState } from 'react';

import ProfileEdit from '@/app/components/Profile/Edit';
import ProfileView from '@/app/components/Profile/View';
import LavaLamp from '@/app/components/ui/Lavalamp';
import { useProfile } from '@/app/features/users/hooks';

export default function ProfilePage() {
    const { data: profile, isLoading, isError } = useProfile();
    const [isEditing, setIsEditing] = useState(false);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
                Loading profile...
            </div>
        );
    }

    if (isError || !profile) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-red-400">
                Failed to load profile
            </div>
        );
    }

    return (
        <>
            <LavaLamp />
            {isEditing ? (
                <ProfileEdit
                    profile={profile}
                    onCancel={() => setIsEditing(false)}
                    onSuccess={() => setIsEditing(false)}
                />
            ) : (
                <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
            )}
        </>
    );
}
