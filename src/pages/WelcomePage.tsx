import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Footer from "@/components/template/Footer";
import InitialIcons from "@/components/template/InitialIcons";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { ONBOARDING_ROUTES, OnboardingRoute } from "@/config/navigation";



export default function WelcomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(`${location.pathname} is the current path`);
  console.log(ONBOARDING_ROUTES);
  const currentRouteIndex = ONBOARDING_ROUTES.findIndex((route) => route === location.pathname);


  console.log('prev route:', ONBOARDING_ROUTES[currentRouteIndex - 1] );
  
  console.log('current route:', ONBOARDING_ROUTES[currentRouteIndex]);
  console.log('next route:', ONBOARDING_ROUTES[currentRouteIndex + 1]);

    
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <InitialIcons />
        <span>
          <h1 className="font-mono text-4xl font-bold">{t("appName")}</h1>
          <p
            className="text-muted-foreground text-end text-sm uppercase"
            data-testid="pageTitle"
          >
            {t("titleHomePage")}
          </p>
        </span>
        <LangToggle />
        <ToggleTheme />

        {/* <Button onClick={() => navigate({ to: "/second-page" })}>Go to Second Page</Button> */}
      </div>
      <Footer />
    </div>
  );
}
