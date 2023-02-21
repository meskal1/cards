// Fixes mobile height when the search bar is take some space
// because "height: -webkit-fill-available" has limited support
export const setHeight = function () {
  const currentHeight = window.innerHeight

  document.body.style.height = `${currentHeight}px`
}
window.addEventListener('resize', setHeight)
setHeight()
