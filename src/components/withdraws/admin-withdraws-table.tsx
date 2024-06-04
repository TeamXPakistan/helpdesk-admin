import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, MerchantWithdraw } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';
import { MerchantWithDrawalStatus } from '@utils/constants';

type PropTypes = {
    data: MerchantWithdraw[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const AdminWithdrawsTable = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();

    const defaultColumns2: GridColDef[] = [
        {
            flex: 0.1,
            field: 'amount',
            headerName: 'Amount',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.amount}</Typography>
        },
        {
            flex: 0.1,
            field: 'status',
            headerName: 'status',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.status}</Typography>
        },
        {
            flex: 0.1,
            field: 'notes',
            headerName: 'notes',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.requestSpecialNote ?? '-'}</Typography>
        },
        {
            flex: 0.1,
            field: 'bank name',
            headerName: 'bank name',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.bankDetails?.bankName}</Typography>
        },
        {
            flex: 0.1,
            field: 'account number',
            headerName: 'account number',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.bankDetails?.accountNumber}</Typography>
        },
        {
            flex: 0.1,
            field: 'role',
            headerName: 'Role',
            sortable: false,
            headerAlign: "center",
            align: "center",
            //@ts-ignore
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.user?.role}</Typography>
        },
        {
            flex: 0.1,
            field: 'action',
            headerName: 'Action',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: MerchantWithdraw }) => {
                return (
                    <>
                        <Box>
                            <IconButton
                                title='View'
                                color='inherit'
                                aria-haspopup='true'
                                onClick={() => openModal({ view: "PROCESS_WITHDRAW_REQUEST", data: row })}
                            >
                                <Icon
                                    color='green'
                                    fontSize='1.225rem'
                                    icon={row?.status == MerchantWithDrawalStatus.PENDING ? 'clarity:edit-line' : 'ph:eye'} />
                            </IconButton>
                        </Box >

                    </>
                )
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

export default AdminWithdrawsTable;