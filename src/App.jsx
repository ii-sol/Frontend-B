import { RouterProvider } from "react-router-dom";
import MainRouter from "./router/main-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/stores";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={MainRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;
