export const getSearchParams = (searchParams: any) => {
  const allParams: any = {}

  searchParams.forEach((value: string, key: string) => {
    allParams[key] = value
  })

  return allParams
}
