import React,{useState} from 'react'

import useFetch from '../../../utils/hooks/useFetch'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "../styles.scss"
import SwitchTabs from '../../../components/switchtabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel'


const Popular = () => {
  const [endpoint,setEndpoint] = useState('movie')
  const {data,loading} = useFetch(`/${endpoint}/popular`)

  const onTabChange =(tab) => {
    setEndpoint(tab=== "Movies"? 'movie':'tv')
  }

  return (
    <div className='carousel-section'>
        <ContentWrapper >
            <span className="carousel-title">What's Popular</span>
            <SwitchTabs 
            data={["Movies","TV Show"]}
            onTabChange={onTabChange}
            />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default Popular