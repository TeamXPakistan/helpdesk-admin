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
import { fullName } from '@utils/helper-functions';

type PropTypes = {
    data: User[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const StaffList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();
    const router = useRouter()
    const { mutate: deleteStaff } = useDeleteStaffMutation()

    const staffColumn: GridColDef[] = [

        {
            width: 200,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{fullName(row?.firstName, row?.lastName)}</Typography>
        },
        {
            width: 200,
            field: 'email',
            headerName: 'Email',
            sortable: false,
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.email ?? "-"}</Typography>
        },
        {
            width: 200,
            field: 'contact',
            headerName: 'Phone',
            sortable: false,
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.contact ?? "-"}</Typography>
        },
        {
            width: 200,
            field: 'dynamicRole',
            headerName: 'Role',
            sortable: false,
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.role?.name ?? "-"}</Typography>
        },

        {
            width: 200,
            field: 'action',
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
                            onClick={() => openModal({ view: "GENERAL_DELETE_VIEW", data: { handelDelete: () => deleteStaff({ staffId: row?.id }) } })}
                        >
                            <Icon color='red' fontSize='1.225rem' icon={'octicon:trash-24'} />
                        </IconButton>

                        <IconButton
                            color='inherit'
                            title='Edit'
                            aria-haspopup='true'
                            onClick={() => router.push(`${router.asPath}/edit/${row.id}`)}
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
            autoHeight
            disableColumnMenu
            rows={data.map((value) => ({ ...value })) ?? []}
            columns={staffColumn}
            hideFooterPagination={true}
            hideFooter={true}
        />
        <Stack
            spacing={2}
            mt={5}
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
        >
            <Pagination
                color="primary"
                count={paginatorInfo.lastPage}
                page={paginatorInfo.page}
                onChange={onPaginationChange}
            />
        </Stack>
    </>
}

export default StaffList;