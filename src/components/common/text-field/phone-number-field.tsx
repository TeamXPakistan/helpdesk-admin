import { Typography, styled } from '@mui/material'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type PropTypes = {
  label?: string | null
  errorMsg?: string | null
  value: string | null
  placeholder?: string | null
  onChange: (value: any) => any,
  disabled?: boolean
}

const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
  borderRadius: 10,
  padding: '10px 13px',
  fontSize: theme.typography.body1.fontSize,
  input: {
    color: `${theme.palette.text.primary} !important`,
    border: 0,
    background: 'white'
  },
  'input:focus': { outline: 'none' }
}))

const PhoneNumberField = ({ label, errorMsg, value, placeholder, onChange, disabled = false, ...rest }: PropTypes) => {
  return (
    <>
      {label && (
        <Typography variant='body2' sx={{ mb: -1 }}>
          {label}
        </Typography>
      )}
      <StyledPhoneInput defaultCountry='AE' disabled={disabled} international value={value} placeholder={placeholder} onChange={onChange} {...rest} />
      {errorMsg && (
        <Typography variant='body2' sx={{ mt: -4, mb: 3, color: 'red' }}>
          {errorMsg as string}
        </Typography>
      )}
    </>
  )
}

export default PhoneNumberField
