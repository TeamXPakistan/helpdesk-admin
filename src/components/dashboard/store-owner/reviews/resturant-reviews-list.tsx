import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, ShopReview } from '@ts-types/generated';
import { Avatar, IconButton, } from '@mui/material';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Icon from '@components/common/icon/icon';
import { useModal } from '@store/apps/modal';


type PropTypes = {
    data: ShopReview[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const ResturantReviewsList = ({ data, onPaginationChange, paginatorInfo }: PropTypes) => {

    const { openModal } = useModal();

    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const defaultColumns2: GridColDef[] = [
        {
            width: 150,
            field: 'name',
            headerName: 'Customer',
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
            width: 350,
            field: 'description',
            headerName: 'Comment',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: ShopReview }) => <Typography sx={{ color: 'text.secondary' }}>{row?.description}</Typography>
        },
        {
            width: 200,
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
            width: 200,
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
        {
            width: 130,
            field: 'images',
            headerName: 'Images',
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }: { row: ShopReview }) => {
                return (<>
                    {row?.images?.length ?
                        <Box>
                            <IconButton title='View Images' color='inherit' aria-haspopup='true'
                                onClick={() => openModal({ view: "SHOP_REVIEW_IMAGES_VIEW", data: { images: row?.images } })}
                            >
                                <Icon fontSize='1.625rem' icon={'ph:eye'} />
                            </IconButton>
                        </Box > :
                        <Typography>No Images</Typography>
                    }
                </>)
            }
        }
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
            rows={data?.map((value) => ({ id: value._id, ...value })) ?? []}
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

export default ResturantReviewsList;