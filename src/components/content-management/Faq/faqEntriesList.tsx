import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaqEntries, IPaginatorInfo } from '@ts-types/generated';
import { IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useModal } from '@store/apps/modal';

type PropTypes = {
    data: FaqEntries[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo;
};

const FaqEntriesList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {
    const { openModal } = useModal();

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
            width: 250,
            field: 'action',
            headerName: 'Action',
            sortable: false,
            headerAlign: "right",
            align: "right",
            renderCell: ({ row }: { row: FaqEntries }) => {
                return (<>
                    <Box>
                        <IconButton
                            title='Delete'
                            color='inherit'
                            aria-haspopup='true'
                            onClick={() => {
                                openModal({ view: "DELETE_FAQ_ENTRY", data: row });
                            }}>
                            <Icon color='red' fontSize='1.225rem' icon={'octicon:trash-24'} />
                        </IconButton>

                        <IconButton
                            color='inherit'
                            title='Edit'
                            aria-haspopup='true'
                            onClick={() => openModal({ view: "UPDATE_FAQ_ENTRY", data: row })}
                        >
                            <Icon color='green' fontSize='1.225rem' icon={'nimbus:edit'} />
                        </IconButton>
                        <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => openModal({ view: "VIEW_FAQ_ENTRY", data: row })}>
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
                        </IconButton>
                    </Box >
                </>)
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
