import { ResetPasswordInput } from './../../ts-types/generated';
import { useMutation } from "@tanstack/react-query";
import Auth from "@repositories/auth"
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const UpdatePasswordMutation = () => {

    return useMutation(
        (updatePasswordInput: ResetPasswordInput) =>
            Auth.upatePassword(API_ENDPOINTS.UPDATE_PASSWORD, updatePasswordInput),
        {
            onSuccess: () => {
                toast.success("Password update successfully", { duration: 4000 });
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message
                        ? Array.isArray(error?.response?.data?.message)
                            ? error?.response?.data?.message[0]
                            : error?.response?.data?.message
                        : 'errors.something-went-wrong'
                )
            }
        }
    );
};
