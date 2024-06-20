import users from "@repositories/users"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, User } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

// type QueryParamType = GeneralQueryParam;

const fetchSearchHelper = async (text: string) => {

    console.log(text, "...scm bacl help");

    const url = `${API_ENDPOINTS.USERS}?search=${text}`

    const { data } = await users.getSingleUser(url)
    console.log('hello helpers', data?.data);

    return data?.data
}

const useSearchHelperQuery = (text: string) => {
    return useQuery<any, Error>(
        [API_ENDPOINTS.USERS, text], () => fetchSearchHelper(text)
    )
}
export { fetchSearchHelper, useSearchHelperQuery }

