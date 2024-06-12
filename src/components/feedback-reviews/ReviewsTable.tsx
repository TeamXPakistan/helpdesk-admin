import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, User } from '@ts-types/generated';
import { Avatar, Grid, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { fullName } from '@utils/helper-functions';
import CustomButton from '@components/common/Button/custom-button';
import { useModal } from '@store/apps/modal';
import Spinner from '@components/common/spinner/spinner';
import CustomError from '@components/common/error/custom-error';
import { useState } from 'react';
import { useHelpersUsersReviewsQuery } from '@data/helpers-users-reviews/reviews';

type PropTypes = {
    data: User[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const ReviewsTable = ({ userHelpersId }: any) => {
    const router = useRouter();
    const { openModal } = useModal();

    const [page, setPage] = useState<number>(1)
    const [text, setText] = useState<string>(userHelpersId)

    const { data: reviews, isLoading, error } = useHelpersUsersReviewsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text
    })
    console.log(reviews, "...front Reviews Data");

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
                            onClick={() => openModal({ view: "HELPERS_USERS_FEEDBACK_REVIEWS_MODAL", data: row })}
                            title='View' color='inherit' aria-haspopup='true'
                        >
                            <Icon fontSize='1.625rem' icon={'ph:eye'} />
                        </IconButton>
                    </Box>
                )
            }
        }
    ]

    const rows = [
        { id: 1, reviews: 'Nice', rating: 5, from: "Tooba gwd wed", to: "Rimsha", view: "View" },
        { id: 2, reviews: 'Satisfied', rating: 2, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 3, reviews: 'Good', rating: 3, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 4, reviews: 'Very Good', rating: 5, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 5, reviews: 'Satisfied', rating: 1, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 6, reviews: 'Good', rating: 4, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 7, reviews: 'Not Satisfied', rating: 5, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 8, reviews: 'Satisfied', rating: 3, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 9, reviews: 'Need to improve', rating: 3, from: "Tooba", to: "Rimsha", view: "View" }
    ];


    return <>
        <DataGrid
            autoHeight
            disableColumnMenu
            // rows={reviews?.reviews?.data?.map((value) => ({ id: value?.id, ...value })) ?? []}
            rows={reviews?.reviews?.data?.data?.map((value) => ({ id: value?.id, ...value })) ?? []}
            columns={columns}
            hideFooterPagination={true}
            hideFooter={true}
        />
        <Stack
            mt={5}
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
        >
            {/* <Pagination
                color="primary"
                count={reviews?.reviews?.data?.paginatorInfo.lastPage}
                page={reviews?.reviews?.data?.paginatorInfo.page}
                onChange={onPageChange}
            /> */}
        </Stack>
    </>
}

export default ReviewsTable 
