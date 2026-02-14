import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import modals from '@app/store/modals/slice';

export const store = configureStore({
    reducer: {
        modals,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Hook dispatch for redux toolkit */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Hook useSelector hook for redux toolkit */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
