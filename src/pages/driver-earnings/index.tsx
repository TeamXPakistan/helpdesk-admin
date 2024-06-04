import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import { AdminStaffPermissions, DRIVER } from '@utils/constants';
import { ReactNode, useState } from 'react'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomButton from '@components/common/Button/custom-button';
import { useEarningsQuery } from '@data/withdraws/earnings-query';
import DriversEarningsTable from '@components/withdraws/drivers-earnings-table';
import DatePicker from "react-datepicker"
import CustomInputs from '@components/common/datepicker-custom-input'
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import { useExcelExportMutation } from '@data/withdraws/export-excel-mutation';
import { downloadFile } from '@utils/download-file';

const DriverEarnings = () => {
    const [page, setPage] = useState<number>(1);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const { data: withdraws, isLoading, error } = useEarningsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        role: DRIVER,
        startDate: endDate ? startDate : null,
        endDate: endDate ? endDate : null,
    });

    const { mutate, isLoading: loading } = useExcelExportMutation()

    const onReset = () => {
        setPage(1); setStartDate(null); setEndDate(null)
    };

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleExport = () => {
        mutate(
            {
                role: DRIVER,
                startDate: endDate ? startDate : null,
                endDate: endDate ? endDate : null,
            },
            {
                onSuccess: (data) => {
                    downloadFile(data?.data, `drivers_earnings.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                }
            }
        )
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error?.message} />

    return (
        <>
            <Box
                sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>Drivers Earnings</Typography>
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
                                    // showTimeSelect
                                    todayButton="today"
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
                                    // showTimeSelect
                                    todayButton="today"
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
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomButton
                        type="button"
                        variant='contained'
                        fullWidth={false}
                        onClick={() => onReset()}
                    >
                        Reset
                    </CustomButton>
                    <CustomButton
                        type="button"
                        variant='contained'
                        fullWidth={false}
                        loading={loading}
                        onClick={() => handleExport()}
                    >
                        Export
                    </CustomButton>
                </Box>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <DriversEarningsTable
                        onPaginationChange={onPageChange}
                        data={withdraws?.earnings?.data}
                        paginatorInfo={withdraws?.earnings?.paginatorInfo} />
                </CardContent>
            </Card>
        </>
    )
}

DriverEarnings.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.EARNINGS]
}
DriverEarnings.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default DriverEarnings
