import axios from 'axios'

export const Excel = async (name_ad) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/export/${name_ad}`,
      { responseType: 'blob' }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${name_ad}.xlsx`)
    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
  } catch (error) {
    console.error(error)
  }
}
