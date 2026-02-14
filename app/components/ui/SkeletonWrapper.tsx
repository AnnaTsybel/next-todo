import React from 'react';

import { CustomSkeleton } from './Skeleton';

export type SkeletonWrapperProps = {
    children: React.ReactNode;
    isLoading: boolean;
    width?: number | string;
    height?: number | string;
    variant?: 'rounded' | 'circle';
};

export const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
    children,
    isLoading,
    width,
    height,
    variant = 'rounded',
}) => {
    return isLoading ? (
        <CustomSkeleton width={width} height={height} variant={variant} />
    ) : (
        <>{children}</>
    );
};
