import { AuthProvider } from "@/context/AuthContext";
import { router } from "@/router/routes";
import { PrimeReactProvider } from "primereact/api";
import { ConfirmDialog } from "primereact/confirmdialog";

import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <PrimeReactProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        draggable
        newestOnTop={true}
        theme="colored"
      />
      <ConfirmDialog />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PrimeReactProvider>
  );
}
