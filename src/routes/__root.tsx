import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanstackDevtools } from "@tanstack/react-devtools";

import ConvexProvider from "../integrations/convex/provider";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <ConvexProvider>
          <Outlet />
          <TanstackDevtools
            config={{
              position: "bottom-left",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </ConvexProvider>
      </>
    );
  },
});
