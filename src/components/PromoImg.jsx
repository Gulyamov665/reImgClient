import React, { useState } from 'react'
import axios from 'axios'
import OriginCard from './OriginCard'
import PromoCard from './PromoCard'
import { DownloadImages } from '../Utils/DownloadImages'
import { useNavigate } from 'react-router-dom'

const baseURL = process.env.REACT_APP_BASE_URL

export default function PromoImg() {
  const [promoImg, setPromoImg] = useState(null)
  const [origin, setOrigin] = useState([])
  const [vendor, setVendor] = useState('')
  const [promoToShow, setPromoToShow] = useState(null)
  const [originToShow, setOriginToShow] = useState([])
  const [loadZip, setLoadZip] = useState(false)

  const navigate = useNavigate()

  const handleLoad = async (e) => {
    e.preventDefault()
    let formData = new FormData()

    formData.append('vendor', vendor)
    formData.append('promo_image', promoImg)
    origin.forEach((image) => {
      formData.append('origin_images', image)
    })

    await axios({
      method: 'post',
      url: `${baseURL}/sticker/create`,
      data: formData,
    }).then(() => {
      load()
    })
  }

  const handleShowPromo = (e) => {
    const file = e.target.files[0]
    setPromoImg(file)
    const reader = new FileReader()

    reader.onload = () => {
      setPromoToShow(reader.result)
    }
    reader.onerror = (error) => {
      console.error('Error reading file:', error)
    }

    reader.readAsDataURL(file)
  }

  const handleShowOrigin = (e) => {
    const files = Array.from(e.target.files)
    const imagesArray = []
    let loadedImages = 0

    files.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = () => {
        imagesArray[index] = reader.result
        loadedImages++

        if (loadedImages === files.length) {
          setOriginToShow(imagesArray)
          setOrigin(files)
        }
      }
      reader.onerror = (error) => {
        console.error('Error reading file:', error)
      }

      reader.readAsDataURL(file)
    })
  }

  const load = () => {
    axios
      .post(`${baseURL}/api/sticker`, {
        vendor,
      })
      .then((response) => {
        if (response.status === 200) {
          setLoadZip(true)
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error)
      })
  }

  return (
    <>
      <div className="container d-flex justify-content-evenly mt-5 flex-wrap">
        <div>
          <form className="form-group">
            <label htmlFor="">Vendor</label>
            <input
              className="form-control"
              required
              type="text"
              onChange={(e) => setVendor(e.target.value)}
            />

            <label htmlFor="">Выберите Tag </label>
            <input
              className="form-control"
              type="file"
              onChange={(e) => handleShowPromo(e)}
            />

            <label htmlFor="">Выберите Origin</label>
            <input
              className="form-control"
              type="file"
              multiple
              onChange={(e) => handleShowOrigin(e)}
            />
            <button
              onClick={(e) => handleLoad(e)}
              className="btn btn-warning large mt-3"
            >
              Преобразовать
            </button>
            {loadZip && (
              <p
                className="btn btn-success ms-3"
                style={{ marginTop: '32px' }}
                onClick={() => DownloadImages(vendor)}
              >
                Загрузить
              </p>
            )}
          </form>
        </div>
        <div>
          <PromoCard promoToShow={promoToShow} />
        </div>
      </div>
      <div className="container d-flex mt-5 flex-wrap">
        {originToShow &&
          originToShow?.map((image, i) => (
            <div key={i}>
              <OriginCard originToShow={image} promoToShow={promoToShow} />
            </div>
          ))}
      </div>
    </>
  )
}
