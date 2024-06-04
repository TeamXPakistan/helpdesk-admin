import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, Order, Parcel } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

type PropTypes = {
    data: Parcel[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo;
};

const ParcelsList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const router = useRouter();

    const defaultColumns2: GridColDef[] = [
        {
            width: 180,
            field: 'customer',
            headerName: 'Customer',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Parcel }) => <Typography sx={{ color: 'text.secondary' }}>{row?.senderId?.name ?? "-"}</Typography>
        },
        {
            width: 180,
            field: 'driver',
            headerName: 'Driver',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Parcel }) => <Typography sx={{ color: 'text.secondary' }}>{row?.driver?.name ?? "-"}</Typography>
        },
        {
            width: 180,
            field: 'contact',
            headerName: 'Driver contact',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Parcel }) => <Typography sx={{ color: 'text.secondary' }}>{row?.driver?.contact ?? "-"}</Typography>
        },
        {
            width: 180,
            field: 'trackingNo',
            headerName: 'Tracking number',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Parcel }) => <Typography sx={{ color: 'text.secondary' }}>{row?.trackingNumber ?? "-"}</Typography>
        },
        {
            width: 140,
            field: 'status',
            headerName: 'status',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Parcel }) => <Typography sx={{ color: 'text.secondary' }}>{row?.status ?? "-"}</Typography>
        },
        {
            width: 100,
            field: 'fare',
            headerName: 'fare',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Parcel }) => <Typography sx={{ color: 'text.secondary' }}>{row?.fare ?? "-"}</Typography>
        },
        {
            width: 125,
            field: 'title4',
            headerName: 'Action',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => {
                return (<>
                    <Box>
                        <IconButton color='inherit' title='View Order' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row._id}`)}>
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
                        </IconButton>
                    </Box >
                </>)
            }
        }
    ]

    return <>
        <DataGrid
            sx={{ "& .css-q360zr-MuiDataGrid-columnHeaders": { backgroundColor: "transparent" }, height: "80vh" }}
            disableColumnMenu
            rowHeight={54}
            rows={data?.map((value) => ({ id: value._id, ...value })) ?? []}
            columns={defaultColumns2}
            hideFooterPagination={true}
        />
        <Stack
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
        >
            <Pagination
                color="primary"
                count={paginatorInfo?.totalPages}
                page={paginatorInfo?.page}
                onChange={onPaginationChange}
            />
        </Stack>
    </>
}

export default ParcelsList;