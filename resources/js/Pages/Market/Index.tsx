import { FormField } from '@/Components/partials/FormField';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useFormValidation from '@/hooks/useFormValidation';
import marketSchema from '@/Schemas/marketSchema';
import useToast from '@/hooks/useToast';
import { router, usePage } from '@inertiajs/react'

interface MarketForm {
    name: string;
    nickname: string;
    
    city: string,
    street: string,
    district: string,
    zipCode: string
    
}

interface Market {
    name: string,
    nickname: string,
    city: string,
    street: string,
    district: string,
    zipCode: string
}

export default function MarketPage({ newMarket }: { newMarket: Market }) {

    const showToast = useToast();

    const { 
        register,
        errors,
        validateAll,
        isValid,
        values
    } = useFormValidation<MarketForm>({
        schema: marketSchema,
        initialValues: {
            name: '',
            nickname: '',
            city: '',
            street: '',
            district: '',
            zipCode: ''
            
        }
    });

    const handleSubmit = () => {

        const isValidData = validateAll();

        if (!isValidData) return;
        
        router.post('/market', values, {
            onError: (errors) => {
                showToast.error(Object.values(errors).join(' e '))                
            },
            onSuccess: () => {
                showToast.success('Market registered successfully.');
            }
        })
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <form>
                <FormField
                    { ...register('name') }
                    label="Market Name"                
                    error={errors.name?.[0]}
                />                
                <FormField
                    {...register('nickname')}
                    label="Market Nickname"                
                    error={errors.nickname?.[0]}
                />
                <FormField
                    {...register('city')}
                    label="City"                
                    error={errors.city?.[0]}
                />
                <FormField
                    {...register('street')}
                    label="Street"                
                    error={errors.street?.[0]}
                />
                <FormField
                    {...register('district')}
                    label="District"                
                    error={errors.district?.[0]}
                />
                <FormField
                    {...register('zipCode')}
                    label="Zip Code"                
                    error={errors.zipCode?.[0]}
                />
                <button            
                    // disabled={isValid}
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </AuthenticatedLayout>
    )
}