import React,{useState,useEffect} from "react";
import  ReactDOM from "react-dom/client";
import { fetchData } from "./utils/api";
import { getApiConfig,getGenres } from "./store/homeSlice";
import { useSelector,useDispatch } from "react-redux";
import { BrowserRouter,Routes, Route } from "react-router-dom";

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Detail from "./pages/detail/Detail"
import Explore from "./pages/explore/Explore"
import Home from "./pages/home/Home"
import Error404 from "./pages/error404/Error404"
import SearchResult from "./pages/searchResult/SearchResult"



const App =() =>{

    const dispatch = useDispatch();
    const response = useSelector((store)=>store?.home?.url?.results)
    useEffect(()=>{
        fetchAPIConfig();
        genreCall();
    },[])
    
    const fetchAPIConfig =()  =>{
        fetchData("/configuration")
            .then((res)=> {
                const data = {
                    imageURL : res?.images?.secure_base_url+"original"
                }
                dispatch(getApiConfig(data))
            });
    };

    const genreCall = async () => {
        let promises = []
        let endPoints = ["movie","tv"]
        let allGenres = {}

        endPoints.forEach((url)=>{
            promises.push(fetchData(`/genre/${url}/list`))
        })

        const data = await Promise.all(promises)
        // console.log(data)
        data.map(({genres})=>{
            return genres?.map((item)=>(allGenres[item.id]) = item)
        })
        
        dispatch(getGenres(allGenres))

    }
    


    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<Error404/>}/>
                <Route path="/:mediatype/:id" element={<Detail/>}/>
                <Route path="/search/:query" element={<SearchResult/>}/>
                <Route path="/explore/:mediatype" element= {<Explore/>}/>

            </Routes>
        <Footer/>
        </BrowserRouter>
    )
}

export default App