import { FormField } from '@/Components/partials/FormField';
import useFormValidation from '@/hooks/useFormValidation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import marketSchema from '@/Schemas/marketSchema';
import { Head } from '@inertiajs/react';
import useToast from '@/hooks/useToast';

interface MarketForm {
  name: string;
  nickname: string;
}

export default function Dashboard() {
    const showToast = useToast()

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
            nickname: ''
        }
    });

    const handleSubmit = () => {
        if (validateAll()) {
            console.log('Form is valid, submit data');
        }
        showToast.error('Register success.')
        console.log(values);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className='flex flex-col gap-6'>
                <FormField
                    { ...register('name') }
                    label="Market Name"
                    placeholder="Type the name..."
                    error={errors.name?.[0]}
                />
                
                <FormField
                    {...register('nickname')}
                    label="Market Nickname"
                    placeholder="Type the nickname..."
                    error={errors.nickname?.[0]}
                />
                
                <button            
                    // disabled={isValid}
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </AuthenticatedLayout>
    );
}