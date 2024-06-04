import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, ShopReview } from '@ts-types/generated';
import { Avatar, } from '@mui/material';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

type PropTypes = {
    data: ShopReview[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const ShopReviewsList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {

    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const defaultColumns2: GridColDef[] = [
        {
            // width: 300,
            flex: 1,
            field: 'name',
            headerName: 'User',
            sortable: false,
            headerAlign: "left",
            align: "left",
            renderCell: ({ row }: { row: ShopReview }) => {
                return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Avatar alt={"Image"} src={row?.profileImage} sx={{ width: 38, height: 38, borderRadius: "20%", mb: 2 }} />
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                            <Typography variant='body1'>{row?.name}</Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            // width: 200,
            flex: 1,

            field: 'ratting',
            headerName: 'Rating',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: ShopReview }) => {
                return (
                    <Box sx={{ mb: 3 }}>
                        <Rating readOnly value={row?.ratting} name='read-only' />
                    </Box>
                )
            }
        },
        {
            // width: 200,
            flex: 1,

            field: 'date',
            headerName: 'Date',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: ShopReview }) => {
                return (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant='body1'>
                            {dayjs.utc(row?.createdAt).tz(dayjs.tz.guess()).fromNow()}
                        </Typography>
                    </Box>
                )
            }
        },
    ]

    return <>
        <DataGrid
            sx={{
                "& .css-q360zr-MuiDataGrid-columnHeaders": { backgroundColor: "transparent" }, height: "50vh",
                '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
                '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '8px' },
                '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '11px' },
            }}
            disableColumnMenu
            getRowHeight={() => 'auto'}
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
                count={paginatorInfo?.totalPages}
                page={paginatorInfo?.page}
                onChange={onPaginationChange}
            />
        </Stack>
    </>
}

export default ShopReviewsList;