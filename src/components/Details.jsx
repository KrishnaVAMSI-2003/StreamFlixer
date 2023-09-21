import YouTube from "react-youtube";

// eslint-disable-next-line react/prop-types
const Details = ({details, trailerUrl, setShowDetails}) => {
    const opts = {
        height: '300',
        width: '500',
        playerVars: {
            autoplay: 1,
        }
    }
    return(
        <div className='details__popup'>
            <i className="fa fa-window-close close__icon" aria-hidden="true" onClick={()=>setShowDetails(false)}></i>
            <div className='details__container'>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
                <h1>{details?.title || details?.name}</h1>
                <h4>released on: {details.release_date}</h4>
                <p>{details.overview}</p>
            </div>
        </div>
    )
}

export default Details;