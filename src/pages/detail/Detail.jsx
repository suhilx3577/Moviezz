import React from 'react'
import "./styles.scss"
import useFetch from '../../utils/hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailbanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosection/VideoSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Detail = () => {
  const {mediatype,id} = useParams();
  const {data, loading} = useFetch(`/${mediatype}/${id}/videos`)
  const {data:credits, loading:credits_loading} = useFetch(`/${mediatype}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data = {credits?.cast} loading={credits_loading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediatype={mediatype} id={id}/>
      <Recommendation mediatype={mediatype} id={id}/>
    </div>
  )
}

export default Detail