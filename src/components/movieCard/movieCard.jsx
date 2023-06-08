import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles.scss";
// import Img from "../lazyLoadImage/Img"
import LazyLoadImg from "../lazyLoad-image/LazyLoadImg";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediatype }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data?.poster_path
        ? url.imageURL + data?.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediatype}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <img className="lazy-load" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        {/* <CircleRating rating={data?.vote_average.toFixed(1)} /> */}
                        <Genres data={data?.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;