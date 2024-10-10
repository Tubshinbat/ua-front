"use client";
import base from "lib/base";
import { getTopLinks } from "lib/getFetchers";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const FastLink = () => {
  const [cookies] = useCookies(["language"]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { toplinks } = await getTopLinks(`status=true`);
      setData(toplinks);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="slide-bg"></div>
      <div className="fast-boxs">
        {data &&
          data.map((el, index) => {
            let lang;
            if (el[cookies.language] === undefined) {
              if (cookies.language == "mn") lang = "eng";
              else lang = "mn";
            } else lang = cookies.language;
            let count = 0.2 * index;
            let link = "#";
            if (el.direct) {
              link = el.direct;
            }
            return (
              <a
                href={link}
                className={`fastbox  wow animate__animated animate__fadeInUp`}
                data-wow-delay={`${count}s`}
                key={el.direct}
              >
                <div className="fast-bg">
                  <img src={`${base.cdnUrl}/${el.picture}`} />
                  <div className="fastbox-container">
                    <img
                      src={`${base.cdnUrl}/${el.icon}`}
                      className="fastbox-icon"
                    />
                    <h5> {el[lang].name} </h5>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </>
  );
};

export default FastLink;
