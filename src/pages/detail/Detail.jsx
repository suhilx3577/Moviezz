import React from 'react'
import "./styles.scss"
import useFetch from '../../utils/hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailbanner/DetailsBanner'

const Detail = () => {
  const {mediatype,id} = useParams();
  const {data, loading} = useFetch(`${mediatype}/${id}/videos`)
  const {data:credits, loading:credits_loading} = useFetch(`${mediatype}/${id}/videos`)

  return (
    <div>
      <DetailsBanner/>
    </div>
  )
}

export default Detail