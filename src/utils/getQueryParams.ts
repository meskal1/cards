const numberParams = ['max', 'min', 'page', 'pageCount']

export const getQueryParams = () => {
  const location = window.location.toString()
  const params = new URLSearchParams(location.split('?')[1])
  const allParams = {} as any

  params.forEach((value, key) => {
    allParams[key] = numberParams.includes(key) ? Number(value) : value
  })

  return allParams
}
