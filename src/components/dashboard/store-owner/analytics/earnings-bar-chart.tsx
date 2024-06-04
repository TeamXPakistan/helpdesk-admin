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
import { VendorAnalytics } from '@ts-types/generated'
import { useTranslation } from 'react-i18next'

type ApexChartSeries = NonNullable<ApexOptions['series']>
type ApexChartSeriesData = Exclude<ApexChartSeries[0], number>

type TabCategory = 'orders' | 'sales' | 'profit' | 'income'

type TabType = {
    type: TabCategory
    avatarIcon: string
    series: ApexChartSeries
}

type PropType = {
    analytics: VendorAnalytics,
}


const EarningsBarChart = ({ analytics }: PropType) => {
    // ** Hook
    const theme = useTheme()
    const { t } = useTranslation(["common"])

    const monthValues = analytics?.earlyEarningBarChart.map((val) => val?.subTotal)
    const monthsArray = analytics?.earlyEarningBarChart.map((val) => val?._id?.month)

    const tabData: TabType[] = [
        {
            type: 'income',
            avatarIcon: 'tabler:chart-pie-2',
            series: [{ data: monthValues }]
        }
    ]

    const max = Math.max(...((tabData[0]?.series[0] as ApexChartSeriesData)?.data as number[]))
    const seriesIndex = ((tabData[0]?.series[0] as ApexChartSeriesData)?.data as number[]).indexOf(max)
    const colors = Array(9).fill(theme.palette.primary.main)

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
                columnWidth: '35%',
                startingShape: 'rounded',
                dataLabels: { position: 'top' }
            }
        },
        legend: { show: false },
        tooltip: { enabled: false },
        dataLabels: {
            offsetY: -15,
            formatter: val => `${val}k`,
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
                formatter: val => `$${val}k`,
                style: {
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize as string
                }
            }
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
        ]
    }

    return (
        <Card>
            <CardHeader
                title={t('common:earning-report')}
                subheader={t('yearly-earning-overview')}
            />
            <CardContent>
                <ReactApexcharts type='bar' height={263} options={{ ...options, colors: finalColors }} series={tabData[0]?.series} />
            </CardContent>
        </Card>
    )
}

export default EarningsBarChart
