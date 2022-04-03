import clsx from 'clsx';

export default function Button({
    children,
    className = '',
    variants = 'primary',
    ...rest
}) {
    return (
        <button
            {...rest}
            className={clsx(
                'py-2 px-4 rounded font-bold hover:text-primary-400 animated-underline',
                'border duration-300',
                'focus:outline-none focus-visible:text-primary-400 focus:shadow-outline',
                {
                    'bg-blue-lightDark text-white hover:bg-blue-dark ':
                        variants === 'primary',
                    'bg-red-500 text-white hover:bg-red-600 ':
                        variants === 'error',
                    'bg-white text-gray-600 hover:bg-gray-200 hover:text-dark focus-visible:text-dark':
                        variants === 'secondary'
                },
                className
            )}
        >
            {children}
        </button>
    );
}
