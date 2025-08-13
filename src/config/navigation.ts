export const ONBOARDING_ROUTES = [
    "/",
    "/onboarding1",
    "/onboarding2",
    // "onboarding-complete",
] as const;

export type OnboardingRoute = typeof ONBOARDING_ROUTES[number];