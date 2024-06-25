import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, User, parentCategories } from '@ts-types/generated';
import { Avatar, Grid, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { fullName } from '@utils/helper-functions';
import CustomButton from '@components/common/Button/custom-button';
import { useModal } from '@store/apps/modal';

type PropTypes = {
    data: parentCategories[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const ParentCategoriesList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const router = useRouter();
    const { openModal } = useModal();

    const ParentCategoriesColumn: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 200,
            field: 'image',
            headerName: 'Image',
            sortable: false,
            renderCell: ({ row }: { row: parentCategories }) => {
                return (
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar alt={"profile"} src={row?.image} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'name',
            headerName: 'Name',
            sortable: false,
            renderCell: ({ row }: { row: parentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.name ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'id',
            headerName: 'ID',
            sortable: false,
            renderCell: ({ row }: { row: parentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.id ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'parentId',
            headerName: 'Parent ID',
            sortable: false,
            renderCell: ({ row }: { row: parentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.parentId ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'approvalRequired',
            headerName: 'Approval',
            sortable: false,
            renderCell: ({ row }: { row: parentCategories }) => {
                return (<>
                    <Box>
                        <CustomButton
                            type={'button'}
                            variant='contained'
                            onClick={() => openModal({ view: "USER_STATUS_MODAL", data: row })}
                        >
                            {`${row?.approvalRequired ? 'True' : 'false'}`}
                        </CustomButton>
                    </Box >
                </>)
            }
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'callTime',
            headerName: 'Call Time',
            sortable: false,
            renderCell: ({ row }: { row: parentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.callTime ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'ratePerHour',
            headerName: 'Rate',
            sortable: false,
            renderCell: ({ row }: { row: parentCategories }) => <Typography sx={{ color: 'text.secondary' }}>{row?.ratePerHour ?? "-"}</Typography>
        },
    ]

    return <>
        <DataGrid
            autoHeight
            disableColumnMenu
            rows={data.map((value) => ({ _id: value?.id, ...value })) ?? []}
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
