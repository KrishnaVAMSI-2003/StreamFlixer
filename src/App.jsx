import Navbar from "./components/Navbar.jsx";
import Banner from "./components/Banner.jsx";
import Row from './components/Row.jsx'
import requests from "./components/requests.js";

const App = () => {
    return(
        <div>
            <Navbar/>
            <Banner url={requests.fetchPopular}/>
            <Row title={"TRENDING NOW"} url={requests.fetchTrending}/>
            <Row title={"TOP RATED"} url={requests.fetchTopRated}/>
            <Row title={"STREAMFLIXER ORIGINALS"} url={requests.fetchNetflixOriginals} isLong/>
            <Row title={"ACTION"} url={requests.fetchActionMovies}/>
            <Row title={"COMEDY"} url={requests.fetchComedyMovies}/>
            <Row title={"HORROR"} url={requests.fetchHorrorMovies}/>
            <Row title={"ROMANCE"} url={requests.fetchRomanceMovies}/>
            <Row title={"DOCUMENTARIES"} url={requests.fetchDocumentaries}/>
        </div>
    )
};

export default App;