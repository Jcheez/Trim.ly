import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'

const useFetchData = (adaptor: Promise<AxiosResponse<any, any>>) => {

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await adaptor;
      setData(response.data)
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
