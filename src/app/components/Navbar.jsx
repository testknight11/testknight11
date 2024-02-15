"use client";
import { useEffect } from 'react';
import React from 'react'
import Link from 'next/link'
import { useStateContext } from '../../../context/StateContext';
import { AiOutlineShopping, AiOutlineWhatsApp, AiOutlineSearch } from 'react-icons/ai'
import { Cart } from './'
// import Layout from '../../src/app/components/Layout'; // Import the Layout component

function Navbar() {

  const { showCart, setShowCart, totalQuantities } = useStateContext();
  console.log(totalQuantities)
  async function handleSearch(query) {



    
    const response = await fetch('/api/searchProduct', {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json',

      },
      body: query,
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        displayResults(data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
    




  }


//   const searchInput = document.getElementById('searchInput');
//   const searchResults = document.getElementById('searchResults');
//   let query;

//   searchInput?.addEventListener('keypress', (event) => {
//     query = searchInput.value.trim();
//     console.log(query)
//     if (query.length === 0) {
//       searchResults.innerHTML = '';
//       return;
//     }





//     query = encodeURIComponent(query)

// handleSearch(query)


//   });
  function displayResults(results) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
      searchResults.innerHTML = 'No results found';
      return;
    }

    const ul = document.createElement('ul');
    results.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product.name;
      ul.appendChild(li);
    });

    searchResults.appendChild(ul);
  }









return (
  <div className="navbar-container">
    <div className="logo">
      <Link style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="https://wa.me/+21652344555"><p>UZL</p>
        <AiOutlineWhatsApp />
      </Link>

    </div>
    <div>
      <div style={{ display: "flex", position: 'relative', justifyContent: 'center', alignItems: 'center  ' }}>
        <input type="text" id="searchInput" placeholder="Search products..." />
        <AiOutlineSearch style={{ position: 'absolute', right: '0' }} />
      </div>
      <div id="searchResults"></div>
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