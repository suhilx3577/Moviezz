import React ,{useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import "./styles.scss"

import { fetchData } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'


const SearchResult = () => {

  const [data, setData] = useState(null);
  const [pageNum , setPageNum] = useState(1);
  const [loading, setLoading] = useState(false)
  const {query} = useParams();

  const fetchInitialData = () => {
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      setData(res)
      setPageNum((prev)=> prev + 1)
      setLoading(false)
    })
    console.log(data)
  }

  useEffect(()=>{
    fetchInitialData();
  },[query])

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      if(data?.results) {
        setData({...data , results: [...data?.results , ...res.results]})
      }
      else{
        setData(res)
      }
      setPageNum((prev)=>prev+1);
    })
  }

  return (
    <div className='searchResultPage'>
      {
        loading && <Spinner initial={true}/>
      }
    </div>
  )
}

export default SearchResult