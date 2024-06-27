import faqEntries from "@repositories/faq-entries"
import { useQuery } from "@tanstack/react-query"
import { FaqEntries, Helpers } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchFaqEntry = async (id: string) => {
    const url = `${API_ENDPOINTS.FAQ_ENTRY_VIEW}/${id}`
    const { data } = await faqEntries.getAllFaqEntry(url)
    return data?.data
}

const useFaqEntryQuery = (id: string) => {
    return useQuery<FaqEntries, Error>(
        [API_ENDPOINTS.FAQ_ENTRY_VIEW, id], () => fetchFaqEntry(id),
    )
}

export { fetchFaqEntry, useFaqEntryQuery }
