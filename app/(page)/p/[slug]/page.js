"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import {
  faBolt,
  faClock,
  faMagnifyingGlass,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactToPrint from "react-to-print";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { usePathname } from "next/navigation";

import NotFound from "components/General/Notfound";
import Side from "components/General/Side";
import Spinner from "components/General/Spinner";
import { getSlugMenu } from "lib/getFetchers";
import base from "lib/base";
import Team from "components/Team/team";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [parent, setParent] = useState(null);
  const [menu, setMenu] = useState(null);
  const [position, setPosition] = useState(null);
  const [childeMenus, setChildeMenus] = useState(null);
  const [sameParentMenus, setSameParentMenus] = useState(null);
  const [sideStyle, setSideStyle] = useState("col-xl-9 col-lg-9 col-md-12");
  const [cookies, setCookie] = useCookies(["language"]);
  const pathname = usePathname();
  const componentRef = useRef();

  const langCheck = (val) => {
    let lang = cookies.language;
    if (!val[cookies.language]) {
      if (cookies.language == "mn") lang = "eng";
      else lang = "mn";
    }
    return lang;
  };

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

    const fetchDatas = async () => {
      try {
        const { menu, parent, page, childeMenus, sameParentMenus, position } =
          await getSlugMenu(params.slug);
        if (page && page.length > 0) {
          setPage(page[0]);
          page[0].sideActive == false &&
            setSideStyle("col-xl-12 col-lg-12 col-md-12");
        }
        parent && setParent(parent);
        childeMenus && setChildeMenus(childeMenus);
        menu && setMenu(menu);
        sameParentMenus && setSameParentMenus(sameParentMenus);
        position && setPosition(position);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    if (!cookies.language) setCookie("language", "mn", { path: "/" });
    fetchDatas().catch((err) => console.log(err));
  }, []);

  if (loading) return <Spinner />;

  if (!loading && !page) {
    return (
      <>
        <div className="breads">
          <div className="container custom-container">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"> Эхлэл </Link>
              </li>
              {parent && (
                <li className="breadcrumb-item">
                  <Link href={`/p/${parent.slug}`}>
                    {" "}
                    {parent[langCheck(parent)].name}{" "}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <NotFound />
      </>
    );
  }

  if (!loading && page.status == false) {
    return (
      <>
        <div className="breads">
          <div className="container custom-container">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"> Эхлэл </Link>
              </li>
              {parent && (
                <li className="breadcrumb-item">
                  <Link href={`/p/${parent.slug}`}>
                    {" "}
                    {parent[langCheck(parent)].name}{" "}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <NotFound />
      </>
    );
  }

  return (
    <>
      <div className="breads">
        <div className="container custom-container">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/"> Эхлэл </Link>
            </li>
            {parent && (
              <li className="breadcrumb-item">
                <Link href={`/p/${parent.slug}`}>
                  {" "}
                  {parent[langCheck(parent)].name}{" "}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active">
              {page[langCheck(page)].name}
            </li>
          </ul>
        </div>
      </div>

      <section className="section section-page">
        <div className="container">
          <div className="row">
            <div className={sideStyle}>
              <div className="page-main">
                {page[langCheck(page)].pageInfo && (
                  <div className="page-header">
                    <div className="page-title">
                      <h2> {page[langCheck(page)].name} </h2>
                    </div>
                    <div className="section-title-line"></div>
                  </div>
                )}
                <div className="page-picture">
                  {page.pictures && page.pictures.length == 1 && (
                    <img
                      src={`${base.cdnUrl}/${page.pictures[0]}`}
                      className="page-full-image"
                    />
                  )}
                  {page.pictures && page.pictures.length > 1 && (
                    <Swiper
                      modules={[Navigation]}
                      autoHeight={true}
                      navigation={{
                        prevEl: ".page-view-slider-prev",
                        nextEl: ".page-view-slider-next",
                      }}
                      className="page-view-slider"
                    >
                      {page.pictures.map((pic, index) => (
                        <SwiperSlide
                          className="page-slide"
                          key={index + "_view"}
                        >
                          <img src={`${base.cdnUrl}/${pic}`} />
                        </SwiperSlide>
                      ))}
                      <div className="page-view-slide-nav">
                        <div className="page-view-slider-prev swiper-button-prev"></div>
                        <div className="page-view-slider-next swiper-button-next"></div>
                      </div>
                    </Swiper>
                  )}
                </div>
                <div className="page-desiption">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        page[langCheck(page)] && page[langCheck(page)].pageInfo,
                    }}
                    className="page-about"
                  ></div>
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
                {page.listActive && (
                  <>
                    <div className="section-header"></div>
                    <div className="section-title-line"></div>
                    <div className="row g-4 mb-5">
                      {childeMenus &&
                        childeMenus.map((el) => {
                          let link;
                          if (!el.isDirect && !el.model) link = `/p/${el.slug}`;
                          if (el.isDirect) link = el.direct;
                          if (el.model) link = el.model;
                          return (
                            <div
                              className="col-lg-4 col-md-6 col-sm-12"
                              key={el._id}
                            >
                              <div className="page-list">
                                <Link href={link}>
                                  <div className="news-box-image page-list-img">
                                    {el.picture ? (
                                      <img
                                        src={`${base.cdnUrl}/${el.picture}`}
                                      />
                                    ) : (
                                      <img src="/images/list-bg.jpg" />
                                    )}
                                  </div>
                                </Link>
                                <div className="page-list-content">
                                  <Link href={link}>
                                    {" "}
                                    {el[langCheck(el)].name}{" "}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </>
                )}
                {position && position.length > 0 && (
                  <>
                    <div className="section-header">
                      <div className="section-title">
                        <h6
                          dangerouslySetInnerHTML={{
                            __html:
                              cookies.language === "eng"
                                ? " <span> Colleague  </span>"
                                : "Хамт <span> олон </span>",
                          }}
                        ></h6>
                      </div>
                    </div>
                    <div className="section-title-line"></div>
                    <div className="row g-4">
                      {position &&
                        position.map((el, index) => <Team memberData={el} />)}
                    </div>
                  </>
                )}
              </div>
            </div>

            {page.sideActive == true && (
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                {" "}
                <Side>
                  {sameParentMenus && sameParentMenus.length > 1 && (
                    <div className="side-item ">
                      <div className="side-title">
                        {" "}
                        <h5>
                          {cookies.language == "mn" ? "Ангилал" : "Categories"}
                        </h5>{" "}
                        <div className="section-title-line"></div>
                      </div>
                      <ul className="side-menus">
                        {sameParentMenus &&
                          sameParentMenus.map((menu) => {
                            let link;
                            if (!menu.isDirect && !menu.model)
                              link = `/p/${menu.slug}`;
                            if (menu.isDirect) link = menu.direct;
                            if (menu.model) link = menu.model;
                            return (
                              <li className="side-menu" key={menu._id + "same"}>
                                {" "}
                                <Link href={link}>
                                  {" "}
                                  {menu[langCheck(menu)].name}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                  {childeMenus && (
                    <div className="side-item ">
                      <div className="side-title">
                        {" "}
                        <h5>
                          {cookies.language == "mn" ? "Дэд цэс" : "Sub menus"}
                        </h5>{" "}
                        <div className="section-title-line"></div>
                      </div>
                      <ul className="side-menus">
                        {childeMenus &&
                          childeMenus.map((menu) => {
                            let link;
                            if (!menu.isDirect && !menu.model)
                              link = `/p/${menu.slug}`;
                            if (menu.isDirect) link = menu.direct;
                            if (menu.model) link = menu.model;
                            return (
                              <li className="side-menu" key={menu._id + "side"}>
                                {" "}
                                <Link href={link}>
                                  {" "}
                                  {menu[langCheck(menu)].name}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </Side>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section"></section>
    </>
  );
}
