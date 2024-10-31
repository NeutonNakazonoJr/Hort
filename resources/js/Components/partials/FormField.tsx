import { forwardRef, ForwardedRef } from 'react';
import InputDefault from '@/Components/partials/InputDefault';

type InputType = 
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'file'
  | 'radio'
  | 'checkbox';

interface InputDefaultProps {
    type?: InputType;
    error?: string;
    value?: string | number | readonly string[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
}

interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputDefaultProps>, InputDefaultProps {
    label?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ 
        error, 
        label, 
        wrapperClassName, 
        labelClassName,
        errorClassName,
        className,
        ...props 
    }, ref) => {
        return (
            <div className={'text-dark-primary font-medium ' + wrapperClassName}>
                {label && (
                    <label className={labelClassName}>
                        {label}
                    </label>
                )}
                <InputDefault
                    ref={ref as ForwardedRef<HTMLInputElement>}
                    error={error}
                    className={className}
                    {...props}
                />
            </div>
        );
    }
);


export type { InputType, InputDefaultProps, FormFieldProps };