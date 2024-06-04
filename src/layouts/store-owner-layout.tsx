// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import storeOwnerNavigation from '@navigation/store-owner-navigation'

import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useRouter } from 'next/router'
import { useSettings } from 'src/@core/hooks/useSettings'

interface Props {
  children: ReactNode
  contentHeightFixed?: boolean
}

const StoreOwnerLayout = ({ children, contentHeightFixed }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const router = useRouter()


  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: storeOwnerNavigation(router.query.shop as string)
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
    >
      {children}
    </Layout>
  )
}

export default StoreOwnerLayout
