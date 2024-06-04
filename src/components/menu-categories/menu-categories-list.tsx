import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, MenuCategory } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';
import { useRouter } from 'next/router'
import { useDeleteMenuCategoryMutation } from '@data/menu-categories/delete-menu-category-mutation';
import { useTranslation } from 'react-i18next';


type PropTypes = {
    data: MenuCategory[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const MenuCategoriesList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();
    const router = useRouter()
    const { mutate: deleteCategory } = useDeleteMenuCategoryMutation();
    const { t } = useTranslation(["common"])

    const defaultColumns2: GridColDef[] = [
        {
            flex: 1,
            field: 'title',
            headerName: `${t("category-name")}`,
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: MenuCategory }) => <Typography sx={{ color: 'text.secondary' }}>{row.title}</Typography>
        },
        {
            flex: 1,
            field: '_id',
            headerName: `${t("Action")}`,
            sortable: false,
            headerAlign: "right",
            align: "right",
            renderCell: ({ row }: { row: MenuCategory }) => {
                return (<>
                    <Box>
                        <IconButton
                            title={`${t("Delete")}`}
                            color='inherit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "GENERAL_DELETE_VIEW", data: { handelDelete: () => deleteCategory(row?._id) } })}
                        >
                            <Icon color='red' fontSize='1.225rem' icon={'octicon:trash-24'} />
                        </IconButton>

                        <IconButton color='inherit'
                            title={`${"edit-button"}`} aria-haspopup='true' onClick={() => router.push(`${router.asPath}/edit/${row._id}`)}>
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

export default MenuCategoriesList;