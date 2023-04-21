import React,{useState,useEffect} from "react";
import  ReactDOM from "react-dom/client";
import { fetchData } from "../utils/api";

const App =() =>{

    const [title, setTitle] = useState("Hello World")

    useEffect(()=>{
        apicall();
    },[])
    
    const apicall =()  =>{
        fetchData("/movie/popular")
            .then((res)=> {
                console.log(res.results[0].title)
                setTitle(res?.results[0]?.title)
            });
    };
    
    return(
        <h1>{title}</h1>
    )
}

export default App