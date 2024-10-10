"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCookies } from "react-cookie";
import { Grid, Pagination } from "swiper";

import base from "lib/base";
import { getNews } from "lib/getFetchers";
import { languageRender } from "lib/language";
import Link from "next/link";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const Newnews = () => {
  const [cookies] = useCookies(["language"]);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("mn");

  useEffect(() => {
    const fetchData = async () => {
      const { news } = await getNews(`status=true&limit=10`);
      setData(news);
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
        <div className="new__news_list wow animate__animated animate__fadeInUp">
          {data &&
            data.map((el) => (
              <div key={el._id} className="new__news_item has-target-link">
                <Link href={`/post/${el.slug}`} className="new__news_link ">
                  <span>
                    {languageRender(el, "name", language).length > 90
                      ? languageRender(el, "name", language).slice(0, 90) +
                        "..."
                      : languageRender(el, "name", language)}
                  </span>
                </Link>
                <p className="new__news_short">
                  {languageRender(el, "shortDetails", language).length > 170
                    ? languageRender(el, "shortDetails", language).slice(
                        0,
                        170
                      ) + " [...]"
                    : languageRender(el, "shortDetails", language)}
                </p>
                <Link href={`/post/${el.slug}`} className="new__news_image">
                  {el.pictures && el.pictures[0] ? (
                    <img src={`${base.cdnUrl}/350x350/${el.pictures[0]}`} />
                  ) : (
                    <img src={`/assets/img/no-image.png`} />
                  )}
                </Link>
              </div>
            ))}
        </div>
        <Swiper
          modules={[Grid, Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="new__news_slide"
        >
          {data &&
            data.map((el) => (
              <SwiperSlide
                key={el._id}
                className="new__news_item has-target-link"
              >
                <div className="new__news_content">
                  <Link href={`/post/${el.slug}`} className="new__news_link ">
                    <span>
                      {languageRender(el, "name", language).length > 90
                        ? languageRender(el, "name", language).slice(0, 90) +
                          "..."
                        : languageRender(el, "name", language)}
                    </span>
                  </Link>
                  <p className="new__news_short">
                    {languageRender(el, "shortDetails", language).length > 170
                      ? languageRender(el, "shortDetails", language).slice(
                          0,
                          170
                        ) + " [...]"
                      : languageRender(el, "shortDetails", language)}
                  </p>
                </div>
                <Link href={`/post/${el.slug}`} className="new__news_image">
                  {el.pictures && el.pictures[0] ? (
                    <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                  ) : (
                    <img src={`/assets/img/no-image.png`} />
                  )}
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Newnews;
