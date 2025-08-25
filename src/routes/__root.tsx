import React from "react";
import BaseLayout from "@/layouts/BaseLayout";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";

export const RootRoute = createRootRoute({
  component: Root,
});

function Root() {
  const location = useLocation();

  if (location.pathname == "/overlay"){
    return <Outlet />;
  }
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}
