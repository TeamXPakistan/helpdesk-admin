import Upload from '@repositories/upload';
import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


export const useGeneralUploadMutation = () => {
  const { t } = useTranslation(['form'])

  return useMutation<{ url: string[] }, Error>(
    (input: any) => {
      console.log(input, 'image data')
      return Upload.upload(API_ENDPOINTS.GENERAl_SINGLE_UPLOAD, input);
    },
    {
      onError: (error: any) => {
        console.log("ERROR", error)
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
