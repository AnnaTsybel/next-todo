import { User } from '@/app/features/users/types';
import Avatar from '../../Avatar';
import { useUploadAvatar } from '@/app/features/users/hooks';

export default function ProfileView({ profile, onEdit }: { profile: User; onEdit: () => void }) {
    const { mutateAsync: uploadAvatar } = useUploadAvatar();

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex justify-center">
                    <Avatar
                        name={profile.name}
                        initialAvatar={profile.avatar_url}
                        uploadAvatar={uploadAvatar}
                    />
                </div>

                <div className="mt-4 text-center">
                    <h1 className="text-xl font-semibold">
                        {profile.name} {profile.surname}
                    </h1>
                    <p className="text-sm text-zinc-400">{profile.email}</p>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                    <Info label="Name" value={profile.name} />
                    <Info label="Surname" value={profile.surname} />
                    <Info label="Email" value={profile.email} />
                </div>

                <div className="mt-6">
                    <button
                        onClick={onEdit}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500"
                    >
                        Edit profile
                    </button>
                </div>
            </div>
        </div>
    );
}

function Info({ label, value }: { label: string; value?: string }) {
    return (
        <div className="flex justify-between rounded-lg border border-zinc-800 p-3">
            <span className="text-zinc-400">{label}</span>
            <span>{value}</span>
        </div>
    );
}
