// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import systemReducer from './Slice/systemSlice';

const persistConfig = {
    key: 'shop/system',
    storage,
};

const systemConfig = {
    ...persistConfig,
    whitelist: ['language']
}


const systemReducers = persistReducer(systemConfig, systemReducer);

export const store = configureStore({
    reducer: {
        system: systemReducers
    },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export const persistor = persistStore(store)