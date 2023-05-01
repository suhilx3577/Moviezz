import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../utils/hooks/useFetch";
const Similar = ({ mediatype, id }) => {
    const { data, loading, error } = useFetch(`/${mediatype}/${id}/similar`);

    const title = mediatype === "tv" ? "Similar TV Shows" : "Similar Movies";
    console.log(data)

    return (
        data?.results?.length >1 &&
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediatype}
        />
    );
};

export default Similar;
