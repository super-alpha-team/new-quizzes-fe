/* eslint-disable @next/next/no-img-element */
import PlatformHeader from 'components/app/platform/PlatformHeader';
import { useRouter } from 'next/router';

function Application() {
    const router = useRouter();
    function navigate() {
        router.push('articles/0');
    }
    return (
        <div>
            <PlatformHeader />
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-col px-5 pt-24 justify-center items-center">
                    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded border-2 border-qgray" alt="hero" src="/image/demo2.png" />
                    <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">New Quizzes - Play quizzes in a whole new exciting way.</h1>
                        <p className="mb-8 leading-relaxed text-justify">A real-time interactive multiple-choice Web application for learners with a variety of question types. At the same time, it helps the teacher in customizing the configuration of the questions, monitoring the game play as well as viewing the achieved results and exporting the report.
                            <br />A Mobile application on Android and iOS for learners, supporting real-time interactive quizzes.</p>
                        <div className="flex w-full justify-center items-end">
                            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                                <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">Receive our news</label>
                                <input type="text" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-qpurple-light focus:bg-transparent border border-gray-300 focus:border-qpurple text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button className="inline-flex text-white bg-qpurple border-0 py-2 px-6 focus:outline-none hover:bg-qpurple-light rounded text-lg">Subcribe</button>
                        </div>
                        <p className="text-sm mt-2 text-gray-500 mb-8 w-full">Download Mobile app now.</p>
                        <div className="flex">
                            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                                    <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z" />
                                </svg>
                                <span className="ml-4 flex items-start flex-col leading-none">
                                    <span className="text-xs text-gray-600 mb-1">GET IT ON</span>
                                    <span className="title-font font-medium">Google Play</span>
                                </span>
                            </button>
                            <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 305 305">
                                    <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z" />
                                    <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z" />
                                </svg>
                                <span className="ml-4 flex items-start flex-col leading-none">
                                    <span className="text-xs text-gray-600 mb-1">Download on the</span>
                                    <span className="title-font font-medium">App Store</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-gray-600 body-font">
                <div className="container px-5 pt-5 pb-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        <div className="p-4 lg:w-1/3">
                            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">#HowTo</h2>
                                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Configuring LTI Pro 1.3 for Moodle</h1>
                                <p className="leading-relaxed mb-3">Detailed instructions on how to configuaration LTI Pro 1.3 New Quizzes for Moodle LMS.</p>
                                <a className="text-qpurple hover:text-qpurple-light inline-flex items-center cursor-pointer" onClick={navigate}>Learn More
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                                    <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                        <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>1.2K
                                    </span>
                                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                        <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>6
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 lg:w-1/3">
                            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">#More</h2>
                                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">About Us</h1>
                                <p className="leading-relaxed mb-3">Get to know more about our team and how we make this New Quizzes.</p>
                                <a className="text-qpurple hover:text-qpurple-light inline-flex items-center cursor-pointer" onClick={navigate}>Learn More
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                                    <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                        <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>1.2K
                                    </span>
                                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                        <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>6
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Application;