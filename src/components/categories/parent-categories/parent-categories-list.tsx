import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, ParentCategories } from '@ts-types/generated';
import { Checkbox, Grid, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useModal } from '@store/apps/modal';

type PropTypes = {
    data: ParentCategories[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const ParentCategoriesList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const router = useRouter();
    const { openModal } = useModal();

    const rows = data.map((value) => ({
        id: value.id,
        image: value.image,
        ratePerHour: value.ratePerHour,
        callTime: value.callTime,
        approvalRequired: value.approvalRequired,
        parentId: value.parentId,
        name: value.name ?? "-"
    }));

    const ParentCategoriesColumn: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 100,
            field: 'image',
            headerName: 'Image',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => {
                return (
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <img src={row?.image} alt={'Logo'} width={40} height={40} />
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 150,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 150,
            field: 'id',
            headerName: 'ID',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.id ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'parentId',
            headerName: 'Parent ID',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.parentId ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 50,
            field: 'approvalRequired',
            headerName: 'Approval',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => {
                return (<>
                    <Box>
                        <Checkbox
                            checked={row?.approvalRequired}
                            name="approvalRequired"
                        />
                    </Box >
                </>)
            }
        },
        {
            flex: 0.25,
            minWidth: 150,
            field: 'callTime',
            headerName: 'Call Time',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.callTime ?? 0}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'ratePerHour',
            headerName: 'Rate',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.ratePerHour ?? 0}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 150,
            field: 'Update',
            headerName: 'Update',
            sortable: false,
            renderCell: ({ row }: { row: ParentCategories }) => {
                return (<>
                    <Box>
                        <IconButton title='update' color='inherit' aria-haspopup='true'
                            onClick={() => openModal({ view: "EDIT_PARENT_CATEGORY", data: row })}
                        >
                            <Icon fontSize='1.625rem' icon='tabler:edit' color='green' />
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
            rows={rows}
            columns={ParentCategoriesColumn}
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

export default ParentCategoriesList 
