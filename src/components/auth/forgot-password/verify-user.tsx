import { useVerifyUserQuery } from '@data/auth/forgot-password-verify-user-query'
import VerifyUserSpinner from './verify-user-spinner'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@utils/routes';

type PropTypes = {
    token: string
    setUserVerified: (val: boolean) => void
}

const VerifyUser = ({ token, setUserVerified }: PropTypes) => {
    const router = useRouter();
    const { t } = useTranslation(['common'])

    useVerifyUserQuery(token?.toString(),
        {
            enabled: token ? true : false,
            onSuccess: (data: { success: boolean }) => {
                toast.success(t(`common:forgot-password-verify-user-success-msg`), { duration: 5000 });
                if (data.success) {
                    setUserVerified(true)
                }
            },
            onError: (error: any) => {
                router.push(ROUTES.LOGIN);
                toast.error(
                    typeof error?.response?.data?.message === 'string'
                        ? error?.response?.data?.message
                        : error?.response?.data?.message?.[0]
                    , { duration: 5000 });
            }
        }
    )
    return (
        <VerifyUserSpinner />
    )
}

export default VerifyUser
