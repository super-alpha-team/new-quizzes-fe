/* eslint-disable @next/next/no-img-element */
import { BigHead } from '@bigheads/core';
import { shuffleArray, TEAM_MEMBERS } from 'utils/helpers';

function OurTeam() {
    return (
        <section className="text-gray-600 body-font pt-16 px-12 w-full h-full flex flex-col bg-qgray-light">
            <div className="w-full h-full">
                <div className="flex flex-col text-center w-full mb-4">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">OUR TEAM</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{`We are Alpha, a group with a passion for programming, this is our thesis project, hope you like this application, do not hesitate to reach out to us.`}</p>
                </div>
                <div className="w-full h-full flex flex-wrap justify-center gap-2 pb-16">
                    {shuffleArray(TEAM_MEMBERS).map((member, index) =>
                        <div className="p-4 lg:w-1/4 md:w-1/2 rounded-md shadow-sm bg-white" key={index}>
                            <div className="h-full flex flex-col items-center text-center">
                                <div className='w-24 h-24'>
                                    <BigHead />
                                </div>
                                <div className="w-full">
                                    <h2 className="title-font font-medium text-lg text-gray-900">{member.name}</h2>
                                    <h3 className="text-gray-500 mb-3">{member.role}</h3>
                                    <p className="mb-4">{member.message}</p>
                                    <span className="inline-flex">
                                        <a className="text-gray-500" href={member.facebook}>
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                            </svg>
                                        </a>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                            </svg>
                                        </a>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>)}
                </div>
                <div className='flex justify-center mb-4 text-black'>From Alpha team with 💖</div>
            </div>
        </section >
    );
}

export default OurTeam;