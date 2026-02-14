import Image from 'next/image';

interface AvatarProps {
    name: string;
    initialAvatar?: string;
    uploadAvatar?: (file: File) => void;
    size?: number;
}

export default function Avatar({ name, initialAvatar, uploadAvatar, size = 112 }: AvatarProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!uploadAvatar) return;

        const file = e.target.files?.[0];
        if (file && file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            uploadAvatar(file);
        }
    };

    return (
        <div className="flex justify-center">
            <div
                className="relative h-28 w-28 rounded-full border border-zinc-700 overflow-hidden cursor-pointer"
                style={{ width: size, height: size }}
            >
                {!!initialAvatar ? (
                    <Image src={initialAvatar} alt="avatar" fill className="object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-700 text-white text-4xl font-bold">
                        {name[0].toUpperCase()}
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}
