import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OriginCard from './OriginCard'
import PromoCard from './PromoCard'
import Form from '../forms/Form'
import { toast } from 'react-toastify'

const baseURL = process.env.REACT_APP_BASE_URL

export default function PromoImg() {
  const [origin, setOrigin] = useState([])
  const [vendor, setVendor] = useState('')
  const [promoToShow, setPromoToShow] = useState(null)
  const [originToShow, setOriginToShow] = useState([])
  const [loadZip, setLoadZip] = useState(false)
  const [loading, setLoading] = useState(false)
  const [promoData, setPromoData] = useState([])
  const [selValue, setSelValue] = useState(null)

  console.log(vendor)

  useEffect(() => {
    axios.get(`${baseURL}/tags`).then((res) => setPromoData(res.data))
  }, [])

  const handleLoad = async (data) => {
    let formData = new FormData()

    formData.append('name', data.vendor)
    origin.forEach((image) => {
      formData.append('uploaded_images', image)
    })

    await axios({
      method: 'post',
      url: `${baseURL}/vendor/create`,
      data: formData,
    })
      .then((response) => {
        load(response.data.name)
      })
      .catch((error) => console.log('Ошибка запроса:', error))
  }

  // const handleShowPromo = (e) => {
  //   const file = e.target.files[0]

  //   if (file instanceof Blob) {
  //     const reader = new FileReader()

  //     reader.onload = () => {
  //       setPromoToShow(reader.result)
  //     }
  //     reader.onerror = (error) => {
  //       console.error('Error reading file:', error)
  //     }

  //     reader.readAsDataURL(file)
  //   } else {
  //     console.error('Переданный объект не является Blob')
  //   }
  // }

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

  const load = async (vendor) => {
    setLoading(true)
    await axios
      .post(`${baseURL}/vendor/sticker`, {
        vendor,
        tag: selValue,
      })
      .then((response) => {
        if (response.status === 200) {
          setLoadZip(true)
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error)
      })
      .finally(() => {
        setLoading(false)
        setVendor(vendor)
        toast.success('Запрос успешно обработан')
      })
  }

  return (
    <>
      <div className="container d-flex justify-content-evenly mt-5 flex-wrap">
        <div>
          <Form
            loading={loading}
            // handleShowPromo={handleShowPromo}
            handleShowOrigin={handleShowOrigin}
            handleLoad={handleLoad}
            loadZip={loadZip}
            vendor={vendor}
            promoData={promoData}
            setSelValue={setSelValue}
          />
        </div>

        <div>
          <PromoCard promoToShow={selValue} />
        </div>
      </div>
      <div className="container d-flex mt-5 flex-wrap">
        {originToShow &&
          originToShow?.map((image, i) => (
            <div key={i}>
              <OriginCard originToShow={image} promoToShow={selValue} />
            </div>
          ))}
      </div>
    </>
  )
}
