import React from "react";
export default function Job(props) {
  return (
    <div className="p-3 rounded-lg border border-[#1fc76a]">
      <div className="flex items-center gap-5">
        <div className="w-[130px] h-[130px] object-cover flex items-center">
          <img
            className="rounded-lg w-[130px] h-[130px]"
            src={props.img_link}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between ml-[15px] flex-1">
          <span className="inline-block mb-1 line-clamp-1">
            {props.company_name}
          </span>
          <a
            className="text-[18px] leading-normal font-bold line-clamp-2 hover:text-[#1fc76a] cursor-pointer"
            href={props.job_link}
            target="_blank"
            rel="noreferrer"
          >
            {props.job_title}
          </a>
          <div className="flex items-center gap-2 mt-auto">
            <i class="fa-solid fa-location-dot"></i>
            <span className="inline-block opacity-45 line-clamp-2">
              {props.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
