import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./reducers";
import { weatherApi } from "./services/weather.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cityApi } from "./services/city.service";
import { locationApi } from "./services/location.service";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		}).concat([
			weatherApi.middleware,
			cityApi.middleware,
			locationApi.middleware,
		]);
	},
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
