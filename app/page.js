"use client";
import AOS from "aos";
import Banner from "components/Home/Banner";
import Header from "components/General/Header";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import FastLink from "components/Home/FastLink";
import NeedLink from "components/Home/NeedLink";
import TopNews from "components/Home/TopNews";
import Media from "components/Home/Media";
import Books from "components/Home/Books";
import Partners from "components/General/Partners";
import HeaderSticky from "components/General/HeaderSticky";
import HomeSecound from "components/HomeSecound/HomeSecound";

export default function Page() {
  const [cookies, setCookie] = useCookies(["language"]);

  useEffect(() => {
    AOS.init();
    window.onscroll = () => {
      let header = document.querySelector(".header");
      let headertwo = document.querySelector(".header-two");
      let ads = document.querySelector(".ads");
      let fastBox = document.querySelector(".fast-boxs");
      let sticky = header.offsetTop;
      if (window.pageYOffset >= fastBox.offsetTop) {
        ads.classList.add("sticky-ads");
      } else {
        ads.classList.remove("sticky-ads");
      }
      if (window.pageYOffset > sticky) {
        header.classList.add(`displayNone`);
        headertwo.classList.add("header-sticky");
      } else {
        header.classList.remove(`displayNone`);
        headertwo.classList.remove("header-sticky");
        ads.classList.remove("sticky-ads");
      }
    };
    if (!cookies.language) setCookie("language", "mn", { path: "/" });
  }, []);

  return (
    <>
      <HomeSecound />
      {/* <section className="header-section">
        <Header />
        <HeaderSticky />
        <Banner />
        <FastLink />
      </section>
      <NeedLink />
      <TopNews />
      <Media />
      <Books />
      <Partners /> */}
    </>
  );
}
