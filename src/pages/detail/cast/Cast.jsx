import React from "react";
import { useSelector } from "react-redux";

import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import LazyLoadImg from "../../../components/lazyLoad-image/LazyLoadImg";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { imageURL } = useSelector((state) => state.home.url);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {
              data?.map((item)=>{
                let imgUrl = item?.profile_path ? imageURL+item.profile_path : avatar;
                return(
                  <div key={item.id}className="listItem">
                    <div className="profileImg">
                      <LazyLoadImg src={imgUrl}/>
                    </div>
                    <div className="name">
                      {
                        item.name
                      }
                    </div>
                    <div className="character">
                      {
                        item.character
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;