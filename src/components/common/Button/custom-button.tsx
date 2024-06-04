import { Button, CircularProgress, styled } from '@mui/material'

type ButtonProps = {
  sx?: Object
  variant?: 'contained' | 'outlined' | 'text' | 'tonal'
  // active?: boolean
  loading?: boolean
  disabled?: boolean
  children: any
  fullWidth?: boolean
  onClick?: () => void
  type: "button" | "submit"
}


const ButtonStyled = styled(Button)(({ theme }) => ({
  ":disabled": {
    background: theme.palette.primary.light,
    color: theme.palette.customColors.bodyBg
  }
}))


const CustomButton = ({
  children,
  // active,
  loading = false,
  disabled = false,
  sx,
  fullWidth = true,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonStyled fullWidth={fullWidth} disabled={disabled} {...rest} sx={sx} onClick={onClick}>
      {!loading && children}
      {loading && <CircularProgress size={18} sx={{ color: 'white' }} />}
    </ButtonStyled>
  )
}

export default CustomButton
