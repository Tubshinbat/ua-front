"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Swiper, SwiperSlide } from "swiper/react";

import base from "lib/base";
import { getTopLinks } from "lib/getFetchers";
import { languageRender } from "lib/language";
// import required modules
import { Grid, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "styles/homesecound.css";
import Link from "next/link";

const FastLinks = () => {
  const [cookies] = useCookies(["language"]);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("mn");

  useEffect(() => {
    if (cookies.language) {
      setLanguage(cookies.language);
    }
  }, [cookies.language]);

  useEffect(() => {
    const fetchData = async () => {
      const { toplinks } = await getTopLinks(`status=true`);
      setData(toplinks);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <div className="section__wrapper wow animate__animated animate__fadeInUp">
      <div className="container">
        <Swiper
          modules={[Grid, Pagination]}
          slidesPerView={3}
          grid={{
            rows: 2,
            fill: "row",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              grid: {
                rows: 1,
              },
            },
            992: {
              slidesPerView: 2,
              grid: {
                rows: 2,
              },
            },
            1200: {
              slidesPerView: 3,
              grid: {
                rows: 2,
              },
            },
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          className="fast__links"
        >
          {data &&
            data.map((el) => (
              <SwiperSlide className="fastlink__slide_item" key={el._id}>
                <Link
                  href={el.direct}
                  className="fastlink__item"
                  style={{
                    backgroundImage: `url('${base.cdnUrl}/${el.picture}')`,
                  }}
                >
                  <div className="fastlink__body">
                    <div className="fastlink__head  nav-dark__action-text">
                      <span>{languageRender(el, "name", language)}</span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: languageRender(el, "about", language),
                        }}
                      ></p>
                    </div>
                    <img
                      src={`${base.cdnUrl}/${el.icon}`}
                      className="fastlink__item___img"
                    />
                    <p className="fast__more">
                      {language == "eng" ? "More" : "Дэлгэрэнгүй"}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FastLinks;
