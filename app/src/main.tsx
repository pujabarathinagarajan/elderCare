import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import store from "./authStore/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import "highlight.js/styles//a11y-dark.min.css";
import "./assets/css/main.css";
import "@ionic/react/css/core.css";
import router from "./router.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <React.StrictMode>
        <Toaster />
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="mb-2 w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Loading...
                </h2>
              </div>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </React.StrictMode>
    </I18nextProvider>
  </Provider>
);
