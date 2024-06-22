import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

//reducers
import historyReducer from "./reducers/common/history";
import missionReducer from "./reducers/Mission/mission";
import userReducer from "./reducers/Auth/user";
import familyReducer from "./reducers/common/family";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    history: historyReducer,
    mission: missionReducer,
    user: userReducer,
    family: familyReducer,
  })
);

const myMiddlewares = [logger];
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(myMiddlewares),
});

export const persistor = persistStore(store);
