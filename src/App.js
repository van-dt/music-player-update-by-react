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
import song7_img from "./assets/img/song7.jpg";
import song7_path from "./assets/mp3/song7.mp3";
import song8_img from "./assets/img/song8.jpg";
import song8_path from "./assets/mp3/song8.mp3";
import song9_img from "./assets/img/song9.jpg";
import song9_path from "./assets/mp3/song9.mp3";
import song10_img from "./assets/img/song10.jpg";
import song10_path from "./assets/mp3/song10.mp3";

const songs = [
  {
    name: "Hạ Sơn",
    singer: "Yao Bu Yao Mai Cai",
    path: song1_path,
    image: song1_img,
  },
  {
    name: "Bất Nhiễm",
    singer: "Mao Bất Dịch",
    path: song2_path,
    image: song2_img,
  },
  {
    name: "Hồng Mã",
    singer: "Hứa Lam Tâm",
    path: song3_path,
    image: song3_img,
  },
  {
    name: "Niên Tuế",
    singer: "Mao Bất Dịch",
    path: song4_path,
    image: song4_img,
  },
  {
    name: "Tay trái chỉ trăng",
    singer: "Tát Đỉnh Đỉnh",
    path: song5_path,
    image: song5_img,
  },
  {
    name: "Vong Tiện",
    singer: "Vương Nhất Bác",
    path: song6_path,
    image: song6_img,
  },
  {
    name: "Xuy Diệt Tiểu Sơn Hà",
    singer: "Tư Nam",
    path: song7_path,
    image: song7_img,
  },
  {
    name: "Yến Vô Hiết",
    singer: "Trương Tuyết Nhi",
    path: song8_path,
    image: song8_img,
  },
  {
    name: "Thu Thương Biệt Luyến",
    singer: "Mã Dược Triển",
    path: song9_path,
    image: song9_img,
  },
  {
    name: "Thẩm Viên Ngoại",
    singer: "Lệ Cách",
    path: song10_path,
    image: song10_img,
  },
];
const PlayList = ({ songs, option }) => {
  const list = songs.map((song, index) => {
    return (
      <div key={index} className="song">
        <div className="song-item nr">
          <h5>{index + 1}</h5>
        </div>
        <div className="song-item title">
          <h6>{song.name}</h6>
        </div>
        <div className="song-item icon">
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

const Footer = ({ option }) => {
  return (
    <div className={`footer ${option}`}>
      <div className="footer-icon love">
        <i className="far fa-heart"></i>
      </div>
      <div className="footer-icon repeat">
        <i className="fas fa-redo"></i>
      </div>
      <div className="footer-icon shuffle">
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
  const [option, setOption] = useState("");
  const [optionPlay, setOptionPlay] = useState("");
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
    if (currentIndex < count - 1) {
      newIndex = currentIndex + 1;
    } else {
      newIndex = 0;
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
    if (currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = count - 1;
    }
    await setCurrentIndex(newIndex);
    if (isPlaying) {
      audio.current.play();
    }
  };

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
        <PlayList songs={songs} option={option} />
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
        <Footer option={option} />
        <div className={`current ${option}`}>
          <h2>{songs[currentIndex].name}</h2>
        </div>
      </section>
    </div>
  );
};

export default App;
