import { IIcon } from "~~/types/IIcon"

export default () => {

  const getAllIcons = async() => {
    const data:{icons:IIcon[]} = await useFetchApi('/api/icons')
    return data
  }
  return{
    getAllIcons,
  }
}