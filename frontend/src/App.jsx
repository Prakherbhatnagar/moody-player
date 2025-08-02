import { useState } from 'react'
import FaceDetection from './components/FaceDetection'
import MoodSongs from './components/MoodSongs'

function App() {
  const [songs, setsongs] = useState([]);


  return (
    <div className='bg-pink-300 p-3 md:p-15 md:flex justify-between'>
      <FaceDetection setsongs={setsongs} />
      <MoodSongs songs={songs}/>
    </div>
  )
}

export default App
