export default (key:string) => {
    const useShowModal = useState<boolean>(key, () => false)

    const openModal = () => {
        const modal = useShowModal
        modal.value = true
    }

    const closeModal = () => {
        const modal = useShowModal
        modal.value = false
    }
    return{
        useShowModal,
        openModal,
        closeModal,
    }
}
