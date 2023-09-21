import {useEffect, useState} from "react";
import axios from "axios";
import './banner.css'
import movieTrailer from "movie-trailer";
import Details from "./Details.jsx";
// eslint-disable-next-line react/prop-types
const Banner = ({url}) => {
    const [movie, setMovie] = useState({});
    const [showDetails, setShowDetails] = useState(false)
    const [details, setDetails] = useState()
    const [trailerUrl, setTrailerUrl] = useState('')
    const baseUrl = axios.create({
        baseURL: "https://api.themoviedb.org/3",
    })
    useEffect(()=>{
        async function fetchData() {
            const data = await baseUrl.get(url)
            const movies = data.data.results
            setMovie(movies[Math.floor(Math.random()*movies.length-1)])
        }
        fetchData()
    },[url])

    function truncate(str, len) {
        return str?.length > len ? str.substring(0, len-1)+"..." : str+"...";
    }
    const handleClick = () => {
        setShowDetails(true)
        setDetails(movie)
        console.log('clicked on play')
        movieTrailer(movie?.title || movie?.name).then((url)=>{
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerUrl(urlParams.get("v"))
        })
    }

    return(
        <div
            style={{backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`}}
            className='banner--container'
        >
            <div className='banner__content'>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_title}</h1>
                <div className='buttons__container'>
                    <button className='banner__button' onClick={()=> {
                        handleClick()
                    }}>play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <h1 className='banner__overview'>{truncate(movie.overview, 200)}</h1>
            </div>
            <div className='banner__bottomFade'></div>
            {showDetails && <Details details={details} trailerUrl={trailerUrl} setShowDetails={setShowDetails}/>}
        </div>
    )
}

export default Banner