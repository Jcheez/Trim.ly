import { useEffect, useState } from 'react'

const useFetchData = <T>(asyncFunction: Promise<T>) => {

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await asyncFunction;
      setData(response)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return {
    data,
    loading
  }
}

export default useFetchData
