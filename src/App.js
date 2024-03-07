import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainForm from './components/MainForm'
import { Route, Routes } from 'react-router-dom'
import ImageComponent from './components/ImageComponent'
import PromoImg from './components/PromoImg'

function App() {
  const [detail, setDetail] = useState([])

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/detail')
    const data = await response.json()
    setDetail(data)
  }

  return (
    <div className="App">
      {/* <div>
        <MainForm />
      </div> */}

      <div>
        <PromoImg />
      </div>
    </div>
  )
}

export default App
