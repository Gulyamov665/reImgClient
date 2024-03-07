import React, { useState } from 'react'
import CreateForm from './CreateForm'
import { useNavigate } from 'react-router-dom'

export const MainFormContext = React.createContext('')

export default function MainForm() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [imgToShow, setImgToShow] = useState([])

  
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const imagesArray = new Array(files.length).fill(null)
    let loadedImages = 0

    files.forEach((file, index) => {
      const reader = new FileReader()

      reader.onload = () => {
        imagesArray[index] = reader.result
        loadedImages++

        if (loadedImages === files.length) {
          setImgToShow(imagesArray)
          setImages(files)
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <div>
      <div>
        <div className="form-group">
          <label>User: </label>
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Enter Your username"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Image: </label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="form-control mb-4"
          onChange={handleImageUpload}
        />
      </div>
      <MainFormContext.Provider
        value={{ imgToShow, images, user, name, description }}
      >
        <CreateForm />
      </MainFormContext.Provider>
    </div>
  )
}
