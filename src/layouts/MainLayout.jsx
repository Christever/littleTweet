import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      {/* Header */}
      {/* <Header /> */}
      {/* Content */}
      <div className="w-full">
        <Outlet />
      </div>

      {/* Footer */}
    </>
  );
}
