import { ReactNode, useState } from 'react'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import { AdminStaffPermissions, ParcelStatus } from '@utils/constants';
import CustomError from '@components/common/error/custom-error'
import { useParcelsQuery } from '@data/parcels/parcels-query'
import ParcelsList from '@components/parcels/parcels-list'
import DatePicker from "react-datepicker"
import CustomInputs from '@components/common/datepicker-custom-input'
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

const VendorsPage = () => {
    const [statusValue, setStatusValue] = useState<string>('')
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const { data: parcels, isLoading: fetchingparcels, error: parcelsError } = useParcelsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text: text,
        startDate: endDate ? startDate : null,
        endDate: endDate ? endDate : null,
        status: statusValue as ParcelStatus
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setStatusValue(""); setText(''); setSearchVal(''); setStartDate(null); setEndDate(null)
    };

    if (fetchingparcels) return <Spinner />
    if (parcelsError) return <CustomError errorMsg={parcelsError.message} />
    return <>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>parcels List</Typography>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}
                >
                    <CustomTextField1
                        title='Search by customer(name, contact) and driver(name, contact)'
                        value={searchVal}
                        placeholder='Search by customer(name, contact) and driver(name, contact)'
                        onChange={e => setSearchVal(e.target.value)}
                    />
                </form>
                <CustomTextField1
                    select
                    sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                    SelectProps={{
                        displayEmpty: true,
                        value: statusValue,
                        onChange: e => setStatusValue(e.target.value as string)
                    }}
                >
                    <MenuItem disabled value=''>Status</MenuItem>
                    <MenuItem value={ParcelStatus.PENDING}>Pending</MenuItem>
                    <MenuItem value={ParcelStatus.DELIVERED}>Delivered</MenuItem>
                    <MenuItem value={ParcelStatus.IN_TRANSIT}>In Transit</MenuItem>
                    <MenuItem value={ParcelStatus.CANCELLED}>Canceled</MenuItem>
                </CustomTextField1>

                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}
                >
                    Reset
                </CustomButton>

            </Box>
        </Box>

        <Box sx={{ gap: 4, display: 'flex', flexDirection: "row", justifyContent: "end", mb: 8 }}>
            {/* Date Range Filter  */}
            <DatePickerWrapper>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                    <div>
                        <DatePicker
                            selected={startDate}
                            dateFormat="MMMM d, yyyy"
                            showYearDropdown
                            showMonthDropdown
                            name='tradeLicence.tradeLicenseIssueAt'
                            id='basic-input'
                            onChange={(date: Date) => setStartDate(() => {
                                const dateVal = new Date(date)
                                dateVal.setHours(1)
                                dateVal.setMinutes(0)
                                return dateVal;
                            })}
                            placeholderText='Click to select a date'
                            customInput={<CustomInputs label='Start Date' />}
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={endDate}
                            dateFormat="MMMM d, yyyy"
                            disabled={startDate ? false : true}
                            showYearDropdown
                            showMonthDropdown
                            id='disabled-input'
                            minDate={startDate}
                            name='tradeLicence.tradeLicenseExpireAt'
                            onChange={(date: Date) => setEndDate(() => {
                                const dateVal = new Date(date)
                                dateVal.setHours(23)
                                dateVal.setMinutes(59)
                                return dateVal;
                            })}
                            placeholderText='Click to select a date'
                            customInput={<CustomInputs label='End Date' />}
                        />
                    </div>
                </Box>
            </DatePickerWrapper>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <ParcelsList
                    onPaginationChange={onPageChange}
                    data={parcels?.parcels?.data}
                    paginatorInfo={parcels?.parcels?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

VendorsPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.PARCELS]
}
VendorsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default VendorsPage
