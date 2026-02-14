import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export interface ModalsState {
    content: ReactNode | null;
    canBeClosed: boolean;
    onClose: (() => void) | null;
}

const initialState: ModalsState = {
    content: null,
    canBeClosed: true,
    onClose: null,
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<{
                content: ReactNode;
                onClose?: () => void;
                canBeClosed?: boolean;
            }>,
        ) => {
            state.content = action.payload.content;
            state.onClose = action.payload.onClose ?? null;
            state.canBeClosed = action.payload.canBeClosed ?? true;
        },
        closeModal: state => {
            state.content = null;
            state.onClose = null;
            state.canBeClosed = true;
        },
    },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
