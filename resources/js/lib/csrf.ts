/**
 * CSRF Token utilities for ensuring proper token handling
 */

/**
 * Get the CSRF token from the meta tag
 */
export function getCsrfToken(): string | null {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? null;
    return token;
}

/**
 * Set up CSRF token for Axios requests (if using Axios)
 */
export function setupCsrfToken(): void {
    const token = getCsrfToken();
    
    if (token) {
        // Set default headers for axios if available
        if (typeof window !== 'undefined' && window && 'axios' in window) {
            const windowWithAxios = window as { axios?: { defaults: { headers: { common: Record<string, string> } } } };
            if (windowWithAxios.axios) {
                windowWithAxios.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
            }
        }
    }
}

/**
 * Initialize CSRF protection
 */
export function initializeCsrfProtection(): void {
    // Ensure CSRF token is available
    if (typeof document !== 'undefined') {
        setupCsrfToken();
        
        // Log CSRF token status for debugging
        const token = getCsrfToken();
        if (!token) {
            console.warn('CSRF token not found in meta tag. This may cause 419 errors.');
        }
    }
}