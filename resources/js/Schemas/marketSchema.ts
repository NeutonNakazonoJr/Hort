import ValidationSchema from "@/Helpers/ValidationField";

export interface Market {
    id?: string,
    name: string,
    nickname: string
}

const marketSchema = new ValidationSchema<Market>();
marketSchema.string('name').required('Market name is required').min(3, 'The market name must be at least 3 characters');
marketSchema.string('nickname').required('The market nickname is required').min(3, 'The market nickname must be at least 3 characters');

export default marketSchema;