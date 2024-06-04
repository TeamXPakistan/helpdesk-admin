import { UpdateUserInput } from './../../ts-types/generated';
import { useMutation } from "@tanstack/react-query";
import Auth from "@repositories/auth"
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const EditProfileMutation = () => {

    return useMutation(
        (updateUserInput: UpdateUserInput) =>
            Auth.upateProfile(API_ENDPOINTS.UPDATE_PROFILE, updateUserInput),
        {
            onSuccess: () => {
                toast.success("Profile edited successfully", { duration: 4000 });
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
