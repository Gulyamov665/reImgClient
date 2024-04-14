import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_URL
export const DownloadImages = async (name_adress) => {
  try {
    const response = await axios.get(
      `${baseURL}/vendor/${name_adress}`,
      { responseType: 'blob' }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${name_adress}.zip`)
    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
  } catch (error) {
    console.error(error)
  }
}
