import { useRouter } from "next/router";
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useEffect, useState } from "react";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Card, CardContent } from "@mui/material";
import CustomButton from "@components/common/Button/custom-button";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import DatePicker from "react-datepicker"
import CustomInputs from '@components/common/datepicker-custom-input'
import { useParcelsQuery } from "@data/parcels/parcels-query";
import DriverParcelsList from "./driver-parcels-list";

type PropTypes = {
    dates: { startDate: Date; endDate: Date }
};

const DriverParcels = ({ dates }: PropTypes) => {
    const [page, setPage] = useState<number>(1);
    const [startDate, setStartDate] = useState<Date | null>(dates?.startDate);
    const [endDate, setEndDate] = useState<Date | null>(dates?.endDate);
    const router = useRouter();

    const { data: parcels, isLoading: fetchingparcels, error: parcelsError } = useParcelsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        riderId: router?.query?.id as string,
        startDate: endDate ? startDate : null,
        endDate: endDate ? endDate : null,
    });

    const onPageChange = (event: any, value: number) => {
        setPage(value);
    };

    const onReset = () => {
        setPage(1); setStartDate(dates?.startDate); setEndDate(dates?.endDate)
    };

    useEffect(() => {
        setStartDate(dates?.startDate)
        setEndDate(dates?.endDate)
    }, [dates])


    if (fetchingparcels) return <Spinner />
    if (parcelsError) return <CustomError errorMsg={parcelsError?.message} />
    return (
        <>
            <Card >
                <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', px: 8, pt: 4 }}
                >
                    <Typography variant='h4' sx={{ color: "text.primary" }}>
                        Parcels (Parcels History)
                    </Typography>

                    <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'end' }}>

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


                <CardContent>
                    <Box >
                        {parcels?.parcels?.data?.length as number > 0 ?
                            <DriverParcelsList
                                onPaginationChange={onPageChange}
                                data={parcels?.parcels?.data}
                                paginatorInfo={parcels?.parcels?.paginatorInfo}
                            />
                            :
                            <Typography variant="h5" sx={{ py: 5 }}>No Parcels</Typography>}
                    </Box>
                </CardContent>
            </Card>

        </>
    )
};


export default DriverParcels;