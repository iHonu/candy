import { TopBar } from "./TopBar";
import image3 from "../assets/image2.jpg";
import image2 from "../assets/ooo.jpg";
import image1 from "../assets/House with Tree.jpg";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-wrapper">
        <TopBar />
        <div className="hero-content">
          <div className="hero-title">
            <h1 className="title" data-text="CANDY SWEET">CANDY SWEET</h1>
            <h2 className="subtitle" data-text="ADVENTURE GAME">ADVENTURE GAME</h2>
          </div>
          <div className="hero-description">
            <p>DIVE INTO A WORLD OF SUGARY CHALLENGES</p>
            <p>MATCH, COLLECT, AND CONQUER!</p>
          </div>
          <a className="btn-play" href="#signup-form">Play Now</a>
        </div>

        <div className="image-row">
          <div className="image-container image-container-1">
            <img src={image2} alt="candy" />
          </div>
          <div className="image-container image-container-2">
            <img src={image3} alt="candy" />
          </div>
          <div className="image-container image-container-3">
            <img src={image1} alt="candy" />
          </div>
          <div className="image-container image-container-2">
            <img src={image3} alt="candy" />
          </div>
          <div className="image-container image-container-1">
            <img src={image2} alt="candy" />
          </div>
        </div>
      </div>
    </div>
  );
};