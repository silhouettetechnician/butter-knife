import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
// import SlavicAudio from '../assets/music/Slavic_LOFI.mp3'
// import ToykoAudio from '../assets/music/Toyko_LOFI.mp3'
// import DavidRenderBobbin from '/David_Render_Bobbin.mp3'
import { useAudioPlayer } from "react-use-audio-player"

const Player = ({ file }) => {
    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: file,
        format: "mp3",
        autoplay: false,
        onend: () => console.log("sound has ended!")
    })

    if (!ready && !loading) return <div>PLAY</div>
    if (loading) return <div>LOADING...</div>

    return (
        <div style={{marginTop: '5px'}}>
            {playing ? <button style={{display: 'flex', alignItems: 'center', fontSize: '1.2rem'}}onClick={togglePlayPause}><FontAwesomeIcon style={{margin: '3px'}}icon={faPause} color='black' size='l' />Pause</button>
                :
                <button style={{display: 'flex', alignItems: 'center', fontSize: '1.2rem'}}onClick={togglePlayPause}><FontAwesomeIcon style={{margin: '3px'}}icon={faPlay} color='black' size='l' />Play</button>}

        </div>
    )
}

export default Player
// const useAudio = url => {
//     const [audio] = useState(new Audio(url));
//     const [playing, setPlaying] = useState(false);

//     const toggle = () => setPlaying(!playing);

//     useEffect(() => {
//         playing ? audio.play() : audio.pause();
//     },
//         [playing]
//     );

//     useEffect(() => {
//         audio.addEventListener('ended', () => setPlaying(false));
//         return () => {
//             audio.removeEventListener('ended', () => setPlaying(false));
//         };
//     }, []);

//     return [playing, toggle];
// };

// const Player = ({ url }) => {
//     const [playing, toggle] = useAudio(url);

//     return (
//         <div>
//         <button style={{fontSize: '1.2rem'}}onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//       </div>

//     )
// }

// export default Player