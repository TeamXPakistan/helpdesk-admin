import withdraws from "@repositories/withdraws"
import { useQuery } from "@tanstack/react-query"
import { BankDetails } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchBankDetails = async () => {
    const url = `${API_ENDPOINTS.BANK_DETAILS}`
    const data = await withdraws.getBankDetails(url)
    return { withdraws: data?.data };
}

const useBankDetailsQuery = () => {
    return useQuery<{ withdraws: BankDetails }, Error>(
        [API_ENDPOINTS.BANK_DETAILS],
        fetchBankDetails,
        {
            keepPreviousData: true,
            cacheTime: 10
        }
    )
}

export { useBankDetailsQuery }
