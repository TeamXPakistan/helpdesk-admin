// ** React Imports
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'


const columns: GridColDef[] = [
    {
        flex: 0.1,
        field: 'name',
        minWidth: 220,
        headerName: 'Name',
        renderCell: ({ row }) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {row.name}
                    </Typography>
                </Box>
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 220,
        field: 'email',
        headerName: 'Email Address',
        renderCell: ({ row }) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {row?.email}
                    </Typography>
                </Box>
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 220,
        field: 'subscribedPlan',
        headerName: 'Subscribed Plan',
        renderCell: ({ row }) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {row?.subscribedPlan}
                    </Typography>
                </Box>
            )
        }
    }
]

const RecentCustomerRegistered = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const customerData = [
            { id: 1, name: 'John Doe', email: 'josdhn.doe@example.com', subscribedPlan: 'Basic plan' },
            { id: 2, name: 'Jane Smith', email: 'jadsne.smith@example.com', subscribedPlan: 'Pro Plan' },
            { id: 3, name: 'Alice Johnson', email: 'adslice.johnson@example.com', subscribedPlan: 'Pro Plan' },
            { id: 4, name: 'Bob Brown', email: 'bosb.brown@example.com', subscribedPlan: 'Basic plan' },
            { id: 5, name: 'John Doe', email: 'josdhn.doe@example.com', subscribedPlan: 'Basic plan' },
            { id: 6, name: 'Jane Smith', email: 'jadsne.smith@example.com', subscribedPlan: 'Basic plan' }

        ]
        setData(customerData)

    }, [data])

    return data ? (
        <Card>
            <CardHeader
                title='Recent Customers Registered'
            />
            <DataGrid
                autoHeight
                rows={data}
                rowHeight={62}
                columns={columns}
                pagination={false}
                hideFooterPagination
            />
        </Card>
    ) : null
}

export default RecentCustomerRegistered
