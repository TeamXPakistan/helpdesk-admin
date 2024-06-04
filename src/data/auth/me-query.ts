import Auth from '@repositories/auth'
import { useAuthCredentials } from '@store/apps/auth'
import { useQuery } from '@tanstack/react-query'
import { User } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchMe = async () => {
  const { data } = await Auth.find(API_ENDPOINTS.ME)
  return data
}

export const useMeQuery = (options: any) => {
  options.retry = false;
  options.refetchOnWindowFocus = false;
  options.cacheTime = 0;
  options.staleTime = 0;
  return useQuery<User, Error>([API_ENDPOINTS.ME], () => fetchMe(), options)
}
