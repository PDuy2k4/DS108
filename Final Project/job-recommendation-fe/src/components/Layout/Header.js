import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  useEffect(() => {
    const header = document.getElementById("header");
    const heighOfElements = header.offsetHeight;
    const scrollCallBack = () => {
      if (window.scrollY > heighOfElements) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    };
    window.addEventListener("scroll", scrollCallBack);
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <div
      className="header  bg-[#ddf7e9] py-3   top-0 left-0 right-0 z-50"
      id="header"
    >
      <div className="container flex justify-center items-center gap-[25px] font-semibold text-[14px]">
        <Link to="/" className="hover:text-[#1fc76a] hover:underline">
          Home
        </Link>
        {/* <Link to="jobs" className="hover:text-[#1fc76a] hover:underline">
        Home
        </Link> */}
      </div>
    </div>
  );
}
