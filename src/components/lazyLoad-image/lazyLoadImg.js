import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyLoadImg = ({src , className}) => {
  return (
      <LazyLoadImage
      className={className || ""}
      alt="Notloaded"
      effect="blur"
      src={src}
      />
  )
}

export default LazyLoadImg