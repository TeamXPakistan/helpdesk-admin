import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Helpers, IPaginatorInfo } from '@ts-types/generated';
import { Avatar, Grid, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { fullName } from '@utils/helper-functions';
import CustomButton from '@components/common/Button/custom-button';
import { useModal } from '@store/apps/modal';



type PropTypes = {
  data: Helpers[];
  onPaginationChange: any;
  paginatorInfo: IPaginatorInfo
};


const FaqEntries = ({ data = [], onPaginationChange}: PropTypes) => {
  console.log(data)
    const router = useRouter();
    const { openModal } = useModal();

    const helpersListColumn: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 200,
            field: 'email',
            headerName: 'Questions',
            sortable: false,
            renderCell: ({ row }: { row: Helpers }) => <Typography sx={{ color: 'text.secondary' }}>{row?.email ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'ohone',
            headerName: 'Answer',
            sortable: false,
            renderCell: ({ row }: { row: Helpers }) => <Typography sx={{ color: 'text.secondary' }}>{row?.phone ?? "-"}</Typography>
        },
        {
            flex: 0.25,
            minWidth: 200,
            field: 'Is',
            headerName: 'Action',
            sortable: false,
            renderCell: ({ row }: { row: Helpers }) => {
                return (
                    <Box>
                        <CustomButton
                            type={'button'}
                            variant='contained'
                            onClick={() => openModal({ view: "HELPER_STATUS_MODAL", data: row })}
                            sx={{ width: "10px", p: 1 }}
                        >
                            Edit
                        </CustomButton>
                        <CustomButton
                            type={'button'}
                            variant='contained'
                            onClick={() => openModal({ view: "HELPER_STATUS_MODAL", data: row })}
                            sx={{ width: "10px", ml: 2, p: 1 }}
                        >
                            Delete
                        </CustomButton>
                        <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row?.id}`)}>
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
                        </IconButton>
                    </Box>
                );
            }
        },
    ];

    return (
        <>
            <DataGrid
                autoHeight
                disableColumnMenu
                rows={data?.map((value) => ({ ...value }))}
                columns={helpersListColumn}
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
                    count={3}
                    page={1}
                    onChange={onPaginationChange}
                />
            </Stack>
        </>
    );
};

export default FaqEntries;
