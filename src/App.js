import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PromoImg from './components/PromoImg'


function App() {
  // const [detail, setDetail] = useState([])

  // useEffect(() => {
  //   getDetails()
  // }, [])

  // const getDetails = async () => {
  //   const response = await fetch('http://127.0.0.1:8000/api/detail')
  //   const data = await response.json()
  //   setDetail(data)
  // }

  return (
    <div className="App">


      <div>
        <PromoImg />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
