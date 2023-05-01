import React from 'react'
import "./styles.scss"
import useFetch from '../../utils/hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailbanner/DetailsBanner'

const Detail = () => {
  return (
    <div>
      <DetailsBanner/>
    </div>
  )
}

export default Detail