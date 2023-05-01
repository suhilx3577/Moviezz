import React, { useState } from "react";

import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videopopup/VideoPopup";
import LazyLoadImage from "../../../components/lazyLoad-image/lazyLoadImg";


const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return ( data?.results?.length>2 &&
    <div className="videosSection">
      <ContentWrapper>

          <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
          {
            data?.results?.map((video,i)=>[
              <div className="videoItem" key={video.id}
              onClick={()=>{
                setVideoId(video.key)
                  setShow(true)
                }}
                >
                  <div className="videoThumbnail">
                    <LazyLoadImage src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                    <PlayIcon/>
                  </div>
                  <div className="videoTitle">
                    {video.name}
                  </div>
                </div>
              ])
            }
            </div>
            ) : (
          <div className="videoSkeleton">
          {loadingSkeleton()}
          {loadingSkeleton()}
          {loadingSkeleton()}
          {loadingSkeleton()}
          </div>
          )}
      </ContentWrapper>
      <VideoPopup
      show={show}
      setShow={setShow}
      videoId={videoId}
      setVideoId={setVideoId}
      />
    </div>
  );
    
};

export default VideosSection;