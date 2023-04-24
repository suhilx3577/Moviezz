import { useState, useEffect } from "react";
import { fetchData } from "../api";

const useFetch = (url) => {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState('Loading...')
    const [error, setError] = useState(null)

    useEffect (()=>{

        setLoading('Loading...')
        setData(null)
        setError(null)

        fetchData(url)
        .then((res)=>{
            setLoading(false)
            setData(res)
        })
        .catch((e)=>{
            setLoading(false)
            setError("Something Went Wrong");
        })

    },[url])

    return {data,loading,error}
}

export default useFetch