import Header from '../components/header'
import Nav from '../components/nav'
import Playlist from '../components/playlist'
import PlayerControls from '../components/playerControls'
import Activity from '../components/activity'
import { useState, useEffect } from 'react'
import UploadModal from '../components/UploadModal'
import useSpotify from '../hooks/useSpotify'
import style from '../styles/UploadModal.module.css'
//import {songs} from '../data/songs.js'

const HomePage = () => {
  const [showUploadMusic, setShowUploadMusic] = useState(false)
  const [title, setTitle] = useState('')
  const [musicUrl, setMusicUrl] = useState('')
  const [songs, setSongs] = useState([])

  const { newMusic, getSongs } = useSpotify(
    musicUrl,
    title,
    setTitle,
    setMusicUrl,
    setShowUploadMusic,
  )


   useEffect(() => {
     getSongs().then(songs => {
       setSongs(songs)
     })
   }, [])
   
  return (
    <div className='flex'>
      <Nav />
      <div className='w-full'>
        <Header setShowUploadMusic={setShowUploadMusic} />
        <Playlist songs={songs} />
        <PlayerControls songs={songs} />
        {showUploadMusic && (
          <UploadModal
            title={title}
            setTitle={setTitle}
            setShowUploadMusic={setShowUploadMusic}
            musicUrl={musicUrl}
            setMusicUrl={setMusicUrl}
            newMusic={newMusic}
          />
        )}
	<button onClick={() => getSongs().then(songs => {
       setSongs(songs)
     })}
     className={`${style.button} ${style.createButton}`}>Reload</button>
      </div>
      <Activity />
    </div>
  )
}

export default HomePage
