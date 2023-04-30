import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./styles.scss";

import { Playbtn } from "./Playbtn";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../utils/hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import LazyLoadImage from "../../../components/lazyLoad-image/lazyLoadImg";
import PosterFallback from "../../../assets/no-poster.png";

const DetailsBanner = ({ video, crew }) => {

  const { mediatype, id } = useParams();
  const { data, loading } = useFetch(`/${mediatype}/${id}`)

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const { imageURL } = useSelector((state) => state.home.url)
  // console.log(imageURL)
  const _genres = data?.genres?.map((g)=> g.id)

  return (
    <div className="details-banner">
      {!loading ? (
        <React.Fragment>
          {
          !!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <LazyLoadImage src={imageURL + data?.backdrop_path} />
              </div>
              <div className="opacity-layer">
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {
                        data?.poster_path ? (<LazyLoadImage className='poster-img' src={imageURL+data?.poster_path}/>) : (<LazyLoadImage className='poster-img' src={PosterFallback}/>)
                      }
                    </div>
                    <div className="right">
                      <div className="title">
                        {
                          `${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`
                        }

                      </div>
                      <div className="subtitle">
                        {data?.tagline}
                      </div>
                      <Genres data={_genres} />

                      <div className="row">
                        <CircleRating
                        rating={data?.vote_average.toFixed(1)}
                        />
                        <div className="playbtn"
                        onClick={()=>{}}
                        >
                          <Playbtn/>
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>
                      <div className="overview">
                        <div className="heading">
                          Overview
                        </div>
                        <div className="description">
                          {data?.overview}
                        </div>
                      </div>
                    </div>
                  </div>
                </ContentWrapper>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <div className="details-banner-skeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;