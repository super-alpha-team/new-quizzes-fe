import { useState } from 'react';
import Sound from 'react-sound';

export default function SoundSetup({ soundUrl = "/audio/audio.mp3" }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const activeSound = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:cursor-pointer hover:text-qgray-dark text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
    );

    const muteSound = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:cursor-pointer hover:text-qgray-dark text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
    );

    return (
        <>
            <Sound
                url={soundUrl}
                playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                onFinishedPlaying={() => setIsPlaying(false)}
            />
            <div onClick={() => setIsPlaying(!isPlaying)}>
                {!isPlaying ? muteSound : activeSound}
            </div>
        </>
    );
}