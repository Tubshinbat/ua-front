"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { getBooks } from "lib/getFetchers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Navigation, Autoplay, Pagination, Scrollbar } from "swiper";
import base from "lib/base";

const Library = () => {
  const [cookies] = useCookies(["language"]);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("mn");

  useEffect(() => {
    const fetchData = async () => {
      const { books } = await getBooks(`status=true&limit=12`);
      setData(books);
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (cookies.language) {
      setLanguage(cookies.language);
    }
  }, [cookies.language]);

  return (
    <div className="section__wrapper">
      <div className="container">
        <div className="section__header">
          <h4 className="dark-color">
            {language == "eng" ? "Online library" : "Цахим номын сан"}
          </h4>
          <a href="https://catalog.naog.gov.mn/" target="_blank">
            {language == "eng" ? "More all" : "Бүгдийг нь харах"}
          </a>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={5.8} // Default slides per view for larger screens
          breakpoints={{
            1200: {
              slidesPerView: 5.8, // 1200px-аас доош үед 4.5 слайд
            },
            1000: {
              slidesPerView: 3.8, // 1000px-аас доош үед 3.8 слайд
            },
            600: {
              slidesPerView: 2.8, // 600px-аас доош үед 2.8 слайд
            },
            400: {
              slidesPerView: 1.5, // 400px-аас доош үед 1.5 слайд
            },

            300: {
              slidesPerView: 2.5, // 400px-аас доош үед 1.5 слайд
            },
          }}
          autoplay={{
            delay: 4000,
          }}
          loop={true}
          preventInteractionOnTransition={true}
        >
          {data &&
            data.length > 0 &&
            data.map((el) => {
              return (
                <SwiperSlide key={el._id + "Book"}>
                  <div className="book__item has-target-link">
                    <div className="book__item_img_box ">
                      <img src={`${base.cdnUrl}/${el.picture}`} />
                    </div>
                    <div className="book__item_content">
                      <a
                        href={el.link}
                        className="book__item_text"
                        target="_blank"
                      >
                        <span>{el.name}</span>
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Library;
