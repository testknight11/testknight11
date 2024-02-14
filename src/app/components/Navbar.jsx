"use client";
import React from 'react'
import Link from 'next/link'
import {useStateContext} from '../../../context/StateContext';
import {AiOutlineShopping,AiOutlineWhatsApp} from 'react-icons/ai'
import {Cart} from './'
// import Layout from '../../src/app/components/Layout'; // Import the Layout component

function Navbar() {

  const {showCart,setShowCart,totalQuantities}=useStateContext();
  console.log(totalQuantities)
  return (
    <div className="navbar-container">
      <div className="logo">
        <Link style={{display:'flex',justifyContent:'center',alignItems:'center'}} href="https://wa.me/+21652344555"><p>UZL</p>
        <AiOutlineWhatsApp/>
        </Link>
       
      </div>
      <button className="cart-icon" onClick={()=>setShowCart(true)}>

        <AiOutlineShopping/>
        <span className="cart-item-qty">
        {totalQuantities}
        </span>
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar