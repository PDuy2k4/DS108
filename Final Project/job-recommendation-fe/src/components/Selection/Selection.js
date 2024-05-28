import React, { useEffect } from "react";
import { forwardRef } from "react";

const Selection = forwardRef(
  ({ destination, title, description, img_link }, nodeRef) => {
    const handleClick = () => {
      const topElement = nodeRef.current.offsetTop - 95;
      if (nodeRef.current) {
        window.scrollTo({
          top: topElement,
          behavior: "smooth",
        });
      } else {
        console.error("nodeRef.current is null");
      }
    };

    return (
      <div className="flex flex-col flex-1 items-center p-10 bg-[#ece4f9] gap-6 border border-black rounded-lg">
        <div className="flex justify-center items-center p-3">
          <img
            className="max-w-[82px] max-h-[82px] object-cover"
            src={img_link}
            alt=""
          />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-center mb-3 opacity-50">{description}</p>
        <button
          className="mt-auto px-4 py-2 bg-white border-2 border-[#9ca3af] text-center text-[16px] leading-normal rounded-lg hover:bg-slate-200"
          onClick={handleClick}
        >
          Check Now
        </button>
      </div>
    );
  }
);

export default Selection;
