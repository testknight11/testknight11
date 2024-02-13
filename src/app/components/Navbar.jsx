"use client";
import React from 'react'
import Link from 'next/link'
import {useStateContext} from '../../../context/StateContext';
import {AiOutlineShopping} from 'react-icons/ai'
import {Cart} from './'
// import Layout from '../../src/app/components/Layout'; // Import the Layout component

function Navbar() {

  const {showCart,setShowCart,totalQuantities}=useStateContext();
  console.log(totalQuantities)
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Lydia furniture store
        </Link>
      </p>
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