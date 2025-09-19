import { usePage } from '@inertiajs/react';

interface CsrfDebugProps {
    showInProduction?: boolean;
}

export function CsrfDebug({ showInProduction = false }: CsrfDebugProps) {
    const isDevelopment = import.meta.env.DEV;
    const { props } = usePage();
    
    // Only show in development unless explicitly requested
    if (!isDevelopment && !showInProduction) {
        return null;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    return (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-xs font-mono max-w-sm z-50">
            <div className="font-bold text-gray-900 mb-2">🔒 CSRF Debug Info</div>
            <div className="space-y-1">
                <div>
                    <span className="text-gray-600">Meta Token:</span> 
                    <span className={`ml-2 ${csrfToken ? 'text-green-600' : 'text-red-600'}`}>
                        {csrfToken ? '✓ Present' : '✗ Missing'}
                    </span>
                </div>
                <div>
                    <span className="text-gray-600">Session:</span> 
                    <span className="ml-2 text-blue-600">
                        {props.auth ? '✓ Authenticated' : '- Guest'}
                    </span>
                </div>
                <div className="text-gray-500 pt-1 border-t">
                    Environment: {isDevelopment ? 'Development' : 'Production'}
                </div>
            </div>
        </div>
    );
}