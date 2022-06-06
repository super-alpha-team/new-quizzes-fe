import Button from 'components/helpers/Button';
import Sound from 'react-sound';
import { useState } from 'react';

export default function AudioComp() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div>
            <Sound
                url="/audio/audio.mp3"
                playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                onFinishedPlaying={() => setIsPlaying(false)}
            />
            <Button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? 'Pause' : 'Play'}
            </Button>
        </div>
    );
}