import React, { useState, useCallback, ReactNode } from 'react';
import { X } from 'phosphor-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';
type Toast = {
    id: string;
    message: string;
    type: ToastType;
};

const ToastContext = React.createContext<{
    addToast: (message: string, type: ToastType) => void;
    removeToast: (id: string) => void;
} | null>(null);

interface ToastProviderProps {
    children: ReactNode;
}

const ProgressBar = ({ type }: { type: ToastType }) => {
    const getProgressColor = () => {
        switch (type) {
            case 'success': return 'bg-teal-500';
            case 'error': return 'bg-red-500';
            case 'info': return 'bg-blue-400';
            case 'warning': return 'bg-yellow-400';
        }
    };

    return (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
            <div 
                className={`h-full animate-progress-shrink ${getProgressColor()}`}
            />
        </div>
    );
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Math.random().toString(36);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <style>
                {`
                    @keyframes progress-shrink {
                        from {
                            width: 100%;
                        }
                        to {
                            width: 0%;
                        }
                    }
                    
                    .animate-progress-shrink {
                        animation: progress-shrink 4s linear forwards;
                    }
                `}
            </style>
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-80">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
                            relative min-w-[300px] p-4 rounded-md shadow-lg flex items-center justify-between
                            ${toast.type === 'success' && 'bg-teal-700 text-white'}
                            ${toast.type === 'error' && 'bg-red-700 text-white'}
                            ${toast.type === 'info' && 'bg-blue-500 text-white'}
                            ${toast.type === 'warning' && 'bg-yellow-500 text-white'}
                            animate-in slide-in-from-right-full overflow-hidden
                        `}
                    >
                        <span>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-4 hover:opacity-70"
                        >
                            <X size={20} />
                        </button>
                        <ProgressBar type={toast.type} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return {
        toast: (message: string, type: ToastType = 'info') => {
            context.addToast(message, type);
        },
        success: (message: string) => {
            context.addToast(message, 'success');
        },
        error: (message: string) => {
            context.addToast(message, 'error');
        },
        info: (message: string) => {
            context.addToast(message, 'info');
        },
        warning: (message: string) => {
            context.addToast(message, 'warning');
        },
    };
};

export default useToast;