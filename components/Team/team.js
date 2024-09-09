"use client";
import { useState } from "react";
import styles from "styles/Team.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import { useCookies } from "react-cookie";
import Link from "next/link";

const Team = ({ memberData, boolenPop = true }) => {
  const [pop, setPop] = useState(false);
  const [cookies] = useCookies(["language"]);

  const handleClick = () => {
    if (boolenPop) {
      setPop((bf) => (bf === true ? false : true));
    }
  };

  let lang;
  if (memberData[cookies.language] === undefined) {
    if (cookies.language == "mn") lang = "eng";
    else lang = "mn";
  } else lang = cookies.language;

  return (
    <>
      <div className="col-lg-3 col-md-6">
        <a
          href={`/members/${memberData._id}`}
          target="_blank"
          className={styles.TeamTarget}
        >
          <div className={styles.Team}>
            <div className={styles.UserImg}>
              {memberData.picture ? (
                <img src={base.cdnUrl + "/" + memberData.picture} />
              ) : (
                <img src={"/assets/img/no-photo.jpg"} />
              )}
            </div>
            <p>{memberData[lang].name}</p>
            <span>{memberData[lang].degree}</span>
          </div>
        </a>
      </div>
      <div
        className={`${styles.BlackBg} ${
          pop === true ? styles.DisplayFlex : styles.DisplayOff
        }`}
      >
        <div
          className={`${styles.Window} animate__animated animate__fadeIn ${
            pop === true ? styles.DisplayOn : styles.DisplayOff
          }`}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.CloseIcon}
            onClick={handleClick}
          />
          {memberData.picture ? (
            <img
              src={base.cdnUrl + "/" + memberData.picture}
              className={styles.WindowImg}
            />
          ) : (
            <img
              src={"/assets/img/no-photo.jpg"}
              className={styles.WindowImg}
            />
          )}
          <div className={styles.Info}>
            <h6> {memberData[lang].name}</h6>
            <span> {memberData[lang].degree} </span>
            <p dangerouslySetInnerHTML={{ __html: memberData[lang].about }}></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
