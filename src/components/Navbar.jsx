import navIcon from '../assets/StreamFlixer.webp'
import profile from '../assets/profile.webp'
import './navbar.css'
import {useEffect, useState} from "react";
import Row from "./Row.jsx";
const API_KEY = 'aef57bcee656460a57fa21d71bc1b9b5'
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [search, setSearch] = useState("")
    const [url, setUrl] = useState()
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>200) setScrolled(true)
            else setScrolled(false)
        })
        return () => window.addEventListener('scroll',()=>{})
    },[])
    useEffect(() => {
        async function fetchSearch() {
            setUrl(`/search/movie?api_key=${API_KEY}&query=${search}&include_adult=false&language=en-US&page=1&pageSize=5`)
        }
        search && fetchSearch()
    }, [search]);

    return(
        <div className={`navbar ${(search || scrolled) && 'nav__bg'} ${scrolled && 'nav__scrolled'}`}>
            <div className='nav__header'>
                <img
                    src={navIcon}
                    className='nav__icon'
                    alt='Stremflixer icon'
                />
                <div className='icons__container'>
                    <div className={`search__container`}>
                        <input type='text' onChange={(e)=>setSearch(e.target.value)}/>
                        <i className="fa fa-search search__icon" aria-hidden="true"></i>
                    </div>
                    <img src={profile}
                         className='profile__icon'
                         alt='profile icon'
                    />
                </div>
            </div>
            {search && <Row title='SEARCH RESULTS' url={url}/>}
        </div>
    )
}

export default Navbar;