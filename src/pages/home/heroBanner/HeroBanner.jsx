import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import "./styles.scss"
import useFetch from '../../../utils/hooks/useFetch'
import { useEffect } from 'react'
import {useSelector} from 'react-redux'

const HeroBanner = () => {
  const navigate = useNavigate()
  const {imageURL} = useSelector((state)=>state?.home?.url)

  const [background,setBackground] = useState("")
  const [query,setQuery] = useState("")

  const {data,loading} = useFetch("/movie/upcoming")
  useEffect(()=>{
    const bg = imageURL+data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  },[data])

  const searchQueryHandler =(e)=>{
    if(e.key === 'Enter' && query.length > 0){
      navigate(`/search/${query}`)
    }
    // console.log(e)
  }

  return (
    <div className='heroBanner'>
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className='title'> Welcome</span>
          <span className='subTitle'> Millions of movies and TV shows</span>
          <div className="searchInput">
            <input 
              type="text" 
              placeholder='Seach for Movies or TV shows'
              onKeyUp={searchQueryHandler}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner