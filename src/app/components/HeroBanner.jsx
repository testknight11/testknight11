import React from 'react'
import Link from 'next/link'
import {urlFor} from '../../../lib/client'
function HeroBanner({heroBanner}) {
  if (!heroBanner) {
    return null; // or render a loading indicator
  }

  //console.log(heroBanner.image)
  return (
    <div className="hero-banner-container">
      <div className="hero-banner-flex md:flex-row">
        <div>
      <p className="beats-solo"> {heroBanner?.smallText}
        </p>
        <h3>
        {heroBanner?.midText}
        </h3>
        <Link className="block text-center" href={`/product/${heroBanner.product}`}>
    <button type="button">{heroBanner?.buttonText}</button>


  </Link>
        </div>
 <img src={urlFor(heroBanner.image)} alt="dining-table" className="hero-banner-image"/>
 <div>
  
  <div className="desc">
    <h5>
      Description
    </h5>
    <p>
    {heroBanner?.desc }
    </p>

  </div>
 </div>
    </div></div>
  )
}

export default HeroBanner