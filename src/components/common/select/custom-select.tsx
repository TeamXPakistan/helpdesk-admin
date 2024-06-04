import { Typography } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import Select from 'react-select';

type PropTypes = TextFieldProps & {
    list: { label: string; value: string }[] | undefined;
    errorMsg?: string | undefined | null;
    placeHolder?: string
    label?: string | undefined;
    name: string
    onChange: (e: any, { val }: any) => void;
    isMulti: boolean
    value: { label: string; value: string }[] | { label: string; value: string } | [] | undefined | null;
    disable?: boolean
}

const StyledMultiSelect = styled(Select)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(4),
    borderColor: "red !important",
    outline: "none !important",
    boxShadow: "none !important",
    // main container styles 
    "& .css-13cymwt-control": {
        borderRadius: 10,
        borderColor: theme.palette.customColors.light
    },
    //chip style
    "& .css-1p3m7a8-multiValue": {
        borderRadius: 10,
        background: theme.palette.primary.main,
        color: "white",
    },
    //chip text style
    "& .css-wsp0cs-MultiValueGeneric": {
        color: "white",
    },
    //chip delete button style
    "& .css-12a83d4-MultiValueRemove": {
        borderRadius: 10
    },
    "& .custom-select, & .select__control": {
        boxShadow: "none !important"
    },
    "& .custom-select, & .select__control:hover": {
        outline: "none !important",
    },
    "& .custom-select,  & .select__control--is-focused, & .select__control:focus": {
        borderColor: "red !important",
        outline: "none !important",
        borderRadius: 10,
    },
    // select drop down style 
    "& .select__menu": {
        zIndex: 10
    },
    // select drop down list item style 
    "& .select__option:hover": {
        background: theme.palette.primary.light,
    },
}))

const CustomSelect = ({ list, errorMsg, placeHolder, label, name, onChange, isMulti, value, disable, ...rest }: PropTypes) => {
    return (<>
        {label && (
            <Typography variant='body2' sx={{ mb: -1 }}>
                {label}
            </Typography>
        )}
        <StyledMultiSelect
            isClearable
            defaultValue={value}
            name={name}
            isMulti={isMulti}
            classNamePrefix="select"
            placeholder={placeHolder}
            options={list}
            onChange={onChange}
            isDisabled={disable}
            {...rest}
        />
        {errorMsg && (
            <Typography variant='body2' sx={{ mt: -4, mb: 3, color: 'red' }}>
                {errorMsg as string}
            </Typography>
        )}
    </>
    )
}

export default CustomSelect;