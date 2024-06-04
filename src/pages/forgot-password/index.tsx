import BlankLayout from '@layouts/BlankLayout'
import { ROUTES } from '@utils/routes'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

const SendEmail = dynamic(() => import('@components/auth/forgot-password/send-email'))
const VerifyUser = dynamic(() => import('@components/auth/forgot-password/verify-user'))
const ResetPassword = dynamic(() => import('@components/auth/forgot-password/reset-password'))


const ForgotPassword = () => {
  const [userVerified, setUserVerified] = useState<boolean>(false)
  const router = useRouter();
  const { token } = router.query;

  if (typeof window !== "undefined") { window.history.replaceState(null, '', ROUTES.FORGOT_PASSWORD) }

  if (token && !userVerified) return <VerifyUser token={token as string} setUserVerified={setUserVerified} />

  if (token && userVerified) return <ResetPassword />

  return <SendEmail />

}

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default ForgotPassword
