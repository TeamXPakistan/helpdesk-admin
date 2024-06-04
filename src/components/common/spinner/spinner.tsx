// ** MUI Imports
import { Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {

  return (<>
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        ...sx
      }}
    >
      <CircularProgress disableShrink />
      <Typography>Loading...</Typography>
    </Box>
  </>)

}

export default Spinner
