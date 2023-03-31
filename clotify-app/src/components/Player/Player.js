import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./Player.module.css";

import ReactPlayer from "react-player/youtube";
import PlayerButton from "./PlayerButton/PlayerButton";
import MuteIcon from "./../../assets/PlayerIcons/MuteIcon";
import UnmuteIcon from "./../../assets/PlayerIcons/UnmuteIcon";
import NextIcon from "./../../assets/PlayerIcons/NextIcon";
import PrevIcon from "./../../assets/PlayerIcons/PrevIcon";
import PlayIcon from "./../../assets/UI/PlayIcon";
import StopIcon from "./../../assets/PlayerIcons/StopIcon";

const getProgressDisplayValue = (time) => {
  let sec_num = parseInt(time, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) hours = "0" + hours;

  if (minutes < 10) minutes = "0" + minutes;

  if (seconds < 10) seconds = "0" + seconds;

  if (parseInt(hours) === 0) {
    return minutes + ":" + seconds;
  } else {
    return hours + ":" + minutes + ":" + seconds;
  }
};

const Player = () => {
  const progressInputRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeValue, setVolumeValue] = useState(30);

  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState(0);

  const playHandler = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const muteHandler = () => {
    setIsMuted((prevState) => !prevState);
  };

  const changeVolumeValueHandler = (e) => {
    setVolumeValue(e.target.value);
  };

  const changeProgressHandler = (e) => {
    setProgress(e.target.value);
    progressInputRef.current.seekTo(e.target.value);
  };

  const { currentSong, currentPlaylist } = useSelector((state) => state.home);

  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [playingSong, setPlayingSong] = useState({});

  useEffect(() => {
    if (currentPlaylist.songs) {
      setPlayingSong(currentPlaylist.songs[currentPlaylistIndex] ? currentPlaylist.songs[currentPlaylistIndex] : {});
    } else {
      setPlayingSong(currentSong);
    }
  }, [currentSong, currentPlaylist, currentPlaylistIndex]);

  useEffect(() => {
    const resetIndex = () => {
      setCurrentPlaylistIndex(0);
    };
    resetIndex();
  }, [currentPlaylist.songs]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPlaying(true);
    }, 200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [playingSong.audio]);

  return (
    <div className={styles.player}>
      <ReactPlayer
        url={playingSong ? playingSong.audio : ""}
        ref={progressInputRef}
        playing={isPlaying}
        muted={isMuted}
        volume={volumeValue / 100}
        onProgress={(prog) => {
          setProgress(prog.playedSeconds);
        }}
        onDuration={(d) => {
          setDuration(d);
        }}
        onEnded={() => {
          setCurrentPlaylistIndex((prevState) => (prevState += 1));
          setProgress(0);
          setDuration(0);
        }}
      />

      <div className={styles.controls}>
        <div className={styles["song-info"]}>
          {playingSong.name && (
            <>
              <img src={playingSong.image ? playingSong.image : currentPlaylist.image} alt="Album Cover" />
              <div>
                <h6>{playingSong.name}</h6>
                <p>{playingSong.author ? playingSong.author : currentPlaylist.author}</p>
              </div>
            </>
          )}
        </div>
        <div>
          <div className={styles["play-buttons"]}>
            <PlayerButton
              onClick={() => {
                setCurrentPlaylistIndex((prevState) => {
                  if (prevState === 0) return prevState;
                  return (prevState -= 1);
                });
              }}
              disabled={
                currentSong.audio
                  ? true
                  : !currentPlaylist.songs
                  ? true
                  : !currentPlaylist.songs[currentPlaylistIndex - 1]
                  ? true
                  : false
              }
            >
              <PrevIcon></PrevIcon>
            </PlayerButton>
            <PlayerButton onClick={playHandler} featured={true}>
              {!isPlaying ? <PlayIcon></PlayIcon> : <StopIcon></StopIcon>}
            </PlayerButton>
            <PlayerButton
              onClick={() => {
                setCurrentPlaylistIndex((prevState) => {
                  if (!currentPlaylist.songs[prevState + 1]) return prevState;
                  return (prevState += 1);
                });
              }}
              disabled={
                currentSong.audio
                  ? true
                  : !currentPlaylist.songs
                  ? true
                  : !currentPlaylist.songs[currentPlaylistIndex + 1]
                  ? true
                  : false
              }
            >
              <NextIcon></NextIcon>
            </PlayerButton>
          </div>
          <div className={styles["progress-input"]}>
            <p>{getProgressDisplayValue(progress)}</p>
            <input type="range" min="0" max={duration} value={progress} onInput={changeProgressHandler}></input>
            <p>{duration ? getProgressDisplayValue(duration) : ""}</p>
          </div>
        </div>
        <div className={styles["sound-controls"]}>
          <PlayerButton onClick={muteHandler}>
            {isMuted ? <UnmuteIcon></UnmuteIcon> : <MuteIcon></MuteIcon>}
          </PlayerButton>
          <input
            type="range"
            min="0"
            max="100"
            value={!isMuted ? volumeValue : 0}
            onInput={changeVolumeValueHandler}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Player;
