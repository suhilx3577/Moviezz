import React,{useState,useEffect} from "react";
import  ReactDOM from "react-dom/client";
import { fetchData } from "./utils/api";
import { getApiConfig } from "./store/homeSlice";
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
        apicall();
    },[])
    
    const apicall =()  =>{
        fetchData("/movie/popular")
            .then((res)=> {
                dispatch(getApiConfig(res))
            });
    };
    
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