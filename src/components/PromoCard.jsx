import React from 'react'

export default function PromoCard({ promoToShow }) {
  return (
    <div>
      <img
        style={{
          width: '400px',
          // border: '1px solid black',
          boxShadow: '11px 13px 15px -3px rgba(0,0,0,0.1)',
        }}
        src={promoToShow}
        alt=""
      />
    </div>
  )
}
