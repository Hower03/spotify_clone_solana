import { useContext } from "react"
import { SpotifyContext } from "../context/context"
import Image from "next/image"
import next from "../assets/next.svg"
import previous from "../assets/previous.svg"
import speaker from "../assets/speaker.svg"
import repeat from "../assets/repeat.svg"
import shuffle from "../assets/shuffle.svg"
import playRounded from "../assets/playRounded.svg"
import pauseIcon from "../assets/pause.svg"

const styles = {
  albumCoverContainer: `w-20 h-20 mr-3`,
  coverPhoto: `object-cover`,
  mainControl: `fixed bottom-0 left-0 p-5 py-3 pr-10 w-screen bg-[#242424] z-40 flex items-center justify-between`,
  // range: `appearance-none mx-3 hover:bg-[#000] h-1 hover:bg-[#22C55E] bg-[#fff] w-[500px]`,
  // volumeRange: `mx-3 -hue-rotate-90 h-1`,
  flexCenter: `flex items-center`,
  controlIcon: `mr-5 cursor-pointer hover:opacity-100 opacity-50`,
  playIcon: `mr-5 w-10 h-10 cursor-pointer hover:opacity-50`,
  pauseIconStyle: `mt-3 w-10 h-10 cursor-pointer hover:opacity-50`,
  controlIconsContainer: `flex items-center justify-center mb-2`,
}

const PlayerControls = ({songs}) => {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    onVolumeChange, 
    timestamp, 
    progress, 
    playNext, 
    playPrevious, 
    isPaused, 
    play, 
    pause, 
    onProgressChange } = useContext(SpotifyContext)

  if(!isPlaying) return null

  /** Show component if song is playing */
  return (
    <div className={styles.mainControl}>
      
      <div className={styles.flexCenter}>
        <div className={styles.albumCoverContainer}>
          <Image
            src='https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png'
            // src={currentSong.cover}
            className={styles.coverPhoto}
            height={200}
            width={200}
            alt='song-cover'
          />
        </div>
        <div>
          <p>{currentSong.title}</p>
          <p className='opacity-50'>{'artist'}</p>
          {/* <p className='opacity-50'>{currentSong.artiste}</p> */}
        </div>
      </div>

      <div>
        <div className={styles.controlIconsContainer}>
          <div className={styles.controlIcon}>
            <Image src={shuffle} alt='shuffle' />
          </div>
          <div onClick={e => playPrevious(songs)} className={styles.controlIcon}>
            <Image src={previous} alt='previous' />
          </div>

        {isPaused ? <div className={styles.playIcon} onClick={play}><Image src={playRounded} alt="playRounded" /></div>
          : <div className={styles.pauseIconStyle} onClick={pause}><Image src={pauseIcon} alt="pauseIcon" /></div>}

          <div onClick={e => playNext(songs)} className={styles.controlIcon}>
            <Image src={next} alt='next' />
          </div>
          <div className={styles.controlIcon}>
            <Image src={repeat} alt='repeat' />
          </div>
        </div>
        <div className={styles.flexCenter}>
          <small>{timestamp}</small>
          <input
            value={progress}
            type='range'
            onChange={e => onProgressChange(e)}
            className={styles.range}
          />
          <small>{'2:43'}</small>
          {/* <small>{currentSong.songLength}</small> */}
        </div>
      </div>

      <div>
        <div className={styles.flexCenter}>
          <Image src={speaker} alt="speaker" />
          <input 
          value={volume} 
          onChange={e => onVolumeChange(e)} 
          type='range' 
          id='volume-range' />
        </div>
      </div>
    </div >
  )
}

export default PlayerControls

