// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface LabelProp {
    cx: number
    cy: number
    percent: number
    midAngle: number
    innerRadius: number
    outerRadius: number
}

const data = [
    { name: 'HelpsProvided', value: 50, color: '#00d4bd' },
    { name: 'AssistanceRequest', value: 95, color: '#ffe700' },
    { name: 'TotalCallTime', value: 16, color: '#FFA1A1' },
    { name: 'ReportedHelpers', value: 27, color: '#826bf8' },

]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props: LabelProp) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

    const radius = outerRadius * 0.66
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill='#000' textAnchor='middle'
            dominantBaseline='central'
            style={{ fontSize: '12px', fontWeight: '500' }}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

const HelpersPerformance = () => {
    return (
        <Card className='cards-styling-hd'>
            <CardHeader
                title={
                    <Typography sx={{
                        textAlign: 'center'
                    }}
                        variant='h4' className='dashboard-heading-hd'>
                        Helpers Performance
                    </Typography>
                }
            />

            <CardContent>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer>
                        <PieChart height={350} style={{ direction: 'ltr' }}>
                            <Pie data={data} dataKey='value' label={renderCustomizedLabel} labelLine={false}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 5, justifyContent: 'center' }}>
                    <Box
                        sx={{
                            mr: 6,
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': { mr: 1.5, color: '#00d4bd' }
                        }}
                    >
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Helps provided</Typography>
                    </Box>
                    <Box
                        sx={{
                            mr: 6,
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': { mr: 1.5, color: '#ffe700' }
                        }}
                    >
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Assistance Request</Typography>
                    </Box>
                    <Box
                        sx={{
                            mr: 6,
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': { mr: 1.5, color: '#FFA1A1' }
                        }}
                    >
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Total Call Time</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#826bf8' } }}>
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Reported helpers</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default HelpersPerformance
