import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, Role, User } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';
import { useRouter } from 'next/router'
import { useDeleteStaffMutation } from '@data/admin-staff/delete-staff-mutation';

type PropTypes = {
    data: User[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const StaffList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();
    const router = useRouter()
    const { mutate: deleteStaff } = useDeleteStaffMutation()

    const defaultColumns2: GridColDef[] = [

        {
            width: 200,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: Role }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name ?? "-"}</Typography>
        },
        {
            width: 200,
            field: 'email',
            headerName: 'Email',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.email ?? "-"}</Typography>
        },
        {
            width: 200,
            field: 'contact',
            headerName: 'Phone',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.contact ?? "-"}</Typography>
        },
        {
            width: 200,
            field: 'dynamicRole',
            headerName: 'Role',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.dynamicRole?.name ?? "-"}</Typography>
        },

        {
            width: 200,
            field: 'title4',
            headerName: 'Action',
            sortable: false,
            headerAlign: "right",
            align: "right",
            renderCell: ({ row }: { row: User }) => {
                return (<>
                    <Box>
                        <IconButton
                            title='Delete'
                            color='inherit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "GENERAL_DELETE_VIEW", data: { handelDelete: () => deleteStaff({ staffId: row?._id }) } })}
                        >
                            <Icon color='red' fontSize='1.225rem' icon={'octicon:trash-24'} />
                        </IconButton>

                        <IconButton
                            color='inherit'
                            title='Edit'
                            aria-haspopup='true'
                            onClick={() => router.push(`${router.asPath}/edit/${row._id}`)}
                        >
                            <Icon color='green' fontSize='1.225rem' icon={'nimbus:edit'} />
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

export default StaffList;