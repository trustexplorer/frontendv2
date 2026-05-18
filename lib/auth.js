/**
 * Shared auth bootstrap helper.
 * Call this once inside a useEffect in protected pages/components.
 * It hydrates the Zustand store from localStorage on first mount,
 * and redirects to login if no token is found.
 *
 * Usage:
 *   import { bootstrapAuth } from "@/lib/auth";
 *   useEffect(() => bootstrapAuth(token, setToken, router, "/login"), []);
 */
export function bootstrapAuth(token, setToken, router, loginPath = "/login") {
  const stored = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token && stored) {
    // Hydrate store from localStorage (happens after SSR)
    setToken(stored);
    return;
  }

  if (!token && !stored) {
    // No token at all — redirect immediately, no setTimeout
    router.replace(loginPath);
  }
}

/**
 * Get the current token: prefer store, fall back to localStorage.
 * Used in components that need the token outside of React context.
 */
export function getToken(storeToken) {
  if (storeToken) return storeToken;
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
}

/**
 * Clear all auth state and redirect to login.
 */
export function logout(clearToken, router) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
  clearToken();
  router.replace("/login");
}
