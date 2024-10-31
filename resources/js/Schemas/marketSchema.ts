import ValidationSchema from "@/Helpers/ValidationField";

export interface Market {
    id?: string,
    name: string,
    nickname: string,
    city: string,
    street: string,
    district: string,
    zipCode: string
}

const marketSchema = new ValidationSchema<Market>();
marketSchema.string('name').required('Market name is required').min(3, 'The market name must be at least 3 characters');
marketSchema.string('nickname').required('The market nickname is required').min(3, 'The market nickname must be at least 3 characters');
marketSchema.string('city').required('The market city is required').min(3, 'The market city must be at least 3 characters');
marketSchema.string('street').required('The market street is required').min(3, 'The market street must be at least 3 characters');
marketSchema.string('district').required('The market distric is required').min(3, 'The market distric must be at least 3 characters');
marketSchema.string('zipCode').required('The market zipCode is required').min(3, 'The market zipCode must be at least 3 characters');

export default marketSchema;