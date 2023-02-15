export const cutSpaces = (string: string) => {
  return string
    .split(' ')
    .filter(el => el !== '')
    .join(' ')
}
