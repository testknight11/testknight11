"use client";
import { useEffect, useRef,useState} from 'react';
import React from 'react'
import Link from 'next/link'
import { useStateContext } from '../../../context/StateContext';
import { AiOutlineShopping, AiOutlineWhatsApp, AiOutlineSearch ,AiOutlineClose} from 'react-icons/ai'
import { Cart } from './'
// import Layout from '../../src/app/components/Layout'; // Import the Layout component

function Navbar() {

  const { showCart, setShowCart, totalQuantities } = useStateContext();
  console.log(totalQuantities)
  const [searchResults, setSearchResults] = useState(false);
  const searchResultsRef = useRef(null);

  const searchInputRef = useRef(null);
  useEffect(() => {
   

      handleSearch()








  }, [])

  async function handleSearch() {

    let query;

   
      query =searchInputRef.current.value;
      if (query.length === 0) {
        searchResultsRef.current.innerHTML = '';
        return;
      }





      query = encodeURIComponent(query)

      console.log({query})

    const response = await fetch('/api/searchProduct', {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({query}),
    })
console.log(response)
    if (response.statusCode === 500) return
    const data = await response.json();
    console.log(data)
    if(data.length>0){setSearchResults(true)}
    displayResults(data)





  }



  function displayResults(results) {
    searchResultsRef.current.innerHTML = '';

    if (results.length === 0) {
      searchResultsRef.current.innerHTML = 'No results found';
      return;
    }

    const ul = document.createElement('ul');
    results.forEach(product => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href=`/product/${product.slug.current}`
      a.appendChild(li)
      li.textContent = product.name;
      li.dataset.slug=product.slug.current;
      ul.appendChild(a);
    });
console.log(searchResultsRef.current)
    searchResultsRef.current.appendChild(ul);
  }








  <div></div>

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="https://wa.me/+21652344555"><p>UZL</p>
          <AiOutlineWhatsApp />
        </Link>

      </div>
      <div>
        <div style={{ display: "flex", position: 'relative', justifyContent: 'center', alignItems: 'center  ' }}>
          <input type="text" id="searchInput" ref={searchInputRef} placeholder="Search products..." onKeyUp={handleSearch}/>
          <AiOutlineSearch style={{ position: 'absolute', right: '0' }} />
        </div>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        <div id="searchResults" ref={searchResultsRef}>



        </div>
        {searchResults&&<AiOutlineClose onClick={()=>{
          searchResultsRef.current.innerHTML="";

setSearchResults(false)

        }}/>}
        </div>
      </div>
      <button className="cart-icon" onClick={() => setShowCart(true)}>

        <AiOutlineShopping />
        <span className="cart-item-qty">
          {totalQuantities}
        </span>
      </button>
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar