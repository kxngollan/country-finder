import "./Loader.css";
import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import {
  FaGlobeAfrica,
  FaGlobeAmericas,
  FaGlobeAsia,
  FaGlobeEurope,
} from "react-icons/fa";
import {
  BsGlobeAmericas,
  BsGlobeAsiaAustralia,
  BsGlobeCentralSouthAsia,
  BsGlobeEuropeAfrica,
} from "react-icons/bs";

const Loader = () => {
  const [scope, animate] = useAnimate();
  const [Planet, setPlanet] = useState(0);
  const [red, setRed] = useState(0);
  const [blue, setBlue] = useState(0);
  const [green, setGreen] = useState(0);

  const planetArray = [
    FaGlobeAfrica,
    FaGlobeAmericas,
    FaGlobeAsia,
    FaGlobeEurope,
    BsGlobeAmericas,
    BsGlobeAsiaAustralia,
    BsGlobeCentralSouthAsia,
    BsGlobeEuropeAfrica,
  ];

  const randomColor = () => {
    setRed(Math.floor(Math.random() * 255));
    setBlue(Math.floor(Math.random() * 255));
    setGreen(Math.floor(Math.random() * 255));
  };

  useEffect(() => {
    const containerWidth = document.querySelector(".container").offsetWidth;
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: "100%" }],
          [scope.current, { x: containerWidth, width: "0%" }, { delay: 0.6 }],
        ],
        {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.8,
        }
      );
    };

    setInterval(() => {
      setPlanet((prev) => (prev + 1) % planetArray.length);
      randomColor();
    }, 2800);

    animateLoader();
  }, []);

  return (
    <main className="loaderMain">
      <div className="container">
        <motion.div
          ref={scope}
          className="loader"
          //RGB purposely in wrong order to make it more interesting
          style={{ backgroundColor: `rgb(${blue},${red},${green})` }}
        />
        {Planet === 0 ? (
          <FaGlobeAfrica
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        ) : Planet === 1 ? (
          <FaGlobeAmericas
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        ) : Planet === 2 ? (
          <FaGlobeAsia
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        ) : Planet === 3 ? (
          <FaGlobeEurope
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        ) : Planet === 4 ? (
          <BsGlobeAmericas
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        ) : Planet === 5 ? (
          <BsGlobeAsiaAustralia
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        ) : Planet === 6 ? (
          <BsGlobeCentralSouthAsia
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        ) : (
          <BsGlobeEuropeAfrica
            className="planet"
            style={{ color: `rgb(${red},${green},${blue})` }}
          />
        )}
      </div>
    </main>
  );
};

export default Loader;
