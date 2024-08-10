import { RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Products from "./components/Products";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/store";
import Cart from "./components/Cart";
import { PersistGate } from "redux-persist/integration/react";
import Reset from "./components/Reset";
import ResetPasswor from "./components/ResetPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const appRouter = createHashRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    { path: "/cart", element: <Cart /> },
    { path: "/reset", element: <Reset /> },
    { path: "/reset/password", element: <ResetPassword /> },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
}
export default App;
