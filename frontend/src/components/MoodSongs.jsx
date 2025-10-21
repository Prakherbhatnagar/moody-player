import React, { useState } from 'react'

const MoodSongs = ({songs}) => {

    const [isPlaying, setisPlaying] = useState(null);

    const handlePlayPause=(idx)=>{
        if(isPlaying==idx){
            setisPlaying(null);
        }
        else{
            setisPlaying(idx);
        }
    }
    
    return (
        <div className='m-3 md:w-1/2'>
            {songs.map((song,idx)=>(
                <div key={idx} className='flex justify-between md:mb-4 md:p-2 p-4'>
                    <div>
                        <h2>Title: {song.title}</h2>
                        <h3>Artist: {song.artist}</h3>
                    </div>
                    <div>
                        {
                            isPlaying === idx && <audio src={song.audio} style={{display: 'none'}} 
                            autoPlay={isPlaying==idx}
                            ></audio>
                        }
                        <button onClick={() => handlePlayPause(idx)}>
                            {isPlaying===idx ? <i className="ri-pause-line"></i>
                            :<i className="ri-play-fill"></i>}
                        </button>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MoodSongs