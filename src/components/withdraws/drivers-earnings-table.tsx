import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DriversEarnings, IPaginatorInfo } from '@ts-types/generated';
import { formatPrice } from '@utils/products';

type PropTypes = {
    data: DriversEarnings[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const DriversEarningsTable = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {

    const defaultColumns2: GridColDef[] = [
        {
            flex: 0.1,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name}</Typography>
        },
        {
            flex: 0.1,
            field: 'email',
            headerName: 'Email',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{row?.email}</Typography>
        },
        {
            flex: 0.1,
            field: 'role',
            headerName: 'Role',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{row?.role}</Typography>
        },
        {
            flex: 0.1,
            field: 'totalOrdersEarning',
            headerName: 'Total Orders Earnings',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{formatPrice(row?.totalOrdersEarning)}</Typography>
        },
        {
            flex: 0.1,
            field: 'totalOrders',
            headerName: 'Total Orders',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{row?.totalOrders}</Typography>
        },
        {
            flex: 0.1,
            field: 'totalParcels',
            headerName: 'Total Parcels',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{row?.totalParcels}</Typography>
        },
        {
            flex: 0.1,
            field: 'totalParcelEarning',
            headerName: 'Total Parcel Earnings',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{formatPrice(row?.totalParcelEarning)}</Typography>
        },
        {
            flex: 0.1,
            field: 'total',
            headerName: 'Total',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: DriversEarnings }) => <Typography sx={{ color: 'text.secondary' }}>{formatPrice(row?.total)}</Typography>
        },
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

export default DriversEarningsTable;
