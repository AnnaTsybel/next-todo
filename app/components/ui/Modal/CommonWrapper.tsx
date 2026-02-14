'use client';

import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { closeModal } from '@app/store/modals/slice';

interface Props {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const ModalCommonWrapper: React.FC<Props> = ({ children, title = '', className = '' }) => {
    const dispatch = useDispatch();

    return (
        <div
            className={`
                w-[416px]
                p-6
                rounded-2xl
                bg-card
                ${className}
            `}
        >
            <div className="flex items-center justify-between mb-6">
                <p className="font-semibold text-[20px] leading-[160%]">{title}</p>

                <button
                    onClick={() => dispatch(closeModal())}
                    className="
                        p-0
                        m-0
                        border-0
                        bg-transparent
                        outline-none
                        appearance-none
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                    "
                >
                    <X className="text-foreground" />
                </button>
            </div>

            <div>{children}</div>
        </div>
    );
};
