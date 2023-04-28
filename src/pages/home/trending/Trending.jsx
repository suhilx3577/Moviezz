import React,{useState} from 'react'
import useFetch from '../../../utils/hooks/useFetch'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "../styles.scss"
import SwitchTabs from '../../../components/switchtabs/SwitchTabs'
const Trending = () => {
  const [endpoint,setEndpoint] = useState('day')
  const {data,loading} = useFetch(`/trending/all/${endpoint}`)

  const onTabChange =(tab) => {
    setEndpoint(tab==='Day'? 'day':'week')
  }

  return (
    <div className='carousel-section'>
        <ContentWrapper >
            <span className="carousel-title">Trending</span>
            <SwitchTabs 
            data={["Day","Week"]}
            onTabChange={onTabChange}
            />
        </ContentWrapper>
    </div>
  )
}

export default Trending