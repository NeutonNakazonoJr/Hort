import { Warning } from 'phosphor-react'
import React, { forwardRef } from 'react'

type InputType = 
    | 'text'
    | 'password'
    | 'email'
    | 'url'
    | 'tel'
    | 'search'
    | 'number'
    | 'range'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'file'
    | 'checkbox'
    | 'radio'
    | 'color'
    | 'hidden'
    | 'button'
    | 'submit'
    | 'reset'
    | 'image';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: InputType;
    className?: string;
    error?: string;
}

const InputDefault = forwardRef<HTMLInputElement, InputProps>(({ 
    type, 
    className,
    error,
    ...props
}, ref) => {
    return (
        <div className="relative w-full">
            <input 
                ref={ref}
                type={type || 'text'} 
                className={`
                    w-full
                    border
                    border-gradient-blue
                    focus:border-gradient-blue
                    focus:ring-2
                    focus:ring-gradborder-gradient-blue
                    focus:ring-opacity-50
                    focus:outline-none
                    transition-colors
                    duration-200
                    rounded-md
                    px-3
                    py-2
                    text-base
                    ${className || ''}
                `}
                {...props}
            />
            {error && 
                <div className='flex gap-1 absolute'>
                    <Warning size={16} color='#991B1B' className='self-center'/>
                    <span className='text-sm text-red-800'>{error}</span>
                </div>
            }
        </div>
    )
});

// Add display name for better debugging
InputDefault.displayName = 'InputDefault';

export default InputDefault;