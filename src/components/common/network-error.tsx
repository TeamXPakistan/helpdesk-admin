// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { useRouter } from 'next/router'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))


const NetworkError = () => {
  const router = useRouter()

  return (
    <Box className='content-center'
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h2' sx={{ mb: 1.5 }}>
            Network Error
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>There was an error with the internal server.</Typography>
          <Button onClick={() => router.reload()} variant='contained'>
            Retry
          </Button>
        </BoxWrapper>
      </Box>
    </Box>
  )
}

NetworkError.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default NetworkError
