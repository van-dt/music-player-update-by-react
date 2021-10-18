import React, { useState, useRef } from "react";

import "./style/App.scss";

import song1_img from "./assets/img/song1.jpg";
import song1_path from "./assets/mp3/song1.mp3";
import song2_img from "./assets/img/song2.jpg";
import song2_path from "./assets/mp3/song2.mp3";
import song3_img from "./assets/img/song3.jpg";
import song3_path from "./assets/mp3/song3.mp3";
import song4_img from "./assets/img/song4.jpg";
import song4_path from "./assets/mp3/song4.mp3";
import song5_img from "./assets/img/song5.jpg";
import song5_path from "./assets/mp3/song5.mp3";
import song6_img from "./assets/img/song6.jpg";
import song6_path from "./assets/mp3/song6.mp3";

const songs = [
  {
    name: "At My Worst",
    singer: "PinkSweet",
    path: song1_path,
    image: song1_img,
  },
  {
    name: "Lovely",
    singer: "BillieEilish,Khalid",
    path: song2_path,
    image: song2_img,
  },
  {
    name: "Let Her Go",
    singer: "Passenger",
    path: song3_path,
    image: song3_img,
  },
  {
    name: "Love Yourself",
    singer: "JustinBieBer",
    path: song4_path,
    image: song4_img,
  },
  {
    name: "I Do",
    singer: "911",
    path: song5_path,
    image: song5_img,
  },
  {
    name: "One Call Away",
    singer: "CharliePuth",
    path: song6_path,
    image: song6_img,
  },
];
const PlayList = ({ songs, option, like }) => {
  const list = songs.map((song, index) => {
    return (
      <div key={index} className="song">
        <div className="song-item nr">
          <h5>{index + 1}</h5>
        </div>
        <div className="song-item title">
          <h6>{song.name}</h6>
        </div>
        <div className="song-item icon" onClick={like}>
          <i className="far fa-heart"></i>
        </div>
      </div>
    );
  });
  return <div className={`playlist ${option}`}>{list}</div>;
};

const Control = ({
  option,
  optionPlay,
  playCallback,
  preCallback,
  nextCallback,
}) => {
  return (
    <div className={`control ${option}`}>
      <div className="btn pre-btn" onClick={preCallback}>
        <i className="fas fa-step-backward"></i>
      </div>
      <div className={`btn play-btn ${optionPlay}`} onClick={playCallback}>
        <i className="fas fa-play"></i>
        <i className="fas fa-pause"></i>
      </div>
      <div className="btn next-btn" onClick={nextCallback}>
        <i className="fas fa-step-forward"></i>
      </div>
    </div>
  );
};

const Footer = ({
  option,
  optionLike,
  optionRepeat,
  optionShuffle,
  likeCallback,
  repeatCallback,
  shuffleCallback,
}) => {
  return (
    <div className={`footer ${option}`}>
      <div className={`footer-icon love ${optionLike}`} onClick={likeCallback}>
        <i className="far fa-heart"></i>
      </div>
      <div
        className={`footer-icon repeat ${optionRepeat}`}
        onClick={repeatCallback}
      >
        <i className="fas fa-redo"></i>
      </div>
      <div
        className={`footer-icon shuffle ${optionShuffle}`}
        onClick={shuffleCallback}
      >
        <i className="fas fa-random"></i>
      </div>
      <div className="footer-icon options">
        <i className="fas fa-ellipsis-h"></i>
      </div>
    </div>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [option, setOption] = useState("");
  const [optionPlay, setOptionPlay] = useState("");
  const [optionLike, setOptionLike] = useState("");
  const [optionShuffle, setOptionShuffle] = useState("");
  const [optionRepeat, setOptionRepeat] = useState("");
  const audio = useRef(null);

  const handleTranformClick = () => {
    const newOption = option === "" ? "active" : "";
    setOption(newOption);
  };

  const handlePlay = () => {
    const newOption = optionPlay === "" ? "active" : "";
    setOptionPlay(newOption);
    if (!isPlaying) {
      audio.current.play();
      setIsPlaying(true);
    } else {
      audio.current.pause();
      setIsPlaying(false);
    }
  };
  const handleNext = async () => {
    const count = songs.length;
    let newIndex;
    if (!isShuffle) {
      if (currentIndex < count - 1) {
        newIndex = currentIndex + 1;
      } else {
        newIndex = 0;
      }
    } else {
      newIndex = random();
    }
    await setCurrentIndex(newIndex);
    // console.log("continue");
    if (isPlaying) {
      audio.current.play();
    }
  };
  const handlePre = async () => {
    const count = songs.length;
    let newIndex;
    if (!isShuffle) {
      if (currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else {
        newIndex = count - 1;
      }
    } else {
      newIndex = random();
    }
    await setCurrentIndex(newIndex);
    if (isPlaying) {
      audio.current.play();
    }
  };
  const handleShuffle = () => {
    if (!isShuffle) {
      setOptionShuffle("active");
      setIsShuffle(true);
    } else {
      setOptionShuffle("");
      setIsShuffle(false);
    }
  };
  const handleRepeat = () => {
    if (!isRepeat) {
      setOptionRepeat("active");
      setIsRepeat(true);
    } else {
      setOptionRepeat("");
      setIsRepeat(false);
    }
  };
  const handleLike = () => {
    const newOption = optionLike === "" ? "like" : "";
    setOptionLike(newOption);
  };
  const like = (e) => {
    // console.log(e.target.closest(".icon"));
    const songClick = e.target.closest(".icon");
    songClick.classList.toggle("like");
  };
  const random = () => {
    const index = Math.floor(Math.random() * 6);
    return index;
  };
  if (audio.current) {
    audio.current.onended = () => {
      if (isRepeat) {
        audio.current.load();
        audio.current.play();
      } else {
        handleNext();
      }
    };
  }

  return (
    <div className="App">
      <section className="screen">
        <div className={`toggle ${option}`} onClick={handleTranformClick}>
          <i className="fas fa-bars"></i>
        </div>
        <div
          style={{ backgroundImage: `url(${songs[currentIndex].image}` }}
          className={`coverImage ${option}`}
        ></div>
        <div className="search">
          <i className="fas fa-search"></i>
        </div>
        <div className={`bodyPlayer ${option}`}></div>
        <PlayList songs={songs} option={option} like={like} />
        <div className={`shadow ${option}`}></div>
        <div className={`info ${option}`}>
          <h4>
            {songs[currentIndex].name} - {songs[currentIndex].singer}
          </h4>
        </div>
        <audio ref={audio} src={`${songs[currentIndex].path}`}></audio>
        <Control
          option={option}
          optionPlay={optionPlay}
          playCallback={handlePlay}
          preCallback={handlePre}
          nextCallback={handleNext}
        />
        <Footer
          option={option}
          optionLike={optionLike}
          optionRepeat={optionRepeat}
          optionShuffle={optionShuffle}
          likeCallback={handleLike}
          repeatCallback={handleRepeat}
          shuffleCallback={handleShuffle}
        />
        <div className={`current ${option}`}>
          <h2>{songs[currentIndex].name}</h2>
        </div>
      </section>
    </div>
  );
};

export default App;
