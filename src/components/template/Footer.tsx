import React from "react";
import { ONBOARDING_ROUTES } from "@/config/navigation";
import { useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRouteIndex = ONBOARDING_ROUTES.findIndex((route) => route === location.pathname);
  console.log('current route:', ONBOARDING_ROUTES[currentRouteIndex]);

  return (
    <footer className="font-tomorrow text-muted-foreground inline-flex justify-between text-[0.7rem] uppercase px-2">
      {/* <p>Howy</p> */}
      
      <Button variant="outline" 
      size="lg" 
      aria-label="Previous" 
      disabled={currentRouteIndex === 0}
      onClick={() => navigate({ to: ONBOARDING_ROUTES[currentRouteIndex - 1] })}
      >
      <ChevronLeft />
      </Button>
    
    <Button variant="outline" 
      size="lg" 
      aria-label="Next" 
      disabled={currentRouteIndex === ONBOARDING_ROUTES.length - 1}
      onClick={() => navigate({ to: ONBOARDING_ROUTES[currentRouteIndex + 1] })}
      >
    <ChevronRight />

    </Button>
    </footer>
  );
}
