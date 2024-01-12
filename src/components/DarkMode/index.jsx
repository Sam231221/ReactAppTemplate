"use client";
import { useEffect, useState } from "react";
import "./index.css";
import { BiSun } from "react-icons/bi";
import { MdComputer, MdOutlineDarkMode } from "react-icons/md";
const Toggle = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [mode, setMode] = useState(getInitialMode());

  //set mode according to system
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    const imageElements = document.getElementsByClassName("logo");
    for (let i = 0; i < imageElements.length; i++) {
      if (mode == "dark") {
        imageElements[i].style.filter = "invert(1)";
      } else {
        imageElements[i].style.filter = "invert(0)";
      }
    }
  }, [mode]);

  function getInitialMode() {
    let savedMode;
    if (typeof window !== "undefined") {
      savedMode = localStorage.getItem("theme");
    }

    if (typeof savedMode === "string") {
      return savedMode;
    }
    let theme;
    if (typeof window !== "undefined") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return theme ? "dark" : "light";
  }
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionsClick = (e) => {
    if (e.target.getAttribute("value") === "system") {
      let mediaquery;
      if (typeof window !== "undefined") {
        mediaquery = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      if (mediaquery) {
        setMode("dark");
      } else {
        setMode("light");
      }
      setShowOptions(false);
    } else {
      setMode(e.target.getAttribute("value"));
      setShowOptions(false);
    }
  };

  return (
    <div>
      <div className="toggler">
        {mode === "light" && <BiSun size={20} onClick={handleClick} />}
        {mode === "dark" && (
          <MdOutlineDarkMode size={20} onClick={handleClick} />
        )}
        {mode === "system" && <MdComputer size={20} onClick={handleClick} />}
      </div>
      {showOptions && (
        <ul className="toggleOptions">
          <li
            className="d-flex align-items-center px-2 py-1  gap-2"
            value={"light"}
            onClick={(e) => handleOptionsClick(e)}
          >
            <BiSun size={20} />
            Light
          </li>
          <li
            className="d-flex align-items-center px-2 py-1 gap-2"
            value={"dark"}
            onClick={(e) => handleOptionsClick(e)}
          >
            <MdOutlineDarkMode size={20} />
            Dark
          </li>
          <li
            className="d-flex align-items-center px-2 py-1 gap-2"
            value="system"
            onClick={(e) => handleOptionsClick(e)}
          >
            <MdComputer size={20} />
            System
          </li>
        </ul>
      )}
    </div>
  );
};

export default Toggle;
