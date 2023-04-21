import React,{useState,useEffect} from "react";
import  ReactDOM from "react-dom/client";
import { fetchData } from "../utils/api";
import { getApiConfig } from "../store/homeSlice";

import { useSelector,useDispatch } from "react-redux";

const App =() =>{

    const dispatch = useDispatch();
    const response = useSelector((store)=>store?.home?.url?.results)
    // console.log(response)
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