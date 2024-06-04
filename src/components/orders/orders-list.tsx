import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, Order } from '@ts-types/generated';
import { Avatar, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import { formatPrice } from '@utils/products';
import { useTranslation } from 'react-i18next';

type PropTypes = {
    data: Order[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const OrdersList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const router = useRouter()
    const { t } = useTranslation(["common"]);

    const defaultColumns2: GridColDef[] = [
        {
            width: 100,
            field: 'images',
            headerName: `${t("Image")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Avatar alt={"Image"} src={row.products[0]?.image} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
        },
        {
            width: 160,
            field: 'orderId',
            headerName: `${t("order-id")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Typography sx={{ color: 'text.secondary' }}>{row.orderId}</Typography>
        },
        {
            width: 150,
            field: 'product',
            headerName: `${t("Products")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Typography sx={{ color: 'text.secondary' }}>{row?.products[0]?.productName}</Typography>
        },
        {
            width: 180,
            field: 'orderType',
            headerName: `${t("payment-type")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Typography sx={{ color: 'text.secondary' }}>{row.orderType}</Typography>
        },
        {
            width: 140,
            field: 'date',
            headerName: `${t("Date")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Typography sx={{ color: 'text.secondary' }}>{dayjs(row.createdAt).format('DD-MMMM-YYYY')}</Typography>
        },
        {
            width: 100,
            field: 'time',
            headerName: `${t("Time")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Typography sx={{ color: 'text.secondary' }}>{dayjs(row.createdAt).format('h:mm A')}</Typography>
        },
        {
            width: 100,
            field: 'status',
            headerName: `${t("Status")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Typography sx={{ color: 'text.secondary' }}>{row.status}</Typography>
        },
        {
            width: 100,
            field: 'price',
            headerName: `${t("Price")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => <Typography sx={{ color: 'text.secondary' }}>
                {formatPrice(row?.deliveryCharges + row?.tax + row?.subTotal)}
            </Typography>
        },
        {
            width: 125,
            field: 'title4',
            headerName: `${t("common:Action")}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Order }) => {
                return (<>
                    <Box>
                        <IconButton color='inherit' title='View Order' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/detail-view/${row._id}`)}>
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

export default OrdersList;