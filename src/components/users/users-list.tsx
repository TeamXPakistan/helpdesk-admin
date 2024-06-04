import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, User } from '@ts-types/generated';
import { Avatar, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';


type PropTypes = {
    data: User[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};


const UsersList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const router = useRouter();

    const defaultColumns2: GridColDef[] = [
        {
            width: 125,
            field: 'id',
            headerName: 'Profile',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: User }) => <Avatar alt={"profile"} src={row?.profileImage} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
        },
        {
            width: 200,
            field: 'image',
            headerName: 'name',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name ?? "-"}</Typography>
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
            headerName: 'Contact',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.contact ?? "-"}</Typography>
        },
        {
            width: 100,
            field: 'title4',
            headerName: 'Action',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: User }) => {
                return (<>
                    <Box>
                        <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row?._id}`)}>
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

export default UsersList 