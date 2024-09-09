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

import { getEmployee, getNewsCategories, getSlugNews } from "lib/getFetchers";
import NotFound from "components/General/Notfound";
import Side from "components/General/Side";
import Spinner from "components/General/Spinner";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import base from "lib/base";
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

TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

export default function Page({ params }) {
  const [employee, setEmployee] = useState(null);
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
      const { employee } = await getEmployee(params.id);
      setEmployee(employee);
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

  if (!loading && !employee) {
    return (
      <>
        <div className="breads">
          <div className="container custom-container">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"> Эхлэл </Link>
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

            <li className="breadcrumb-item active">
              {employee[langCheck(employee)].name}
            </li>
          </ul>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12" ref={componentRef}>
              <div className="page-main page-employee">
                <div className="row">
                  <div className="col-xl-3 col-md-4">
                    <div className="page-employee-picture">
                      {employee.picture ? (
                        <img src={base.cdnUrl + "/" + employee.picture} />
                      ) : (
                        <img src={"/assets/img/no-photo.jpg"} />
                      )}
                    </div>
                  </div>
                  <div className="col-xl-9 cold-md-8">
                    <div className="page-employee-info">
                      <h4>{employee[langCheck(employee)].name}</h4>
                      <span>{employee[langCheck(employee)].degree}</span>
                    </div>
                    <div className="page-employee-contact">
                      <div className="page-employee-contact-item">
                        <i className="fa fa-phone"></i>
                        {employee.phoneNumber}
                      </div>
                      <div className="page-employee-contact-item">
                        <i className="fa fa-envelope"></i>
                        {employee.email}
                      </div>
                    </div>
                    <div
                      className="page-employee-about"
                      dangerouslySetInnerHTML={{
                        __html: employee[langCheck(employee)].about,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12 ">
              <Side></Side>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
