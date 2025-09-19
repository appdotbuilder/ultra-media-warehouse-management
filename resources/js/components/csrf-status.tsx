import { Alert, AlertDescription } from '@/components/ui/alert';

export function CsrfStatus() {
    const isDevelopment = import.meta.env.DEV;
    
    // Only show in development
    if (!isDevelopment) {
        return null;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    if (!csrfToken) {
        return (
            <Alert className="border-red-200 bg-red-50 mb-4">
                <div className="text-red-600">⚠️</div>
                <AlertDescription className="text-red-800">
                    <strong>CSRF Token Missing:</strong> This may cause 419 Page Expired errors. 
                    Make sure the meta tag is properly set in app.blade.php.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Alert className="border-green-200 bg-green-50 mb-4">
            <div className="text-green-600">✅</div>
            <AlertDescription className="text-green-800">
                <strong>CSRF Protection Active:</strong> Token is properly configured.
            </AlertDescription>
        </Alert>
    );
}