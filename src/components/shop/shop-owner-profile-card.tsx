// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Shop } from '@ts-types/generated'
import { downloadPDF, getRoleName, getShopTypeName } from '@utils/helper-functions'
import { ShopApprovalStatus } from '@utils/constants'
import dayjs from 'dayjs'
import { formatPrice } from '@utils/products'
import Link from 'next/link'

interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const StyledLink = styled('a')(({ }) => ({
  color: "#4d4dff",
}));

type PropType = {
  shopDetails: Shop
}

const ShopOwnerProfileCard = ({ shopDetails }: PropType) => {
  const { owner, name, type, status, address, isOpen, resturantCategory, setting, tradeLicence, bankAccountDetails } = shopDetails;
  console.log(shopDetails);
  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {owner?.profileImage ? (
                <CustomAvatar
                  src={owner?.profileImage}
                  variant='rounded'
                  alt={owner.name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(owner?.name ?? "P")}
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {owner.name ?? ""}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={getRoleName(owner?.role)}
                color={roleColors[data.role]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Verified</Typography>
                    <Typography variant='body2'>{owner.verified ? "Yes" : "No"}</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Wallet</Typography>
                    <Typography variant='body2'>{formatPrice(owner.wallet)}</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            {/* USER DETAILS  */}
            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Vendor Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{owner.name ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{owner.email ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{owner.contact ?? "-"}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{getRoleName(owner.role)}</Typography>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            {/* SHOP DETAILS  */}
            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Shop Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{name ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Shop Type:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{getShopTypeName(type) ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={status}
                    color={status === ShopApprovalStatus.accept ? 'success' : status === ShopApprovalStatus.reject ? "error" : "info"}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Active:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={isOpen ? "OPEN" : "CLOSED"}
                    color={isOpen ? "success" : "info"}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>

                {resturantCategory.length ? <>
                  <Box sx={{ display: 'flex', flexDirection: "column", mb: 3, alignItems: 'start' }}>
                    <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Resturant Categories:</Typography>
                    <Box>
                      {resturantCategory?.map(category => (
                        <CustomChip
                          key={category?._id}
                          skin='light'
                          size='small'
                          label={category.title}
                          color={"error"}
                          sx={{
                            textTransform: 'capitalize',
                            m: 1
                          }}
                        />
                      ))
                      }
                    </Box>
                  </Box>
                </> : null
                }
              </Box>

              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                SHOP ADDRESS
              </Typography>
              <Box sx={{ pt: 4 }}>

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{address.streetAddress ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{setting.contact ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Opening Time:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{dayjs(setting.opensAt).format("h:mm A") ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Closing Time:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{dayjs(setting.closesAt).format("h:mm A") ?? "-"}</Typography>
                </Box>
              </Box>


              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                SHOP ACCOUNT DETAILS
              </Typography>
              <Box sx={{ pt: 4 }}>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Account Holder Name :</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{bankAccountDetails.accountHolderName ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Account Holder Email :</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{bankAccountDetails.accountHolderEmail ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Bank Name :</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{bankAccountDetails.bankName ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Bank Account :</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{bankAccountDetails.accountNumber ?? "-"}</Typography>
                </Box>
              </Box>


              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Shop Tradelicense Details
              </Typography>
              <Box sx={{ pt: 4 }}>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Expiary Date :</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{dayjs(tradeLicence?.tradeLicenseExpireAt).format('DD-MMMM-YYYY') ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Issue Date :</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{dayjs(tradeLicence?.tradeLicenseIssueAt).format('DD-MMMM-YYYY') ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, gap: 3 }}>
                  <StyledLink
                    onClick={() => downloadPDF(tradeLicence.tradeLicenseUrl, name)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Download
                  </StyledLink>
                  <Link href={tradeLicence?.tradeLicenseUrl} target="_blank" style={{ color: "#4d4dff" }}>
                    View
                  </Link>
                </Box>
              </Box>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default ShopOwnerProfileCard
