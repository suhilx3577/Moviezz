import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./styles.scss";
import '../../index.scss'
import LazyLoadImage from "../lazyLoad-image/lazyLoadImg";
import Genres from "../genres/Genres";


const Carousel = ({ data, loading ,endpoint ,title}) => {

  const carouselContainer = useRef();
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior:"smooth",
    })
  }

  const skitem = () => {
    return (
      <div className="skeleton-item">
        <div className="poster-block skeleton"></div>
        <div className="text-block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>

      </div>
    )
  }
  // console.log(data)

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && 
          <div className="carousel-title">{title}</div>
        }
        <BsFillArrowLeftCircleFill
          className="carousel-left-nav arrow"
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right-nav arrow"
          onClick={() => navigation('right')}
        />
        {!loading ? (
          <div className="carousel-items" ref={carouselContainer}>
            {
              data?.map((item) => {
                const posterUrl = item.poster_path ? url.imageURL + item.poster_path : PosterFallback;
                return (
                  <div
                    key={item.id}
                    className="carousel-item"
                    onClick={()=>{
                      navigate(`/${item.media_type || endpoint}/${item.id}`)
                    }}
                    >
                    <div className="poster-block">
                      <LazyLoadImage className='lazy-load' src={posterUrl} />
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                      <Genres data={item?.genre_ids?.slice(0, 2)} />
                    </div>
                    <div className="text-block">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">{dayjs(item.release_date).format('MMM D, YYYY')}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        ) : (
          <div className="loading-skeleton">
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel