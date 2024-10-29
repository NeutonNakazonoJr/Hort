
type ValidationResult = {
    isValid: boolean;
    errors: string[];
};
  
type ValidationRule = {
    validate: (value: any) => boolean;
    message: string;
};
  
class FieldValidator {
    protected rules: ValidationRule[] = [];
  
    protected addRule(rule: ValidationRule): this {
        this.rules.push(rule);
        return this;
    }
  
    validate(value: any): ValidationResult {
        const errors: string[] = [];
    
        for (const rule of this.rules) {
            if (!rule.validate(value)) {
                errors.push(rule.message);
            }
        }
  
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
  
class StringValidator extends FieldValidator {

    min(length: number, message: string): this {
        return this.addRule({
            validate: (value: string) => {
                if (typeof value !== 'string') return false;
                return value.length >= length;
            },

            message
        });
    }
  
    max(length: number, message: string): this {
        return this.addRule({
            validate: (value: string) => {
                if (typeof value !== 'string') return false;
                return value.length <= length;
            },
            message
        });
    }
  
    required(message: string): this {
        return this.addRule({
            validate: (value: string) => {
                if (typeof value !== 'string') return false;
                return value.trim().length > 0;
            },
            message
        });
    }
  
    email(message: string): this {
        return this.addRule({
            validate: (value: string) => {
                if (typeof value !== 'string') return false;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message
        });
    }
  
    matches(pattern: RegExp, message: string): this {
        return this.addRule({
            validate: (value: string) => {
                if (typeof value !== 'string') return false;
                return pattern.test(value);
            },
            message
        });
    }
}
  

export default class ValidationSchema<T extends Record<string, any>> {
    private validators: Map<keyof T, FieldValidator> = new Map();
  
    string(field: keyof T): StringValidator {
        const validator = new StringValidator();
        this.validators.set(field, validator);
        return validator;
    }
  
    validate(data: Partial<T>): Record<keyof T, string[]> {
        const errors: Partial<Record<keyof T, string[]>> = {};
  
        for (const [field, validator] of this.validators.entries()) {
            const value = data[field];
            const result = validator.validate(value);
    
            if (!result.isValid) {
                errors[field] = result.errors;
            }
        }
  
        return errors as Record<keyof T, string[]>;
    }
}
  
 