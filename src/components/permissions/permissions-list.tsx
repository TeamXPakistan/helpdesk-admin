import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, Permission } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';
import CustomChip from 'src/@core/components/mui/chip'
import { useDeleteRoleMutation } from '@data/roles/delete-role-mutation';

type PropTypes = {
    data: Permission[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const PermissionsList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();
    const { mutate: deleteRole } = useDeleteRoleMutation()

    const permissionColumns: GridColDef[] = [

        {
            flex: 0.1,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: Permission }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name ?? "-"}</Typography>
        },
        {
            flex: 0.1,
            field: 'moduleName',
            headerName: 'Module Name',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: Permission }) => {
                return (
                    <Box>
                        <Typography>{row?.moduleName}</Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            field: 'permissions',
            headerName: 'Permissions',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: Permission }) => {
                return (
                    <Box >
                        {row?.actions?.map(permission => <CustomChip label={permission} color="secondary" sx={{ m: 1 }} />)}
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
            renderCell: ({ row }: { row: Permission }) => {
                return (<>
                    <Box>
                        <IconButton
                            title='Delete'
                            color='inherit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "GENERAL_DELETE_VIEW", data: { handelDelete: () => deleteRole({ roleId: row?.id }) } })}
                        >
                            <Icon color='red' fontSize='1.225rem' icon={'octicon:trash-24'} />
                        </IconButton>

                        <IconButton
                            color='inherit'
                            title='Edit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "EDIT_ROLE_VIEW", data: { roleId: row?.id } })}
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
            columns={permissionColumns}
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

export default PermissionsList;