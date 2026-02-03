// ThemeToggler.tsx (Server Component)
import dynamic from 'next/dynamic';

const ThemeTogglerClient = dynamic(() => import('./ThemeTogglerClient'), {
    ssr: false,
});

export const ThemeToggler = () => {
    return <ThemeTogglerClient />;
};
