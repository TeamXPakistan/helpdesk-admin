import Link from 'next/link'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { LayoutProps } from 'src/@core/layouts/types'
import Image from 'next/image'

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))


const LinkStyled = styled(Link)({
  display: 'flex',
  justifyContent: "center",
  textDecoration: 'none',
  marginTop: 5
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    navHover,
    settings,
    collapsedNavWidth,
    navigationBorderWidth,
    // menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    // menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const { navCollapsed } = settings

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8
      }
    } else {
      return 6
    }
  }

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/'>
          <Image src={'/images/icons/logo.svg'} alt={'Logo'} width={140} height={100} />
        </LinkStyled>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
