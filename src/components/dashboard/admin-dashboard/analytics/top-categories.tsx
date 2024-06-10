import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'



interface Customer {
    id: number;
    name: string;
    categoryName: string;
}
const styles = {
    '& .MuiDataGrid-row, & .MuiDataGrid-cell': {
        borderBottom: 'none !important',
    },
};
const TopCategories = () => {

    const [data, setData] = useState<Customer[]>([]);

    const columns: GridColDef[] = [
        {
            flex: 0.1,
            field: 'name',
            minWidth: 120,
            headerName: 'Rank',
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

    useEffect(() => {
        const customerData = [
            { id: 1, name: 'John Doe', categoryName: 'Study' },
            { id: 2, name: 'Jane Smith', categoryName: 'Laptops' },
            { id: 3, name: 'Alice Johnson', categoryName: 'Battery' }
        ]
        setData(customerData)

    }, [])

    return data ? (
        <Card className='cards-styling-hd'>
            <CardHeader
                title={
                    <Typography sx={{ textAlign: "left" }}
                        variant='h4' className='dashboard-heading-hd'>
                        Top Categories
                    </Typography>
                }
                sx={{
                    py: 4,
                    flexDirection: ['column', 'row'],
                    '& .MuiCardHeader-action': { m: 0 },
                    alignItems: ['flex-start', 'center']
                }}
            />

            <DataGrid
                autoHeight
                rows={data}
                rowHeight={46}
                columns={columns}
                rowSelection={false}
                sx={styles}
                hideFooterPagination={true}
                hideFooter={true}
            />
        </Card>
    ) : null
}

export default TopCategories
