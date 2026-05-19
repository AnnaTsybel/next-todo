import type { Metadata } from 'next';

import { DashBoard } from '@components/Dashboard';

export const metadata: Metadata = {
    title: 'Planner',
    description: 'Planner dashboard for tasks and schedules',
};

export default function Home() {
    return <DashBoard />;
}
