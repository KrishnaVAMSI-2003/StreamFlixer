import {useEffect, useState} from "react";
import axios from './axios.js'
import movieTrailer from "movie-trailer";
import './row.css'
import Details from "./Details.jsx";

// eslint-disable-next-line react/prop-types
const Row = ({title, url, isLong}) => {
    const base_url = 'https://image.tmdb.org/t/p/w500'
    const [movies, setMovies] = useState([]);
    const [showDetails, setShowDetails] = useState(false)
    const [details, setDetails] = useState()
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect( () => {
        async function fetchData() {
            const requests = await axios.get(url)
            setMovies(requests.data.results)
        }
        url && fetchData().then(()=>{})
    }, [url]);

    const handleClick = (movie) => {
        setDetails(movie)
        setShowDetails(true)
        movie && movieTrailer(movie?.title || movie?.name).then((url)=>{
            const urlParams = new URLSearchParams(new URL(url).search)
            if(urlParams) setTrailerUrl(urlParams.get("v"))
            else setTrailerUrl("")
        })
    }
    return(
        <div className='poster__row'>
            <h2>{title}</h2>
            <div className='poster__container'>
                {
                    movies.map((movie)=>{
                        return(
                            <img
                                key={movie.id}
                                className={`poster__img ${isLong && 'long__img'}`}
                                src={`${base_url}${isLong ? movie.poster_path :movie.backdrop_path}`}
                                alt={`${movie.title}`}
                                onClick={()=>handleClick(movie)}
                            />
                        )
                    })
                }
            </div>
            {showDetails && <Details details={details} trailerUrl={trailerUrl} setShowDetails={setShowDetails}/>}
        </div>
    )
};
export default Row;