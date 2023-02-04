import { ChangeEvent, DragEvent } from 'react'

export const base64Converter = async (e: any) => {
  const files = e.target.files || e.dataTransfer.files

  if (files && files.length && files[0].size < 100000 && files[0].type.includes('image')) {
    const reader = new FileReader()

    reader.readAsDataURL(files[0])
    const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

    return data
  }
}
