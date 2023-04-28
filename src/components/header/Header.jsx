import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose, VscSave } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./styles.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])

  const controlNavbar =() =>{
    if(window.scrollY > 200){
      if(window.scrollY>lastScrollY && !mobileMenu){
        setShow('hide')
      }
      else{
        setShow('show')
      }
      setLastScrollY(window.scrollY)
    }
    else{
      setShow('top')
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll",controlNavbar)
    return ()=> {
      window.removeEventListener("scroll",controlNavbar)
    }
  },[lastScrollY])

  const openSearch = ()  => {
    setShowSearch(true)
    setMobileMenu(false)
  }

  const openMobileMenu = () => {
    setShowSearch(false)
    setMobileMenu(true)
  }

  const searchQueryHandler =(e)=>{
    if(e.key === 'Enter' && query.length > 0){
      navigate(`/search/${query}`)
      setTimeout(()=>{
        setShowSearch(false)
      },1000);
    }
  }

  const navigationHandler = (type) => {
    if(type ==='movie'){
      navigate("/explore/movie");
    }
    else{
      navigate('/explore/tv');
    }
    setMobileMenu(false)
  };

  return (
    <header className={`header ${mobileMenu ? "mobile-view" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={()=>navigate('/')}/>
        </div>
        <ul className="menu-items">
          <li className="menu-item"
            onClick={() =>navigationHandler("movie")}
          >Movies</li>
          <li className="menu-item"
           onClick={() =>navigationHandler("tv")}
          >TV Shows</li>
          <li className="menu-item">
            <HiOutlineSearch 
            onClick={openSearch}
            />
          </li>
        </ul>
        <div className="mobile-menu-items">
          <HiOutlineSearch
            onClick={openSearch}
          />
          {
            mobileMenu ? 
            <VscChromeClose
            onClick={()=> setMobileMenu(false)}
            /> 
            : 
            <SlMenu
            onClick={openMobileMenu}
            />
          }
        </div>
      </ContentWrapper>

{showSearch && 
      <div className="search-bar">
        <ContentWrapper>
          <div className="search-input">
            <input
              type="text"
              placeholder='Seach for Movies or TV shows'
              onKeyUp={searchQueryHandler}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <VscChromeClose 
              onClick={()=>setShowSearch(false)}
            />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
};

export default Header;