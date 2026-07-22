const REF_KEY = 'ss_ref';

/**
 * Capture the ?ref= param from the URL into localStorage so it survives
 * navigation, modal opens, and page reloads. Called once on app load.
 */
export function captureRef() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref) {
    localStorage.setItem(REF_KEY, ref);
  }
}

/**
 * Get the stored referrer user_profiles.id, if any.
 */
export function getStoredRef(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REF_KEY);
}
