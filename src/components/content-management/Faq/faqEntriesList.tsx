import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaqEntries, Helpers, IPaginatorInfo } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import CustomButton from '@components/common/Button/custom-button';
import { useModal } from '@store/apps/modal';

type PropTypes = {
    data?: FaqEntries[];
    onPaginationChange: any;
    paginatorInfo?: IPaginatorInfo;  // Make paginatorInfo optional
};

const FaqEntriesList = ({ data = [], onPaginationChange, paginatorInfo = { lastPage: 1, page: 1, totalDocs: 0, limit: 10, totalPages: 1, pagingCounter: 1, hasPrevPage: false, hasNextPage: false, prevPage: null, nextPage: null } }: PropTypes) => {
    const router = useRouter();
    const { openModal } = useModal();

    // Ensure data is always an array
    const faqEntriesData = Array.isArray(data) ? data : [];
console.log(data)
    const FaqEntriesListColumn: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 200,
            field: 'title',
            headerName: 'Question',
            sortable: false,
            renderCell: ({ row }: { row: FaqEntries }) => <Typography sx={{ color: 'text.secondary' }}>{row?.title ?? "-"}</Typography>
        },
   
        {
            flex: 0.25,
            minWidth: 200,
            field: 'description',
            headerName: 'Answer',
            sortable: false,
            renderCell: ({ row }: { row: FaqEntries }) => <Typography sx={{ color: 'text.secondary' }}>{row?.description ?? "-"}</Typography>
        },
        
        {
            flex: 0.25,
            minWidth: 200,
            field: 'Action',
            headerName: 'Action',
            sortable: false,
            renderCell: ({ row }: { row: FaqEntries }) => {
                return (
                    <Box>
                        <CustomButton
                            type={'button'}
                            variant='contained'
                            onClick={() => openModal({ view: "HELPER_STATUS_MODAL", data: row })}
                            sx={{ width: '8px', ml:2}}
                        >
                            Edit
                        </CustomButton>
                        <CustomButton
                            type={'button'}
                            variant='contained'
                            onClick={() => openModal({ view: "HELPER_STATUS_MODAL", data: row })}
                            sx={{ width: '8px', ml:2, m:2 }}
                        >
                            Delete
                        </CustomButton>
                        <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row?.id}`)}>
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
                        </IconButton>
                    </Box>
                )
            }
        },
    ];

    return (
        <>
            <DataGrid
                autoHeight
                disableColumnMenu
                rows={data?.data?.map((value) => ({ ...value }))}
                columns={FaqEntriesListColumn}
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

export default FaqEntriesList;
