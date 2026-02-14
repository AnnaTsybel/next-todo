'use client';

import React, { useEffect } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '@app/store';
import { closeModal } from '@app/store/modals/slice';

export const Modal = () => {
    const dispatch = useAppDispatch();

    const { content, canBeClosed, onClose } = useAppSelector((state: RootState) => state.modals);

    const removeModal = () => {
        if (!canBeClosed) return;

        dispatch(closeModal());
        onClose && onClose();
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];

        body.classList.toggle('overflow-hidden', Boolean(content));

        return () => {
            body.classList.remove('overflow-hidden');
        };
    }, [content]);

    if (!content) return null;

    return (
        <div
            className="
                fixed inset-0 z-20
                flex items-center justify-center
                p-5
                bg-black/85
            "
            onClick={removeModal}
        >
            <div
                className="
                    max-h-screen
                    relative
                "
                onClick={stopPropagation}
            >
                {content}
            </div>
        </div>
    );
};
