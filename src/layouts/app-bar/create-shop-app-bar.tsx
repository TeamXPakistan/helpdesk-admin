// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const CreateShopAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme()
  const { settings, saveSettings } = useSettings()
  const { skin } = settings

  return (
    <AppBar
      color='default'
      position='sticky'
      elevation={skin === 'bordered' ? 0 : 3}
      sx={{
        backgroundColor: 'background.paper',
        ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` })
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          p: theme => `${theme.spacing(0, 6)} !important`,
          minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>

          </Box>
          <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageDropdown settings={settings} saveSettings={saveSettings} />
            <ModeToggler settings={settings} saveSettings={saveSettings} />
            <>
              <UserDropdown settings={settings} />
            </>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default CreateShopAppBar;
