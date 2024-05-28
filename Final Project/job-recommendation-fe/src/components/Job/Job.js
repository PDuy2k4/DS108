import React from "react";
export default function Job() {
  return (
    <div className="p-3 rounded-lg border border-[#1fc76a]">
      <div className="flex items-center gap-5">
        <div className="max-w-full max-h-full object-cover">
          <img
            className="rounded-lg"
            src="https://nodeflair.com/api/v2/companies/715.png"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between ml-[15px]">
          <span className="inline-block mb-1">Renesas Electronics</span>
          <h4 className="text-[18px] leading-normal font-bold">
            Data Scientist
          </h4>
          <div className="flex items-center gap-2 mt-3">
            <i class="fa-solid fa-location-dot"></i>
            <span className="inline-block opacity-45">Vietnam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
