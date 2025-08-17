export const ONBOARDING_ROUTES = [
    "/",
    "/onboarding1",
    "/onboarding2",
    "/chat",
] as const;

export type OnboardingRoute = typeof ONBOARDING_ROUTES[number];