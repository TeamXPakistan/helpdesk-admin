import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Grid, MenuItem, Typography } from '@mui/material'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { AdminDashboardAnalyticsFilterBy } from '@utils/constants'

type ApexChartSeries = NonNullable<ApexOptions['series']>
type ApexChartSeriesData = Exclude<ApexChartSeries[0], number>

type TabCategory = 'orders' | 'sales' | 'profit' | 'income'

type TabType = {
    type: TabCategory
    avatarIcon: string
    series: ApexChartSeries
}


const ParcelsEarningsBarChart = ({ analytics }: any) => {
    const theme = useTheme()
    const monthValues = analytics[0]?.earlyParcelsEarningBarChart?.map((val: any) => val?.subTotal)
    const monthsArray = analytics[0]?.earlyParcelsEarningBarChart?.map((val: any) => val?._id?.month)

    const tabData: TabType[] = [
        {
            type: 'income',
            avatarIcon: 'tabler:chart-pie-2',
            series: [{ data: monthValues }]
        }
    ]

    const colors = [
        "#80E4DE",
        "#80E4DE",
        "#80E4DE",
        "#80E4DE",
        "#80E4DE",
        "#80E4DE",
        "#80E4DE",
        "#80E4DE",
        "#80E4DE",
    ];
    const max = 3;
    const seriesIndex = ((tabData[0]?.series[0] as ApexChartSeriesData)?.data as number[]).indexOf(max)
    // const colors = Array(9)?.fill(theme.palette.secondary.main);
    const finalColors =
        colors.map((color, i) => (seriesIndex === i ? hexToRGBA(theme.palette.primary.main, 1) : color))


    const options: ApexOptions = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                distributed: true,
                columnWidth: '24px',
                startingShape: 'rounded',
                dataLabels: { position: 'top' }
            }
        },
        legend: { show: false },
        tooltip: { enabled: false },
        dataLabels: {
            // offsetY: -15,
            // formatter: val => ``,
            // style: {
            //     fontWeight: 500,
            //     colors: [theme.palette.text.secondary],
            //     fontSize: theme.typography.body1.fontSize as string
            // }
        },
        colors,
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        grid: {
            show: false,
            padding: {
                top: 20,
                left: -2,
                right: -2,
                bottom: -12
            }
        },
        xaxis: {
            axisTicks: { show: false },
            axisBorder: { color: theme.palette.divider },
            categories: monthsArray,
            labels: {
                style: {
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize as string
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -15,
                formatter: val => `${val}`,
                style: {
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize as string
                }
            }, axisBorder: {
                color: theme.palette.divider,

                show: true,
            },
        },
        responsive: [
            {
                breakpoint: theme.breakpoints.values.sm,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '20px' }
                    },
                    grid: {
                        padding: { right: 20 }
                    }
                }
            }
        ]
    }
    return (
        <Card className='cards-styling-rim'>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <CardHeader
                    title={
                        <Typography sx={{ textAlign: 'left' }}
                            variant='h4' className='dashboard-heading-rim'>
                            Profit Report
                        </Typography>
                    }
                />

                <CustomTextField1
                    select
                    sx={{ pr: 5, pt: 5, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                    SelectProps={{
                        displayEmpty: true,
                        value: "",
                    }}
                >
                    <MenuItem disabled value=''>Filter By</MenuItem>
                    <MenuItem value={AdminDashboardAnalyticsFilterBy.TODAY}>Today</MenuItem>
                    <MenuItem value={AdminDashboardAnalyticsFilterBy.WEEKLY}>Weekly</MenuItem>
                    <MenuItem value={AdminDashboardAnalyticsFilterBy.MONTHLY}>Monthly</MenuItem>
                    <MenuItem value={AdminDashboardAnalyticsFilterBy.YEARLY}>Yearly</MenuItem>
                </CustomTextField1>

            </Grid>

            <CardContent>
                <ReactApexcharts type='bar'
                    height={263}
                    options={{ ...options, colors: finalColors }}
                    series={tabData[0]?.series}
                />
            </CardContent>
        </Card >


    )
}

export default ParcelsEarningsBarChart
