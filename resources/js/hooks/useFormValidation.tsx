import { useRef, useState, useCallback } from 'react';

export type ValidationErrors<T> = {
    [K in keyof T]?: string[];
};

export type ValidationSchema<T> = {
    validate: (data: Partial<T>) => ValidationErrors<T>;
};

interface UseFormValidationProps<T> {
    schema: ValidationSchema<T>;
    initialValues?: Partial<T>;
}

export default function useFormValidation<T extends Record<string, any>>({ 
    schema,
    initialValues = {}
}: UseFormValidationProps<T>) {
    const [errors, setErrors] = useState<ValidationErrors<T>>({});
    const [values, setValues] = useState<Partial<T>>(initialValues);
    
    const fieldsRef = useRef<Record<keyof T, HTMLInputElement | null>>({} as Record<keyof T, HTMLInputElement | null>);

    const register = useCallback((fieldName: keyof T) => {
        return {    
            ref: (element: HTMLInputElement | null) => {
                fieldsRef.current[fieldName] = element;
            },
            onBlur: () => handleBlur(fieldName),
            value: values[fieldName] || '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;
                setValues(prev => ({
                    ...prev,
                    [fieldName]: newValue
                }));
            }
        };
    }, [values]);

    const handleBlur = useCallback((fieldName: keyof T) => {
        const fieldValue = fieldsRef.current[fieldName]?.value || '';
        
        const fieldData = {
            [fieldName]: fieldValue
        } as Partial<T>;
        
        const validationResult = schema.validate(fieldData);
        
        setErrors(prev => ({
            ...prev,
            [fieldName]: validationResult[fieldName] || []
        }));
    }, [schema]);

    const validateAll = useCallback(() => {
        const formData = Object.keys(fieldsRef.current).reduce((acc, key) => ({
            ...acc,
            [key]: fieldsRef.current[key as keyof T]?.value || ''
        }), {} as Partial<T>);

        const validationErrors = schema.validate(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [schema]);

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
    }, [initialValues]);

    return {
        register,
        errors,
        values,
        validateAll,
        reset,
        handleBlur,
        isValid: Object.keys(errors).length === 0
    };
}