import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { toast } from 'react-hot-toast';
import { getLocalForageAuthToken, setLocalForageToken } from '@utils/auth-utils';
import { useVerifyEmailQuery } from '@data/auth/verify-user-email-query';
import BlankLayout from '@layouts/BlankLayout';
import VerifyingEmailSpinner from '@components/auth/verify-email/verify-email-spinner';
import { User } from '@ts-types/generated';
import { useAuthCredentials } from '@store/apps/auth';
import { useTranslation } from 'react-i18next';


function VerifyEmail() {
    const router = useRouter();
    const { setCredentials } = useAuthCredentials()
    const { t } = useTranslation(['common'])
    const { token } = router.query;
    useVerifyEmailQuery(token?.toString(),
        {
            enabled: token ? true : false,
            onSuccess: async (data: User) => {
                const userToken = await getLocalForageAuthToken()
                toast.success(t(`common:verify-email-success-msg`), { duration: 5000 });
                if (userToken) {
                    router.push(ROUTES.DASHBOARD);
                } else {
                    setLocalForageToken(data?.token)
                    setCredentials({ role: data.role, token: data.token, user: data })
                    router.push(ROUTES.DASHBOARD)
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
    );

    return (
        <>
            {token && <VerifyingEmailSpinner />}
        </>
    );
}

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default VerifyEmail;


