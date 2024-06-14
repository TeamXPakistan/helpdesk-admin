import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Grid, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useModal } from '@store/apps/modal';
import Spinner from '@components/common/spinner/spinner';
import CustomError from '@components/common/error/custom-error';
import { useState } from 'react';
import { useHelpersUsersReviewsQuery } from '@data/helpers-users-reviews/reviews';


const ReviewsTable = ({ userHelpersId }: any) => {
    const router = useRouter();
    const { openModal } = useModal();

    const [page, setPage] = useState<number>(1)
    const [role, setRole] = useState<number>(userHelpersId)

    const { data: reviews, isLoading, error } = useHelpersUsersReviewsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        role
    })

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />

    const columns: GridColDef[] = [
        {
            flex: 0.25,
            field: 'message',
            minWidth: 250,
            sortable: false,
            headerName: 'Reviews',
            renderCell: ({ row }) => {
                return (

                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {row.message}
                        </Typography>
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 250,
            field: 'rating',
            sortable: false,
            headerName: 'Rating',
            renderCell: ({ row }) => {
                return (
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography sx={{ color: 'text.secondary', marginLeft: 2 }}>
                            {row?.rating}
                        </Typography>
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 250,
            field: 'reviewee',
            headerName: 'From',
            sortable: false,
            renderCell: ({ row }) => {
                return (
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {row?.reviewee?.username || row?.user?.email}
                        </Typography>
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 250,
            field: 'user',
            headerName: 'To',
            sortable: false,
            renderCell: ({ row }) => {
                return (
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {row?.user?.username || row?.user?.email}
                        </Typography>
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 250,
            field: 'view',
            headerName: 'View',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            onClick={() => openModal({ view: "HELPERS_USERS_FEEDBACK_REVIEWS_MODAL", data: row?.message })}
                            title='View' color='inherit' aria-haspopup='true'
                        >
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
                        </IconButton>
                    </Box>
                )
            }
        }
    ]


    return <>
        <DataGrid
            autoHeight
            disableColumnMenu
            rows={reviews?.reviews?.data?.map((value) => ({ id: value?.id, ...value })) ?? []}
            columns={columns}
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
                count={reviews?.reviews?.paginatorInfo.lastPage}
                page={reviews?.reviews?.paginatorInfo.page}
                onChange={onPageChange}
            />
        </Stack>
    </>
}

export default ReviewsTable 
