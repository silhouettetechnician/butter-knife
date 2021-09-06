import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useAudioPlayer } from "react-use-audio-player"

const Player = ({ file, isDark }) => {
    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: file,
        format: "mp3",
        autoplay: false,
        onend: () => console.log("sound has ended!")
    })

    if (!ready && !loading) return <div>PLAY</div>
    if (loading) return <div>LOADING...</div>

    return (
        <div id='content-desktop' style={{marginTop: '5px', fontFamily: 'CODE1 !important'}}>
            {playing ? <button style={{fontFamily: 'CODE1 !important', fontWeight: 1000, color: `${isDark ? 'white' : 'black'}`, display: 'flex', border: 'unset', alignItems: 'center', fontSize: '1.2rem'}} onClick={togglePlayPause}><FontAwesomeIcon style={{color: `${isDark ? 'white' : 'black'}`, margin: '3px'}}icon={faPause} color='black' size='l' />Pause</button>
                :
                <button style={{fontFamily: 'CODE1 !important', fontWeight: 1000, color: `${isDark ? 'white' : 'black'}`, display: 'flex', border: 'unset', alignItems: 'center', fontSize: '1.2rem'}} onClick={togglePlayPause}><FontAwesomeIcon style={{color: `${isDark ? 'white' : 'black'}`, margin: '3px'}}icon={faPlay} color='black' size='l' />Play</button>}

        </div>
    )
}

export default Player
