import faqEntries from "@repositories/faq-entries"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { FaqEntries, IPaginator } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam;

const fetchFaqEntries = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        text
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.FAQ_ENTRIES}?limit=${limit}&page=${page}${text && `&search=${text}`}`
    const data = await faqEntries.getAllFaqEntries(url)

    return { faqEntries: { data: data?.data, paginatorInfo: data?.meta } }
}

const useFaqEntriesQuery = (options: QueryParamType) => {
    return useQuery<{ faqEntries: IPaginator<FaqEntries> }, Error>(
        [API_ENDPOINTS.FAQ_ENTRIES, options],
        fetchFaqEntries,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }

    )
}

export { fetchFaqEntries, useFaqEntriesQuery }
