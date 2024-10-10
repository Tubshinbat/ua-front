import { isArray } from "highcharts";
import { getNews } from "lib/getFetchers";
import { languageRender } from "lib/language";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import base from "lib/base";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const Topnews = () => {
  const [cookies] = useCookies(["language"]);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("mn");

  useEffect(() => {
    const fetchData = async () => {
      const { news } = await getNews(`status=true&star=true&limit=4`);
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
    <div className="section__wrapper gray_pr ">
      <div className="container">
        <div className="top__items wow animate__animated animate__fadeInUp">
          {data &&
            isArray(data) &&
            data.map((el, index) => (
              <>
                <div key={el._id} className="top__item has-target-link">
                  <div className="top__item_category">
                    {el.categories && el.categories[0] && (
                      <Link
                        href={`/news?categories=${el.categories[0].slug}`}
                        className="top__item_category_link "
                        key={el.categories[0]._id + "tcat"}
                      >
                        {languageRender(el.categories[0], "name", language)}
                      </Link>
                    )}
                  </div>
                  <Link href={`/post/${el.slug}`} className="top__item_title">
                    <span>
                      {languageRender(el, "name", language).length > 92
                        ? languageRender(el, "name", language).slice(0, 92) +
                          "..."
                        : languageRender(el, "name", language)}
                    </span>
                  </Link>
                  <p className="top__item_short">
                    {languageRender(el, "shortDetails", language).length > 150
                      ? languageRender(el, "shortDetails", language).slice(
                          0,
                          150
                        ) + " [...]"
                      : languageRender(el, "shortDetails", language)}
                  </p>
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

                  <Link href={`/post/${el.slug}`} className="top__item_image">
                    {el.pictures && el.pictures[0] ? (
                      <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                    ) : (
                      <img src={`/assets/img/no-image.png`} />
                    )}
                  </Link>
                </div>
                {index === 1 && <div className="sprit"></div>}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Topnews;
