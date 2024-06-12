import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, User } from '@ts-types/generated';
import { Avatar, Grid, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { fullName } from '@utils/helper-functions';
import CustomButton from '@components/common/Button/custom-button';
import { useModal } from '@store/apps/modal';

type PropTypes = {
    data: User[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const UsersList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const router = useRouter();
    const { openModal } = useModal();

    const usersListColumn: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 200,
            field: 'Profile',
            headerName: 'Name',
            sortable: false,
            renderCell: ({ row }: { row: User }) => {
                return (
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar alt={"profile"} src={row?.profilePic} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
                        <Typography sx={{ color: 'text.secondary', marginLeft: 2 }}>{fullName(row?.firstName, row?.lastName)}</Typography>
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'email',
            headerName: 'Email',
            sortable: false,
            renderCell: ({ row }: { row: User }) =>
                <Typography sx={{ color: 'text.secondary' }}>{row?.email ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'phone',
            headerName: 'Contact',
            sortable: false,
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.phone ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'genderPreference',
            headerName: 'Gender',
            sortable: false,
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.genderPreference ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'isActive',
            headerName: 'Ban/ Un-Ban User',
            sortable: false,
            renderCell: ({ row }: { row: User }) => {
                return (<>
                    <Box>
                        <CustomButton
                            type={'button'}
                            variant='contained'
                            onClick={() => openModal({ view: "USER_STATUS_MODAL", data: row })}
                        >
                            {`${row?.isActive ? 'Ban' : 'Un-Ban'} User`}
                        </CustomButton>
                    </Box >
                </>)
            }
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'view-detail',
            headerName: 'View Detail',
            sortable: false,
            renderCell: ({ row }: { row: User }) => {
                return (<>
                    <Box>
                        <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row?.id}`)}>
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
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
            rows={data.map((value) => ({ id: value.id, ...value })) ?? []}
            columns={usersListColumn}
            hideFooterPagination={true}
            hideFooter={true}
        />
        <Stack
            mt={5}
            spacing={2}
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

export default UsersList 
