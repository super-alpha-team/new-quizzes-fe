import React from 'react';
import { useRouter } from 'next/router';

function Header() {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-dark p-5 top-0 w-full">
            <div className="w-full flex-grow grid grid-cols-3 lg:items-center lg:w-auto">
                <div></div>
                {router.pathname == '/home' ? (
                    <div className="flex gap-4 text-white justify-center">
                        <div>Launch</div>
                        <div>Reports</div>
                        <div>Live Result</div>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="flex items-center gap-2 justify-end">
                    <p className="text-white">Name</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 cursor-pointer text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </nav>
    );
}

export default Header;
