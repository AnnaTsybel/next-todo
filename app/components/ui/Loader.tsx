import { Loader2 } from 'lucide-react';

export function Loader() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
        </div>
    );
}
