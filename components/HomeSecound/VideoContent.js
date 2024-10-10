"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";

import base from "lib/base";
import { getMedias } from "lib/getFetchers";
import { languageRender } from "lib/language";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const VideoContent = () => {
  const [cookies] = useCookies(["language"]);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("mn");
  const [type, setType] = useState("audio");

  useEffect(() => {
    const fetchData = async () => {
      const { medias } = await getMedias(`type=video&limit=5`);
      setData(medias);
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (cookies.language) {
      setLanguage(cookies.language);
    }
  }, [cookies.language]);

  useEffect(() => {
    const fetchData = async () => {
      const { medias } = await getMedias(`type=${type}&limit=5`);
      medias && setData(medias);
    };
    if (type) fetchData().catch((error) => console.log(error));
  }, [type]);

  return (
    <div className="section__wrapper blue-pr wow animate__animated animate__fadeInUp">
      <div className="container">
        <div className="section__header">
          <h4>{language == "eng" ? "Video content" : "Видео контент"}</h4>
        </div>
        <div className="video__content_tabs">
          <li
            onClick={() => setType("audio")}
            className={`${type == "audio" && "active"}`}
          >
            Подкаст
          </li>
          <li
            onClick={() => setType("video")}
            className={`${type == "video" && "active"}`}
          >
            Видео
          </li>
        </div>
        <div className="video__content_box">
          <div className="video__content_big">
            {data && data[0] && (
              <Link
                href={`/media/${data[0].slug}`}
                className="video__star_box has-target-link"
              >
                <div className="video__star_img">
                  {data[0].pictures && data[0].pictures[0] ? (
                    <img src={`${base.cdnUrl}/${data[0].pictures[0]}`} />
                  ) : (
                    <img src={`/assets/img/no-image.png`} />
                  )}
                </div>
                <div className="video__star_content">
                  <h4>{languageRender(data[0], "name", language)}</h4>
                  <div className="news-box-dtls">
                    <div className="news-box-dtl">
                      <i className="fa fa-clock"></i>
                      <ReactTimeAgo date={data[0].createAt} locale="mn-MN" />
                    </div>
                    <div className="news-box-dtl">
                      <i className="fa fa-bolt"></i>
                      {data[0].views}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="video__content_playlist">
            {data &&
              data.map(
                (el, index) =>
                  index != 0 && (
                    <div
                      className="playlist__item has-target-link"
                      key={el._id}
                    >
                      <div className="playlist__item_content">
                        <Link href={`/media/${el.slug}`}>
                          <span> {languageRender(el, "name", language)} </span>
                        </Link>
                        <div className="news-box-dtls">
                          <div className="news-box-dtl">
                            <i className="fa fa-clock"></i>
                            <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                          </div>
                          <div className="news-box-dtl">
                            <i className="fa fa-bolt"></i>
                            {el.views}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/media/${el.slug}`}
                        className="playlist__img"
                      >
                        {el.pictures && el.pictures[0] ? (
                          <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                        ) : (
                          <img src={`/assets/img/no-image.png`} />
                        )}
                      </Link>
                    </div>
                  )
              )}
            <Link href="medias" className="video__content_all">
              Бүгдийг харах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;
