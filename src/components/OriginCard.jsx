import React from 'react'

export default function OriginCard({ originToShow, promoToShow }) {
  return (
    <div className="imageContainer">
      <img className="image image1" src={promoToShow} alt="" />

      <img className="image image2" src={originToShow} alt="" />
    </div>
  )
}
