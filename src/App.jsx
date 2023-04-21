import React,{useState,useEffect} from "react";
import  ReactDOM from "react-dom/client";
import { fetchData } from "./utils/api";
import { getApiConfig } from "./store/homeSlice";

import { useSelector,useDispatch } from "react-redux";

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
                console.log(res)
                dispatch(getApiConfig(res))
            });
    };
    
    return(
        <h1>Hello World - {response? response[0].title : "waiting"} </h1>
    )
}

export default App