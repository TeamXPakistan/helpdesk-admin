import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, ResturantCategory } from '@ts-types/generated';
import { Avatar, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';
import { useRouter } from 'next/router'
import { useDeleteResturantCategoryMutation } from '@data/resturant-categories/delete-resturant-category-mutation';

type PropTypes = {
    data: ResturantCategory[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const ResturantCategoriesList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();
    const router = useRouter()
    const { mutate: deleteCategory } = useDeleteResturantCategoryMutation()

    const defaultColumns2: GridColDef[] = [
        {
            flex: 0.1,
            field: 'image',
            headerName: 'Image',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: ResturantCategory }) => <Avatar alt={"Image"} src={row?.image} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
        },
        {
            flex: 0.1,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: ResturantCategory }) => <Typography sx={{ color: 'text.secondary' }}>{row.title}</Typography>
        },
        {
            flex: 0.1,
            field: 'title4',
            headerName: 'Action',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: ResturantCategory }) => {
                return (<>
                    <Box>
                        <IconButton
                            title='Delete'
                            color='inherit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "GENERAL_DELETE_VIEW", data: { handelDelete: () => deleteCategory(row?._id) } })}
                        >
                            <Icon color='red' fontSize='1.225rem' icon={'octicon:trash-24'} />
                        </IconButton>

                        <IconButton color='inherit' title='Edit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/edit/${row._id}`)}>
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

export default ResturantCategoriesList;