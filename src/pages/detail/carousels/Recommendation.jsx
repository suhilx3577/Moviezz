// Recommendation

import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../utils/hooks/useFetch";


const Recommendation = ({ mediatype, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediatype}/${id}/recommendations`
    );

    console.log(data)
    return (
        data?.results?.length>2 && 
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediatype}
        />
    );
};

export default Recommendation;