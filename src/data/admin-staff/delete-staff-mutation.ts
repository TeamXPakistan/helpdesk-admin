import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import adminStaff from "@repositories/admin-staff";


export const useDeleteStaffMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        ({ staffId }: { staffId: string | undefined }) =>
            adminStaff.deleteStaff(`${API_ENDPOINTS.DELETE_ADMIN_STAFF}/${staffId}`),
        {
            onSuccess: () => {
                toast.success(t("Deleted successfully"), { duration: 4000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.ADMIN_STAFFS]
                });
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message
                        ? Array.isArray(error?.response?.data?.message)
                            ? error?.response?.data?.message[0]
                            : error?.response?.data?.message
                        : t('errors.something-went-wrong')
                )
            }
        }
    );
};
