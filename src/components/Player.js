import React, { useState, useEffect } from "react";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <div>
        <button style={{fontSize: '1.2rem'}}onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      </div>
        // <ThemeToggler>
        //     {({ theme, toggleTheme }) => (
        //         <div className='dark-button'>
        //             <input id='toggle' type='checkbox' onChange={e => {toggleTheme(e.target.checked ? "light" : "dark"); toggle()}} checked={theme === "light"}/>
        //             <label for='toggle'></label>
        //             {/* <button value={playing ? theme === 'dark' : theme === 'light'} onClick={() => {toggle; toggleTheme(playing ? 'dark' : 'light')}
        //             }>
        //                 {playing ? "Pause" : "Play"}
        //             </button> */}
        //         </div>
        //     )}
        // </ThemeToggler>
    )
}

export default Player