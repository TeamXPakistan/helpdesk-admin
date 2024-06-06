// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AvatarGroup from '@mui/material/AvatarGroup'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import axios from 'axios'


const columns: GridColDef[] = [
    {
        flex: 0.1,
        field: 'name',
        minWidth: 120,
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
        minWidth: 120,
        field: 'categoryName',
        headerName: 'category Name',
        renderCell: ({ row }) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {row?.categoryName}
                    </Typography>
                </Box>
            )
        }
    }
]

const TopCategories = () => {
    const [data, setData] = useState([])
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        const customerData = [
            { id: 1, name: 'John Doe', categoryName: 'Study' },
            { id: 2, name: 'Jane Smith', categoryName: 'Laptops' },
            { id: 3, name: 'Alice Johnson', categoryName: 'Battery' }
        ]
        setData(customerData)

    }, [data])

    const handleFilter = (val: string) => {
        setValue(val)
    }

    return data ? (
        <Card>
            <CardHeader
                title='Top Categories'
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

export default TopCategories
