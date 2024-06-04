import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, MerchantWithdraw } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useModal } from '@store/apps/modal';

type PropTypes = {
    data: MerchantWithdraw[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const WithdrawsList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {

    const { t } = useTranslation(["common"])
    const { openModal } = useModal();

    const defaultColumns2: GridColDef[] = [
        {
            flex: 0.1,
            field: 'amount',
            headerName: `${t('Amount')}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.amount}</Typography>
        },
        {
            flex: 0.1,
            field: 'status',
            headerName: `${t('Status')}`,
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
            renderCell: ({ row }: { row: MerchantWithdraw }) => <Typography sx={{ color: 'text.secondary' }}>{row?.specialNote ?? '-'}</Typography>
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
            field: 'action',
            headerName: `${t('Action')}`,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: MerchantWithdraw }) => {
                return (<>
                    <Box>
                        <IconButton
                            title={`${t('View')}`}
                            color='inherit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "WITHDRAW_REQUEST", data: row })}
                        >
                            <Icon color='green' fontSize='1.225rem' icon={'ph:eye'} />
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

export default WithdrawsList;