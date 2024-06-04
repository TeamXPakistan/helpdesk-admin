import Network from '@repositories/network'
import { useNetworkError } from '@store/apps/networkError'
import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const checkNetwork = async () => {
    const { data } = await Network.find(API_ENDPOINTS.CHECK_NETWORK)
    return data
}



export const useCheckNetworkQuery = () => {
    const { networkError, setNetworkError } = useNetworkError()
    console.log(networkError)
    return useQuery<{ success: boolean }, Error>([API_ENDPOINTS.CHECK_NETWORK], () => checkNetwork(), {
        cacheTime: 0,
        staleTime: 0,
        // refetchOnWindowFocus: !networkError ? true : false,
        refetchInterval: networkError ? 10000 : false,
        onSuccess(data) {
            if (data.success == true) {
                setNetworkError(false)
                return false
            }
            setNetworkError(true)
        }
    })
}
