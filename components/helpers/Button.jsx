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
                'inline-block p-1 rounded-sm hover:text-primary-400 animated-underline capitalize font-semibold hover:opacity-80',
                ' duration-100',
                'focus:outline-none focus-visible:text-primary-400 focus:shadow-outline',
                {
                    'bg-blue-lightDark text-white hover:bg-blue-dark ':
                        variants === 'primary',
                    'bg-red-500 text-white hover:bg-red-600 ':
                        variants === 'error',
                    'bg-white text-gray-600 hover:bg-gray-200 hover:text-dark focus-visible:text-dark':
                        variants === 'secondary',
                    'bg-qpurple-light text-white shadow-[0_3px_0_0_#46178f] ':
                    variants === 'qpurple',
                },
                className
            )}
        >
            {children}
        </button>
    );
}
