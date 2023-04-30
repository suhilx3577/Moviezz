import React,{useState} from 'react'

import useFetch from '../../../utils/hooks/useFetch'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "../styles.scss"
import SwitchTabs from '../../../components/switchtabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel'


const TopRated = () => {
  const [endpoint,setEndpoint] = useState('movie')
  const {data,loading} = useFetch(`/${endpoint}/top_rated`)

  const onTabChange =(tab) => {
    setEndpoint(tab==='Movies'? 'movie':'tv')
  }

  return (
    <div className='carousel-section'>
        <ContentWrapper >
            <span className="carousel-title">Top Rated</span>
            <SwitchTabs 
            data={["Movies","TV Shows"]}
            onTabChange={onTabChange}
            />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated