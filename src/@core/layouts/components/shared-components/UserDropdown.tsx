// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { useAuthCredentials } from '@store/apps/auth'
import { getRoleName } from '@utils/helper-functions'
import { removeLocalForageAuthToken } from '@utils/auth-utils'
import { ROUTES } from '@utils/routes'
import { useLogoutUserMutation } from '@data/auth/logout-user-mutation'
import CircularProgress from '@mui/material/CircularProgress'
import { useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'react-i18next'


interface Props {
  settings: Settings
}
const styles = {
  px: 4,
  py: 1.75,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: 'text.primary',
  textDecoration: 'none',
  '& svg': {
    mr: 2.5,
    fontSize: '1.5rem',
    color: 'text.secondary'
  }
}
const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const UserDropdown = (props: Props) => {
  const { settings } = props
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const router = useRouter()
  const { authValues, removeCredentials } = useAuthCredentials()
  const { mutate: logOut, isLoading } = useLogoutUserMutation()
  const queryClient = useQueryClient()
  const { t } = useTranslation(["common"]);
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    removeLocalForageAuthToken()
    removeCredentials()
    router.replace(ROUTES.LOGIN)
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        // badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={authValues.user?.name}
          src={authValues?.user?.profileImage}
          onClick={handleDropdownOpen}
          sx={{ width: 38, height: 38, borderRadius: "20%" }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='rectangular'
              // badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt={authValues.user?.name} src={authValues?.user?.profileImage} sx={{ width: '2.5rem', height: '2.5rem', borderRadius: "20%" }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 500 }}>{authValues.user?.name}</Typography>
              <Typography variant='body2'>{getRoleName(authValues?.role)}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose(ROUTES.PROFILE)}>
          <Box sx={styles}>
            <Icon icon='tabler:user-check' />
            {t("common:my-profile")}
          </Box>
        </MenuItemStyled>
        {/* <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/account-settings/account')}>
          <Box sx={styles}>
            <Icon icon='tabler:settings' />
            Settings
          </Box>
        </MenuItemStyled> */}
        {/* <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/account-settings/billing')}>
          <Box sx={styles}>
            <Icon icon='tabler:credit-card' />
            Billing
          </Box>
        </MenuItemStyled> */}
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        {/* <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/help-center')}>
          <Box sx={styles}>
            <Icon icon='tabler:lifebuoy' />
            Help
          </Box>
        </MenuItemStyled> */}
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/faq')}>
          <Box sx={styles}>
            <Icon icon='tabler:info-circle' />
            {t("common:FAQ")}
          </Box>
        </MenuItemStyled>
        {/* <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/pricing')}>
          <Box sx={styles}>
            <Icon icon='tabler:currency-dollar' />
            Pricing
          </Box>
        </MenuItemStyled> */}
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0, display: "flex", justifyContent: "center" }} onClick={handleLogout}>
          {isLoading ?
            <CircularProgress size={30} /> :
            <Box sx={styles}>
              <Icon icon='tabler:logout' />
              {t("common:sign-out")}
            </Box>
          }
        </MenuItemStyled>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
