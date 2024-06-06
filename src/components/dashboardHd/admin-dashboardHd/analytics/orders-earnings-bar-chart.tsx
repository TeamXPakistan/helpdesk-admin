import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { AdminAnalytics } from '@ts-types/generated'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { Grid, MenuItem } from '@mui/material'
import { useState } from 'react'
import { AdminDashboardAnalyticsFilterBy } from '@utils/constants'

type ApexChartSeries = NonNullable<ApexOptions['series']>
type ApexChartSeriesData = Exclude<ApexChartSeries[0], number>

type TabCategory = 'orders' | 'sales' | 'profit' | 'income'

type TabType = {
    type: TabCategory
    avatarIcon: string
    series: ApexChartSeries
}

type PropType = {
    analytics: AdminAnalytics,
}


const EarningsBarChart = ({ analytics }: PropType) => {

    // console.log("analytics analytics", analytics)
    const [filter, setFilter] = useState<AdminDashboardAnalyticsFilterBy>(AdminDashboardAnalyticsFilterBy.MONTHLY);

    // ** Hook
    const theme = useTheme()

    const monthValues = analytics[0]?.earlyOrdersEarningBarChart?.map((val: any) => val?.subTotal)
    const monthsArray = analytics[0]?.earlyOrdersEarningBarChart?.map((val: any) => val?._id?.month)

    const tabData: TabType[] = [
        {
            type: 'income',
            avatarIcon: 'tabler:chart-pie-2',
            series: [{ data: monthValues }]
        }
    ]

    const colors = [
        "#EF8888",
        "#EF8888",
        "#EF8888",
        "#EF8888",
        "#EF8888",
        "#EF8888",
        "#EF8888",
        "#EF8888",
        "#EF8888",
    ];

    // console.log("monthValues order", monthValues, "fdff", monthsArray)
    const max = 6;
    const seriesIndex = ((tabData[0]?.series[0] as ApexChartSeriesData)?.data as number[]).indexOf(max)
    // const colors = Array(9)?.fill(theme.palette.primary.main);

    const finalColors = colors.map((color, i) => (seriesIndex === i ? hexToRGBA(theme.palette.primary.main, 1) : color))

    const options: ApexOptions = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                distributed: true,
                columnWidth: '15%',
                startingShape: 'rounded',
                dataLabels: { position: 'top' }
            }
        },
        legend: { show: false },
        tooltip: { enabled: false },
        dataLabels: {
            offsetY: -15,
            formatter: val => `${val}`,
            style: {
                fontWeight: 500,
                colors: [theme.palette.text.secondary],
                fontSize: theme.typography.body1.fontSize as string
            }
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
                left: -5,
                right: -8,
                bottom: -12
            }
        },
        xaxis: {
            axisTicks: { show: false },
            axisBorder: {
                color: theme.palette.divider
            },
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
            },
            axisBorder: {
                color: theme.palette.divider,

                show: true,
            },
        },
        responsive: [
            {
                breakpoint: theme.breakpoints.values.sm,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '60%' }
                    },
                    grid: {
                        padding: { right: 20 }
                    }
                }
            }
        ],
        stroke: {
            width: 2
        },
    }
    console.log("colors", colors)

    return (
        <Card>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                <CardHeader
                    title='Earnings Report'
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
                <ReactApexcharts
                    type='line'
                    height={263}
                    options={{ ...options, colors: finalColors }}
                    series={tabData[0]?.series} />
            </CardContent>
        </Card>
    )
}

export default EarningsBarChart
