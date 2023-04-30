import React from 'react'
import "./styles.scss"
import useFetch from '../../utils/hooks/useFetch'
import { useParams } from 'react-router-dom'

const Detail = () => {

  const {mediatype,id} = useParams();
  // console.log(param);
  const {data,loading} = useFetch(`/${mediatype}/${id}`)
  console.log(data)

  return (
    <div>Detail</div>
  )
}

export default Detail