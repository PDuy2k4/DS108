import React from "react";
import Job from "./Job";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customPagination.scss";
import styled, { css } from "styled-components";
export default function JobList() {
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
        spaceBetween={50}
        slidesPerView={4}
        modules={[Navigation, Pagination]}
        navigation
        pagination={pagination}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
        <SwiperSlide>
          <Job></Job>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
