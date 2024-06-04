import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Driver, IPaginatorInfo } from '@ts-types/generated';
import { Avatar, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { AttandenceStatus } from '@utils/constants';
import { useRouter } from 'next/router';


type PropTypes = {
    data: Driver[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};


const DriversList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const router = useRouter();

    const defaultColumns2: GridColDef[] = [
        {
            width: 125,
            field: 'id',
            headerName: 'profile',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Driver }) => <Avatar alt={"profile"} src={row?.profileImage} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
        },
        {
            width: 200,
            field: 'image',
            headerName: 'name',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Driver }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name}</Typography>
        },
        {
            width: 200,
            field: 'title',
            headerName: 'contact',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Driver }) => <Typography sx={{ color: 'text.secondary' }}>{row?.contact}</Typography>
        },
        {
            width: 150,
            field: 'status',
            headerName: 'Status',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Driver }) => <Typography sx={{ color: 'text.secondary' }}>{row?.status === AttandenceStatus.CHECK_IN ? "online" : "offline"}</Typography>
        },
        {
            width: 200,
            field: 'reasion',
            headerName: 'Reason',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Driver }) => <Typography sx={{ color: 'text.secondary' }}>{row?.reasion ?? "-"}</Typography>
        },
        {
            width: 200,
            field: 'currentRequest',
            headerName: 'Current Request',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Driver }) => <Typography sx={{ color: 'text.secondary' }}>{row?.status === AttandenceStatus.CHECK_IN ? row?.currentRequest : "-"}</Typography>
        },
        {
            width: 150,
            field: 'title4',
            headerName: 'Action',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (<>
                    <Box>
                        <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row?._id}`)}>
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
                        </IconButton>
                    </Box >
                </>)
            }
        }
    ]

    return <>
        <DataGrid
            sx={{
                "& .css-q360zr-MuiDataGrid-columnHeaders": { backgroundColor: "transparent" }, height: "80vh",
                '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
                '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '8px' },
                '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '11px' },
            }}
            disableColumnMenu
            getRowHeight={() => 'auto'}
            rows={data.map((value) => ({ id: value._id, ...value })) ?? []}
            columns={defaultColumns2}
            hideFooterPagination={true}
        />
        <Stack
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
        >
            <Pagination
                color="primary"
                count={paginatorInfo.totalPages}
                page={paginatorInfo.page}
                onChange={onPaginationChange}
            />
        </Stack>
    </>
}

export default DriversList 