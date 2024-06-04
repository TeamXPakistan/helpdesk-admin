import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, Shop } from '@ts-types/generated';
import { Avatar, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';
import { ShopApprovalStatus } from '@utils/constants';
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router';
import { downloadPDF } from '@utils/helper-functions';


type PropTypes = {
    data: Shop[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};


const ShopsList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();
    const router = useRouter();


    const onStatusChange = (status: string, shopId: string) => {
        if (status === ShopApprovalStatus.accept) {
            openModal({ view: "ACCEPT_SHOP_VIEW", data: { shopId, status } })
        }
        if (status === ShopApprovalStatus.reject) {
            openModal({ view: "REJECT_SHOP_VIEW", data: { shopId, status } })
        }
    }
    const defaultColumns2: GridColDef[] = [
        {
            width: 125,
            field: 'id',
            headerName: 'Profile',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Shop }) => <Avatar alt={"profile"} src={row?.image} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
        },
        {
            width: 200,
            field: 'image',
            headerName: 'Owner',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Shop }) => <Typography sx={{ color: 'text.secondary' }}>{row.owner.name}</Typography>
        },
        {
            width: 200,
            field: 'title',
            headerName: 'Email',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Shop }) => <Typography sx={{ color: 'text.secondary' }}>{row.owner.email}</Typography>
        },
        {
            width: 150,
            field: 'title1',
            headerName: 'Trade Licence',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Shop }) => {
                return (
                    <a
                        onClick={() => downloadPDF(row.tradeLicence.tradeLicenseUrl, row.name)}
                        style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                        download
                    </a>
                );
            }
        },
        {
            width: 150,
            field: 'title2',
            headerName: 'Shop Type',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Shop }) => <Typography sx={{ color: 'text.secondary' }}>{row.type}</Typography>
        },
        {
            width: 140,
            field: 'title3',
            headerName: 'Status',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Shop }) => {

                return (
                    <CustomTextField1
                        select
                        fullWidth
                        SelectProps={{
                            value: row.status,
                            onChange: e => onStatusChange(e.target.value as string, row._id)
                        }}
                    >
                        <MenuItem value={ShopApprovalStatus.accept}>Accepted</MenuItem>
                        <MenuItem value={ShopApprovalStatus.reject}>Rejected</MenuItem>
                        {row.status === ShopApprovalStatus.pending && <MenuItem value={ShopApprovalStatus.pending}>Pending</MenuItem>}
                    </CustomTextField1>
                )
            }
        },
        {
            width: 100,
            field: 'title4',
            headerName: 'Action',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: Shop }) => {
                return (<>
                    <Box>
                        <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row._id}?userId=${row?.owner?._id}`)}>
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

export default ShopsList 