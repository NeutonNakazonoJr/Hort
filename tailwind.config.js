import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                gradient: {
                    'blue': '#3700FF',    
                    'purple': '#9700E2',  
                    'pink': '#FF2ABD'     
                },
                dark: {
                    'primary': '#575757'
                }
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(147deg, var(--tw-gradient-from) 0%, var(--tw-gradient-middle) 50%, var(--tw-gradient-to) 100%)',
            },
            gradientColorStops: {
                'from': 'var(--tw-gradient-from, #3700FF)',
                'middle': 'var(--tw-gradient-middle, #9700E2)',
                'to': 'var(--tw-gradient-to, #FF2ABD)',
            },
        },
    },

    plugins: [
        forms,
        function({ addUtilities }) {
            const newUtilities = {
                '.bg-gradient-custom': {
                    '--tw-gradient-from': '#3700FF',
                    '--tw-gradient-middle': '#9700E2',
                    '--tw-gradient-to': '#FF2ABD',
                    'background-image': 'linear-gradient(147deg, var(--tw-gradient-from) 0%, var(--tw-gradient-middle) 50%, var(--tw-gradient-to) 100%)',
                },
            };
            addUtilities(newUtilities);
        },
    ],
};