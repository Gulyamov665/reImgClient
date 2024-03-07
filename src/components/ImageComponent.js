import React from 'react'
import { CreatedContext } from './CreateForm'

const ImageComponent = () => {
  const {
    imgToShow,
    imgTitle,
    setImgTitle,
    imgDsc,
    setImgDsc,
    imgPrice,
    setImgPrice,
  } = React.useContext(CreatedContext)
  return (
    <div className="parent">
      {Array.isArray(imgToShow) &&
        imgToShow?.map((img, i) => (
          <div className="div1 text-center form-control" key={i}>
            <img
              className="mb-2 rounded"
              style={{ width: 350, height: 250, objectFit: 'cover' }}
              src={img}
              width={400}
              height={400}
              alt="Selected Image"
            />
            <div className="mb-2 text-center">
              <input
                className="form-control"
                type="text"
                name="imgTitle"
                value={imgTitle[i]}
                onChange={(e) => {
                  const newImgTitle = [...imgTitle]
                  newImgTitle[i] = e.target.value
                  setImgTitle(newImgTitle)
                }}
                placeholder="Название"
              />
            </div>
            <div className="mb-2">
              <textarea
                className="form-control"
                type="text"
                name="imgDsc"
                value={imgDsc[i]}
                onChange={(e) => {
                  const newImgDsc = [...imgDsc]
                  newImgDsc[i] = e.target.value
                  setImgDsc(newImgDsc)
                }}
                placeholder="Описание"
              />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                type="number"
                name="imgPrice"
                value={imgPrice[i]}
                onChange={(e) => {
                  const newImgPrice = [...imgPrice]
                  newImgPrice[i] = e.target.value
                  setImgPrice(newImgPrice)
                }}
                placeholder="Цена"
              />
            </div>
          </div>
        ))}
    </div>
  )
}

export default ImageComponent
