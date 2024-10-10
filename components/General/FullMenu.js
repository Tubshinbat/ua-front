import base from "lib/base";
import { getBanners, getMenus, getTopLinks, getWebInfo } from "lib/getFetchers";
import { languageRender } from "lib/language";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const FullMenu = ({ isOpen, toggleMenu }) => {
  const [cookies, setCookie] = useCookies(["language"]);
  const [info, setInfo] = useState(null);
  const [whiteLogo, setWhiteLogo] = useState(null);
  const [language, setLanguage] = useState("mn");
  const [menus, setMenu] = useState({});
  const [active, setActive] = useState("");
  const [childeActive, setChildeActive] = useState("");
  const [background, setBackground] = useState("");
  const [toplinks, setTopLinks] = useState([]);
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { info } = await getWebInfo();
        info && setInfo(info);
        const { menus } = await getMenus();
        menus && setMenu(menus);
        const { toplinks } = await getTopLinks(`status=true`);
        setTopLinks(toplinks);
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

  // useEffect(() => {
  //   if (active) {
  //     initMenu();
  //     setActive(active);
  //   }
  // }, [active]);

  const renderMenuClass = (id) => {
    if (active._id == id) return `site__nav_item active`;
    if (active) return `site__nav_item unactive`;
    return `site__nav_item`;
  };

  const renderSecountMenuClass = (id) => {
    if (childeActive?._id == id) return `site__nav_item active`;
    if (childeActive) return `site__nav_item unactive`;
    return `site__nav_item`;
  };

  const initMenu = () => {
    setActive("");
    setChildeActive("");
    setBackground("");
  };

  const handleMenu = async (el) => {
    if (active?._id == el?._id) {
      // initMenu();
    } else {
      setActive(el);
      setChildeActive(null);
      el?.picture
        ? setBackground(base.cdnUrl + "/" + el.picture)
        : setBackground("");
    }
  };

  const handleSecoundMenu = (el) => {
    if (childeActive?._id == el?._id) {
      setChildeActive("");
      setBackground(base.cdnUrl + "/" + active?.picture);
    } else {
      setChildeActive(el);
      el?.picture
        ? setBackground(base.cdnUrl + "/" + el.picture)
        : setBackground("");
    }
  };

  const renderMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];

    categories &&
      categories.length > 0 &&
      categories.map((el) => {
        const isChildren = el.children.length > 0;
        myCategories.push(
          <li
            key={el._id}
            onClick={() =>
              windowWidth >= 767 && el._id != active._id && handleMenu(el)
            }
            className={
              renderMenuClass(el._id) + `${isChildren ? " site__nav_drop" : ""}`
            }
          >
            {el.isDirect && (
              <Link
                href={isChildren ? "#" : el.direct}
                target="_blank"
                className={`site__nav_link nav-primary__action-text ${
                  el.direct === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}
            {el.isModel && (
              <Link
                href={`${isChildren ? "#" : "/" + el.model}`}
                className={`site__nav_link nav-primary__action-text ${
                  "/" + el.model === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}

            {!el.isDirect && !el.model && (
              <Link
                href={`${isChildren ? "#" : "/p/" + el.slug}`}
                className={`site__nav_link nav-primary__action-text ${
                  "/p/" + el.slug === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}
            {el.children && (
              <div
                className={`mobile__secound_menu ${
                  el?._id == active?._id ? "open" : "close"
                }`}
              >
                <div className="site__nav_subtitle">
                  <h4>
                    <Link href={renderLink(active)}>
                      {languageRender(active, "name", language)}{" "}
                      <div className="sub__next_btn">
                        <i class="fa-solid fa-arrow-right"></i>
                      </div>
                    </Link>
                  </h4>
                  <p>{languageRender(active, "short", language)}</p>
                </div>
                {renderSecoundMenu(el.children)}
              </div>
            )}
          </li>
        );
      });

    return myCategories;
  };

  const renderSecoundMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];

    categories &&
      categories.length > 0 &&
      categories.map((el) => {
        const isChildren = el.children.length > 0;
        myCategories.push(
          <li
            key={el._id}
            onClick={() => handleSecoundMenu(el)}
            className={
              renderSecountMenuClass(el._id) +
              `${isChildren ? " site__nav_drop" : ""}`
            }
          >
            {el.isDirect && (
              <Link
                href={isChildren ? "#" : el.direct}
                target="_blank"
                className={`site__nav_link nav-primary__action-text ${
                  el.direct === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}
            {el.isModel && (
              <Link
                href={`${isChildren ? "#" : "/" + el.model}`}
                className={`site__nav_link nav-primary__action-text ${
                  "/" + el.model === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}

            {!el.isDirect && !el.model && (
              <Link
                href={`${isChildren ? "#" : "/p/" + el.slug}`}
                className={`site__nav_link nav-primary__action-text ${
                  "/p/" + el.slug === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}
          </li>
        );
      });

    return myCategories;
  };

  const renderLastMenu = (categories) => {
    let myCategories = [];

    categories &&
      categories.length > 0 &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id} className="site__nav_item">
            {el.isDirect && (
              <Link
                href={el.direct}
                target="_blank"
                className={`site__nav_link nav-primary__action-text ${
                  el.direct === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}
            {el.isModel && (
              <Link
                href={`${"/" + el.model}`}
                className={`site__nav_link nav-primary__action-text ${
                  "/" + el.model === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}

            {!el.isDirect && !el.model && (
              <Link
                href={`${"/p/" + el.slug}`}
                className={`site__nav_link nav-primary__action-text ${
                  "/p/" + el.slug === pathname && "active"
                }`}
              >
                {languageRender(el, "name", language)}
              </Link>
            )}
          </li>
        );
      });

    return myCategories;
  };

  const renderLink = (menu) => {
    if (menu) {
      if (menu.isDirect) return menu.direct;
      if (menu.isModel) return "/" + menu.model;
      return "/p/" + menu.slug;
    }
    return "#";
  };

  const handleClose = () => {
    toggleMenu();
    initMenu();
  };

  const handleBackOne = () => {
    setChildeActive(null);
    setBackground(base.cdnUrl + "/" + active?.picture);
  };

  return (
    <div className={`full__menu ${isOpen ? "open" : "close"}`}>
      <div
        className="site__nav"
        style={{
          backgroundImage: `url('${background}')`,
        }}
      >
        <header className="site__header">
          <div className="site__header_wrapper space-between">
            <Link href="/" className="site__header_logo_box">
              <img src={whiteLogo} />
            </Link>
            <div onClick={handleClose} className="site__header_toggle">
              <p>Буцах</p>
              <div className="close_btn">
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
        </header>
        <div className="site__nav_body">
          <div className="site__header_wrapper">
            <div
              className={`site__nav_one ${
                active && childeActive && "hide_one"
              }`}
            >
              {renderMenu(menus)}
            </div>
            <div
              className={`site__nav_secound ${active?.children ? "on" : ""}`}
            >
              {active && (
                <div className="site__nav_subtitle">
                  <h4>
                    {childeActive && (
                      <div className="back__nav_one" onClick={handleBackOne}>
                        <i className="fa-solid fa-chevron-left"></i>
                      </div>
                    )}
                    {languageRender(active, "name", language)}
                  </h4>
                  <p>{languageRender(active, "short", language)}</p>
                </div>
              )}
              {renderSecoundMenu(active?.children)}
            </div>
            <div
              className={`site__nav_last ${childeActive?.children ? "on" : ""}`}
            >
              <div className="back__nav_last" onClick={handleBackOne}>
                <div className="btn_back">
                  <i className="fa-solid fa-chevron-left"></i>
                </div>
                <p>{languageRender(childeActive, "name", language)}</p>
              </div>
              <div className="site__nav_subtitle">
                <h4>
                  <Link href={renderLink(childeActive)}>
                    {languageRender(childeActive, "name", language)}
                    <div className="sub__next_btn">
                      <i class="fa-solid fa-arrow-right"></i>
                    </div>
                  </Link>
                </h4>
                <p>{languageRender(childeActive, "short", language)}</p>
              </div>
              {renderLastMenu(childeActive?.children)}
            </div>
          </div>
        </div>
      </div>
      <div className="full__menu_foot">
        <div className="site__header_wrapper">
          <div className="full__menu_quick_links">
            <span>Хэрэгтэй холбоосууд</span>
            <div className="quick_links">
              {toplinks &&
                toplinks.map((el) => {
                  let link = "#";
                  if (el.direct) link = el.direct;
                  return (
                    <a href={link} className="quick__link" key={el.direct}>
                      {languageRender(el, "name", language)}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMenu;
