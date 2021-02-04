import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import { I18nextProvider } from "react-i18next";
import i18n from "./language/i18n";

import { Provider } from "react-redux";
import store from "./redux/store";

// Libraries that kept the state even the browser refresh
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

// Libraries that kept the state even the browser refresh
const persistor = persistStore(store)

ReactDOM.render( 
  <Provider store={store}>
    <PersistGate
      loading={<div>Loading..</div>}
      persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
    </PersistGate>
  </Provider>,  
  document.getElementById("root")
);
