import { IColor } from "~~/types/IColor"

export default () => {

  const getAllColors = async() => {
    const data:{colors:IColor[]} = await useFetchApi('/api/colors')
    return data
  }
  return{
    getAllColors,
  }
}