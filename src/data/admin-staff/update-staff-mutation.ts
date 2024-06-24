import { UpdateAdminStaffInput } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import adminStaff from "@repositories/admin-staff";

export const useUpdateStaffMutation = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation(
        (staffInput: UpdateAdminStaffInput) => {
            const newInput = JSON.parse(JSON.stringify(staffInput));
            delete newInput?.id;

            return adminStaff.updateStaff(`${API_ENDPOINTS.UPDATE_ADMIN_STAFF}/${staffInput?.id}`, newInput)
        },

        {
            onSuccess: () => {
                toast.success(t("Staff updated successfully"), { duration: 4000 });
                router.back();
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
