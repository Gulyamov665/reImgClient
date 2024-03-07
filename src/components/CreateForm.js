import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ImageComponent from './ImageComponent'
import { MainFormContext } from './MainForm'
import { Excel } from '../Utils/Excel'
import { DownloadImages } from '../Utils/DownloadImages'

export const CreatedContext = createContext([])

function CreateForm() {
  const { imgToShow, images, user, name, description } =
    React.useContext(MainFormContext)

  const history = useNavigate()
  const [imgTitle, setImgTitle] = useState('')
  const [imgDsc, setImgDsc] = useState('')
  const [imgPrice, setImgPrice] = useState('')

  console.log(images)
  const CreateObject = async () => {
    let formData = new FormData()
    formData.append('user', user)
    formData.append('name', name)
    formData.append('description', description)

    if (images !== null) {
      images.forEach((image) => {
        formData.append('uploaded_images', image)
      })
    }
    imgTitle.forEach((title) => {
      formData.append('title', title)
    })
    if (imgPrice !== '')
      imgPrice.forEach((price) => {
        formData.append('img_price', price)
      })
    if (imgDsc !== '')
      imgDsc.forEach((Dsc) => {
        formData.append('img_desc', Dsc)
      })

    await axios({
      method: 'post',
      url: 'http://localhost:8000/api/create',
      data: formData,
    }).then((response) => {
      console.log(response.data)
    })

    ReImage()
  }

  const ReImage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/resize_image',
        { res: name }
      )
      console.log(response.data.message)
    } catch (error) {
      console.error(error)
    }

    Excel(name)
    DownloadImages(name)
    history('/')
  }

  return (
    <div>
      <div>
        <CreatedContext.Provider
          value={{
            imgToShow,
            imgTitle,
            setImgTitle,
            imgDsc,
            setImgDsc,
            imgPrice,
            setImgPrice,
          }}
        >
          <ImageComponent />
        </CreatedContext.Provider>
      </div>

      <button className="btn btn-warning btn-block mb-4" onClick={CreateObject}>
        Add Restaraunt
      </button>
    </div>
  )
}
export default CreateForm
