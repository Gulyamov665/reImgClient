import React from 'react'
import OriginCard from './OriginCard'

export default function OriginCards({ originToShow }) {
  return (
    <div>
      {originToShow &&
        originToShow?.map((image) => <OriginCard originToShow={image} />)}
    </div>
  )
}
