import React from "react";
import Job from "./Job";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customPagination.scss";
import styled, { css } from "styled-components";
export default function JobList(props) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        modules={[Navigation, Pagination]}
        navigation
        pagination={pagination}
        scrollbar={{ draggable: true }}
      >
        {props.data.map((job, index) => (
          <SwiperSlide key={index}>
            <Job
              job_link={job.job_url}
              job_title={job.title}
              location={job.location}
              img_link={job.image_url}
              company_name={job.company}
            ></Job>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
