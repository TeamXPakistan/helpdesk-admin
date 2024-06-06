// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import dayjs from 'dayjs'
import { useNotificationsInfinteQuery } from '@data/notifications/notifications-infinte-query'
import { Notification } from '@ts-types/generated'
import { useReadNotificationMutation } from '@data/notifications/read-notification-mutation'
import { NotificationTypesEnum } from '@utils/constants'
import { useRouter } from 'next/router'
import { useReadAllNotificationsMutation } from '@data/notifications/read-all-notifications-mutation'
import CustomButton from '@components/common/Button/custom-button'

export type NotificationsType = {
  meta: string
  title: string
  subtitle: string
} & (
    | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
    | {
      avatarAlt?: never
      avatarImg?: never
      avatarText: string
      avatarIcon?: never
      avatarColor?: ThemeColor
    }
    | {
      avatarAlt?: never
      avatarImg?: never
      avatarText?: never
      avatarIcon: ReactNode
      avatarColor?: ThemeColor
    }
  )
interface Props {
  settings: Settings
  notifications: NotificationsType[]
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4.25),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0,
    '& .MuiMenuItem-root': {
      margin: 0,
      borderRadius: 0,
      padding: theme.spacing(4, 6),
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}


const NotificationDropdown = (props: Props) => {
  const { settings } = props
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const { mutate: readNotificationMutation } = useReadNotificationMutation()
  // const { data: notificationsData, fetchNextPage, isFetching, hasNextPage } = useNotificationsInfinteQuery({
  //   limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
  // })
  const { mutate: readAll, isLoading: readingAll } = useReadAllNotificationsMutation()

  const { direction } = settings

  // const totalUnread = notificationsData?.pages[0]?.notifications?.paginatorInfo?.totalUnreadNotifications;

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handelReadNotification = (notification: Notification) => {

    // redirecting notifications to specific pages 
    if (notification.notificationType === NotificationTypesEnum.ORDER) {
      router.push(notification?.redirectionURL as string)
    }

    // losing dropdown 
    handleDropdownClose()

    // reading notification 
    readNotificationMutation({
      notificationId: notification._id
    })
  }


  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <Fragment>
      <IconButton sx={{ mr: 3 }} color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          // badgeContent={totalUnread}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 0, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}
        >
          <Icon fontSize='1.625rem' icon='tabler:bell' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant='h5' sx={{ cursor: 'text' }}>
              Notifications
            </Typography>
            {/* <CustomChip skin='light' size='small' color='primary' label={`${totalUnread} unread`} /> */}
          </Box>
        </MenuItem>

        {/* <ScrollWrapper hidden={hidden}>
          {notificationsData?.pages?.map((page) => {
            return page?.notifications?.data?.map((notification, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => handelReadNotification(notification)}
                  sx={{
                    backgroundColor: notification.isRead ? '' : 'grey.300',
                    "&:hover": {
                      backgroundColor: theme => `${theme.palette.grey[300]} !important`
                    }
                  }}
                >
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={notification?.userId?.name} src={notification?.displayImage} />
                    <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{notification.title}</MenuItemTitle>
                      <MenuItemSubtitle variant='body2'>{notification.description}</MenuItemSubtitle>
                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        {dayjs.utc(notification?.createdAt).tz(dayjs.tz.guess()).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              )
            })
          })}
          {isFetching ? <Typography sx={{ my: 2 }} align='center' variant='body2'>Loading...</Typography>
            :
            hasNextPage ? <Typography onClick={() => fetchNextPage()} sx={{ my: 2, cursor: "pointer" }} align='center' variant='body2'>Load more</Typography>
              :
              null
          }
        </ScrollWrapper> */}

        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <CustomButton fullWidth={true} type="button" variant='contained' loading={readingAll} onClick={() => readAll()}>
            Read All Notifications
          </CustomButton>
        </MenuItem>
      </Menu>
    </Fragment >
  )
}

export default NotificationDropdown
