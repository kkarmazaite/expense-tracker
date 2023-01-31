export default (url: string, options:any = {}):any => {
  const { authToken } = useAuth()

  return $fetch(url, {
    ...options,
    headers: {
      ...options?.headers, 
      Authorization: `Bearer ${authToken.value}`,
    },
  })
}