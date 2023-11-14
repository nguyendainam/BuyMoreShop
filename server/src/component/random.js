const randomInterger = () => {
  const min = Math.pow(10, 8)
  const max = Math.pow(10, 9) - 1
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export default {
  randomInterger
}
