import React from 'react';

export type CustomSkeletonProps = {
    width?: number | string;
    height?: number | string;
    variant?: 'rounded' | 'circle';
    className?: string;
};

export const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
    width,
    height,
    variant = 'rounded',
    className = '',
}) => {
    const shapeClass = variant === 'circle' ? 'rounded-full' : 'rounded-md';

    return (
        <div
            className={`bg-zinc-700 dark:bg-zinc-600 animate-pulse ${shapeClass} ${className}`}
            style={{ width, height }}
        />
    );
};
