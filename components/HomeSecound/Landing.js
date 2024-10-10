// Landing.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "styles/homesecound.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-creative";

import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";

import { getBanners, getSocialLinks, getWebInfo } from "lib/getFetchers";
import { useCookies } from "react-cookie";
import { gsap } from "gsap";
import base from "lib/base";

import { languageRender } from "lib/language";
import Link from "next/link";
import { lang } from "moment";
import FullMenu from "components/General/FullMenu";

const Landing = () => {
  const [cookies, setCookie] = useCookies(["language"]);
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [whiteLogo, setWhiteLogo] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [language, setLanguage] = useState("mn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { info } = await getWebInfo();
        info && setInfo(info);
        const { banners } = await getBanners(`status=true`);
        if (banners) setData(banners);
        const { socials } = await getSocialLinks();
        if (socials) setSocialLinks(socials);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (info)
      setWhiteLogo(
        `${base.cdnUrl}/${languageRender(info, "whiteLogo", language)}`
      );

    setLanguage(cookies.language);
  }, [info, cookies.language]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const renderSlideClasses = (index) => {
    if (index === activeIndex) return "custom-slide custom-slide-active";
    if (index === activeIndex - 1) return "custom-slide custom-slide-prev";
    if (index === activeIndex + 1) return "custom-slide custom-slide-next";
    return "custom-slide custom-slide-inactive";
  };

  const changeLanguage = (lang) => {
    setCookie("language", lang, { path: "/" });
  };

  const toggleMenu = () => {
    setIsOpen((bIsOpen) => (bIsOpen ? false : true));
  };

  return (
    <>
      <div className="landing">
        <div className="header__secound">
          <div className="customContainer">
            <div className="header__container">
              <div className="logo__box">
                <Link href="/" className="logo__header">
                  <img src={whiteLogo} />
                </Link>
              </div>
              <div className="header__left">
                <div className="header__burger" onClick={toggleMenu}>
                  <div className="burger__lines">
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                  </div>
                  <p>{language == "mn" ? "Цэс" : "Menu"}</p>
                </div>
                <div className="header__searchicon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
          autoplay={{
            delay: 3000,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          pagination={{
            el: ".slider__pagination",
            type: "custom",
            renderCustom: function (swiper, current, total) {
              let indT = total >= 10 ? total : `0${total}`;
              let indC = total >= 10 ? current : `0${current}`;
              return `<div class="container"><div class="slider__counter"><span> ${indC} </span> <span></span> <span>${indT}</span></div></div>`;
            },
          }}
          navigation={{
            prevEl: ".custom__slider_prev",
            nextEl: ".custom__slider_next",
          }}
          speed={2000}
          className="banners"
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {data &&
            data.map((banner, index) => {
              return (
                <SwiperSlide className={renderSlideClasses(index)} key={index}>
                  <div className="bannerImage">
                    <div className="bannerContainer">
                      <div className="container">
                        <div className="bannerContent">
                          <h4 className="slide-head-text">
                            {languageRender(banner, "name", language)}
                          </h4>
                          <p className="slide-text">
                            {languageRender(banner, "details", language)}
                          </p>
                        </div>
                        <div class="b-head__bottom-line"></div>
                      </div>
                    </div>
                    <div className="bannerOverlay"></div>
                    <img src={`${base.cdnUrl}/${banner.banner}`} alt="Banner" />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className="landing_end">
          <div className="customContainer">
            <div className="lading_container">
              <div className="landing__socials">
                {socialLinks &&
                  socialLinks.map((el) => (
                    <a href={el.link} target="_blank" key={el._id + "social"}>
                      <i
                        className={`fa-brands fa-${el.name.toLowerCase()}`}
                      ></i>
                    </a>
                  ))}
              </div>
              <div className="language__choices">
                <span
                  onClick={() => changeLanguage("mn")}
                  className={language === "mn" ? "active" : ""}
                >
                  MN
                </span>
                <span
                  onClick={() => changeLanguage("eng")}
                  className={language === "eng" ? "active" : ""}
                >
                  ENG
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="slider__pagination"></div>
        <div className="slider__nav">
          <div className="custom__slider_prev swiper-button-prev"></div>
          <div className="custom__slider_next swiper-button-next"></div>
        </div>
      </div>
      <FullMenu toggleMenu={toggleMenu} isOpen={isOpen} />
    </>
  );
};

export default Landing;
