import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import WelcomePage from "../pages/WelcomePage";
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import ChatPage from "@/pages/ChatPage"; 
import OverlayPage  from "@/pages/OverlayPage";
// TODO: Steps to add a new route:
// 1. Create a new page component in the '../pages/' directory (e.g., NewPage.tsx)
// 2. Import the new page component at the top of this file
// 3. Define a new route for the page using createRoute()
// 4. Add the new route to the routeTree in RootRoute.addChildren([...])
// 5. Add a new Link in the navigation section of RootRoute if needed

// Example of adding a new route:
// 1. Create '../pages/NewPage.tsx'
// 2. Import: import NewPage from '../pages/NewPage';
// 3. Define route:
//    const NewRoute = createRoute({
//      getParentRoute: () => RootRoute,
//      path: '/new',
//      component: NewPage,
//    });
// 4. Add to routeTree: RootRoute.addChildren([HomeRoute, NewRoute, ...])
// 5. Add Link: <Link to="/new">New Page</Link>

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: WelcomePage,
});

export const SecondPageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/onboarding1",
  component: SecondPage,
});

export const ThirdPageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/onboarding2",
  component: ThirdPage,
});

export const ChatPageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/chat",
  component: ChatPage,
});

export const OverlayPageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/overlay",
  component: OverlayPage,
});


export const rootTree = RootRoute.addChildren([HomeRoute, SecondPageRoute, ThirdPageRoute, ChatPageRoute, OverlayPageRoute]);
