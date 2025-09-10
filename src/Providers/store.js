// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice'; // Adjust the import path as necessary

// const store = configureStore({
//     reducer: {
//         currentUser: userReducer
//     },
// });

// export default store;


// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage use karega

const persistConfig = {
    key: "root",
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        currentUser: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist ke liye
        }),
});

export const persistor = persistStore(store);
export default store;
