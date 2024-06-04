import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, Role } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';
import CustomChip from 'src/@core/components/mui/chip'
import { useDeleteRoleMutation } from '@data/roles/delete-role-mutation';

type PropTypes = {
    data: Role[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const RolesList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();
    const { mutate: deleteRole } = useDeleteRoleMutation()

    const defaultColumns2: GridColDef[] = [

        {
            flex: 0.1,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: Role }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name ?? "-"}</Typography>
        },
        {
            flex: 0.1,
            field: 'permissions',
            headerName: 'Permissions',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: Role }) => {
                return (
                    <Box >
                        {row?.permissions?.map(permission => <CustomChip key={permission?._id} label={permission?.name} color="secondary" sx={{ m: 1 }} />)}
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            field: 'title4',
            headerName: 'Action',
            sortable: false,
            headerAlign: "right",
            align: "right",
            renderCell: ({ row }: { row: Role }) => {
                return (<>
                    <Box>
                        <IconButton
                            title='Delete'
                            color='inherit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "GENERAL_DELETE_VIEW", data: { handelDelete: () => deleteRole({ roleId: row?._id }) } })}
                        >
                            <Icon color='red' fontSize='1.225rem' icon={'octicon:trash-24'} />
                        </IconButton>

                        <IconButton
                            color='inherit'
                            title='Edit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "EDIT_ROLE_VIEW", data: { roleId: row?._id } })}
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

export default RolesList;