import React from "react";
import Landing from "components/HomeSecound/Landing";
import FastLinks from "./FastLinks";
import Topnews from "./Topnews";
import Newnews from "./Newnews";
import VideoContent from "./VideoContent";
import Library from "./Library";
import Partners from "components/General/Partners";

const HomeSecound = () => {
  return (
    <>
      <Landing /> <FastLinks /> <Topnews /> <Newnews /> <VideoContent />
      <Library /> <Partners />
    </>
  );
};

export default HomeSecound;
