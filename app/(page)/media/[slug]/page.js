"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {
  faBolt,
  faClock,
  faMagnifyingGlass,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactToPrint from "react-to-print";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";

import { getMediaCategories, getMedias, getSlugMedia } from "lib/getFetchers";
import NotFound from "components/General/Notfound";
import Spinner from "components/General/Spinner";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import base from "lib/base";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

export default function Page({ params }) {
  const [menus, setMenus] = useState(null);
  const [data, setData] = useState(null);
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["language"]);
  const pathname = usePathname();
  const componentRef = useRef();

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".header-two");
      let stickyTop = document.querySelector(".sides.sticky-top");

      if (header && stickyTop) {
        let sticky = "";
        if (header) sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
          header.classList.add(`header-sticky`);
          stickyTop.classList.add("st-top");
        } else {
          header.classList.remove(`header-sticky`);
          stickyTop.classList.remove("st-top");
        }
      }
    };

    const fetchData = async () => {
      const { categories } = await getMediaCategories(``);
      categories && setMenus(categories);
      const { media } = await getSlugMedia(params.slug);
      media && setData(media);
      const { medias } = await getMedias(`status=true&limit=100`);
      setMedias(medias);
      setLoading(false);
    };

    fetchData().catch((err) => console.log(err));
    if (!cookies.language) setCookie("language", "mn", { path: "/" });
  }, []);

  const langCheck = (val) => {
    let lang = cookies.language;
    if (!val[cookies.language]) {
      if (cookies.language == "mn") lang = "eng";
      else lang = "mn";
    }
    return lang;
  };

  if (loading) return <Spinner />;

  if (!loading && !data) {
    return (
      <>
        <div className="breads">
          <div className="container custom-container">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"> Эхлэл </Link>
              </li>
              <li className="breadcrumb-item active">
                <Link href="/medias"> Медиа контент</Link>
              </li>
            </ul>
          </div>
        </div>

        <NotFound />
      </>
    );
  }

  return (
    <>
      {" "}
      <div className="breads">
        <div className="container custom-container">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/"> Эхлэл </Link>
            </li>
            <li className="breadcrumb-item ">
              <Link href="/medias"> Медиа контент</Link>
            </li>
            <li className="breadcrumb-item active">
              {data[langCheck(data)].name}
            </li>
          </ul>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12" ref={componentRef}>
              <div className="page-main">
                <div className="row page-desiption">
                  {data.type === "video" &&
                    data.videos &&
                    data.videos.length > 0 &&
                    data.videos.map((video) => (
                      <div className="col-md-6">
                        <video controls src={`${base.cdnUrl}/${video}`} />
                      </div>
                    ))}

                  {data.type === "audio" &&
                    data.audios &&
                    data.audios.length > 0 &&
                    data.audios((audio) => (
                      <div className="col-md-12">
                        <audio controls src={`${base.cdnUrl}/${audio}`}></audio>
                      </div>
                    ))}

                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data[langCheck(data)] && data[langCheck(data)].details,
                    }}
                    className="page-about media-about"
                  ></div>
                </div>{" "}
                <div className="page-header">
                  <div className="page-title">
                    <h2> {data[langCheck(data)].name} </h2>
                  </div>
                  <div className="section-title-line"></div>
                </div>
                <div className="page-infos">
                  <div className="page-info-left">
                    <div className="page-info">
                      <ReactToPrint
                        trigger={() => (
                          <div className="page-print">
                            <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon>
                            Хэвлэх
                          </div>
                        )}
                        content={() => componentRef.current}
                      />
                    </div>
                  </div>
                  <div className="page-info-right">
                    <div className="page-info">
                      <FontAwesomeIcon icon={faBolt} />
                      {data.views}
                    </div>
                    <div className="page-info">
                      <FontAwesomeIcon icon={faClock} />
                      <ReactTimeAgo date={data.createAt} locale="mn-MN" />
                    </div>
                    <div className="page-info">
                      <FacebookShareButton url={base.baseUrl + "/" + pathname}>
                        {" "}
                        <FacebookIcon size={18} />{" "}
                      </FacebookShareButton>
                      <TwitterShareButton url={base.baseUrl + "/" + pathname}>
                        {" "}
                        <TwitterIcon size={18} />
                      </TwitterShareButton>
                      <LinkedinShareButton url={base.baseUrl + "/" + pathname}>
                        {" "}
                        <LinkedinIcon size={18} />
                      </LinkedinShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12 ">
              <div className="sides sticky-top">
                <div className="side-item ">
                  <div className="side-playlist">
                    {medias &&
                      medias.map((media) => (
                        <Link
                          href={`/media/${media.slug}`}
                          className="media-playlist-item-target"
                          key={media._id}
                        >
                          <div className="media-playlist-item">
                            <div className="playlist-item-img">
                              {media.pictures && media.pictures.length > 0 ? (
                                <img
                                  src={`${base.cdnUrl}/450/${media.pictures[0]}`}
                                />
                              ) : (
                                <img src="/images/no-photo.jpg" />
                              )}
                            </div>
                            <div className="playlist-item-content">
                              <h6>{media[langCheck(data)].name}</h6>
                              <div className="playlist-item-dtl">
                                <div className="playlist-item-dtl-item">
                                  <FontAwesomeIcon icon={faBolt} />
                                  {data.views}
                                </div>
                                <div className="playlist-item-dtl-item">
                                  <FontAwesomeIcon icon={faClock} />
                                  <ReactTimeAgo
                                    date={data.createAt}
                                    locale="mn-MN"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
