export const getSearchParams = (searchParams: URLSearchParams) => {
  const allParams = {} as { [key: string]: string }

  searchParams.forEach((value: string, key: string) => {
    allParams[key] = value
  })

  return allParams
}
