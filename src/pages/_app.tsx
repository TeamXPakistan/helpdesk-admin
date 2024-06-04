// ** React Imports
import { ReactNode, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
// import AuthGuard from 'src/@core/components/auth/AuthGuard'
import AuthGuard from '@components/auth/auth-guard/auth-guard'

// ** Spinner Import

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import SetAuth from '@components/auth/auth-guard/set-auth'
import { useNetworkError } from '@store/apps/networkError'
import NetworkError from '@components/common/network-error'
import { useCheckNetworkQuery } from '@data/network/check-network-query'
import FallbackSpinner from '@components/common/spinner/fall-back-spinner'
import ManagedModal from '@components/common/modal/managed-modal'
import { check_notification_permission_toast, notification_function } from '@utils/firebase/notification'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { API_ENDPOINTS } from '@utils/api/endpoints'


// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const NetworkWrapper = ({ children }: { children: ReactNode }) => {
  const { networkError } = useNetworkError()
  const { isLoading } = useCheckNetworkQuery()
  if (isLoading) return <FallbackSpinner />
  if (networkError) return <NetworkError />
  return <>{children}</>
}

const NotificationWrapper = ({ children }: { children: ReactNode }) => {
  const queryClientForNotifiactions = useQueryClient();

  const refetchCount = () => {
    queryClientForNotifiactions.invalidateQueries({
      queryKey: [API_ENDPOINTS.NOTIFICATIONS]
    });
  };

  useEffect(() => {
    check_notification_permission_toast()
    notification_function(refetchCount);
  }, []);

  return <>{children}</>
}

const queryClient = new QueryClient()

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout = Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authProps = (Component as any).authProps

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Helpdesk Admin</title>
            <meta
              name='description'
              content={`Helpdesk Admin`}
            />
            <meta name='keywords' content='Helpdesk Admin' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>

          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <NotificationWrapper>
                      {/* <NetworkWrapper> */}
                      {authProps ? (
                        <SetAuth>
                          <AuthGuard authProps={authProps}>{getLayout(<Component {...pageProps} />)}</AuthGuard>
                        </SetAuth>
                      ) : (
                        getLayout(<Component {...pageProps} />)
                      )}
                      <ToastContainer />
                      <ReactHotToast>
                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                      </ReactHotToast>
                      <ManagedModal />
                      {/* </NetworkWrapper> */}
                    </NotificationWrapper>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
