import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { Checkbox, Grid, IconButton, Pagination } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useModal } from '@store/apps/modal';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, SubCategories } from '@ts-types/generated';

type PropTypes = {
    data: SubCategories[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const SubCategoriesList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();

    const rows = data.map((value) => ({
        id: value.id,
        image: value.image,
        ratePerHour: value.ratePerHour,
        callTime: value.callTime,
        approvalRequired: value.approvalRequired,
        parentId: value.parentId,
        parentName: value.parent?.name ?? "-",
        name: value.name ?? "-"
    }));

    const SubCategoriesColumn: GridColDef[] = [
        {
            field: 'image',
            headerName: 'Image',
            flex: 0.25,
            minWidth: 100,
            sortable: false,
            renderCell: ({ row }) => (
                <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <img src={row.image} alt={'Logo'} width={40} height={40} />
                </Grid>
            )
        },
        {
            field: 'name',
            headerName: 'SubCategory Name',
            flex: 0.25,
            minWidth: 150,
            sortable: false,
            renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
        },
        {
            field: 'parentName',
            headerName: 'Parent Name',
            flex: 0.25,
            minWidth: 200,
            sortable: false,
            renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.parentName}</Typography>
        },
        {
            field: 'approvalRequired',
            headerName: 'Approval',
            flex: 0.25,
            minWidth: 50,
            sortable: false,
            renderCell: ({ row }) => (
                <Box>
                    <Checkbox
                        checked={row.approvalRequired}
                        name="approvalRequired"
                    />
                </Box>
            )
        },
        {
            field: 'callTime',
            headerName: 'Call Time',
            flex: 0.25,
            minWidth: 150,
            sortable: false,
            renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.callTime ?? 0}</Typography>
        },
        {
            field: 'ratePerHour',
            headerName: 'Rate',
            flex: 0.25,
            minWidth: 200,
            sortable: false,
            renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.ratePerHour ?? 0}</Typography>
        },
        {
            field: 'Update',
            headerName: 'Update',
            flex: 0.25,
            minWidth: 150,
            sortable: false,
            renderCell: ({ row }) => (
                <Box>
                    <IconButton
                        title='update'
                        color='inherit'
                        aria-haspopup='true'
                        onClick={() => openModal({ view: "EDIT_PARENT_CATEGORY", data: row })}
                    >
                        <Icon fontSize='1.625rem' icon='tabler:edit' color='#000' />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <>
            <DataGrid
                autoHeight
                disableColumnMenu
                rows={rows}
                columns={SubCategoriesColumn}
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
    );
}

export default SubCategoriesList;
