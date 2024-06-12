import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginatorInfo, User } from '@ts-types/generated';
import { Avatar, Grid, IconButton } from '@mui/material';
import Icon from '@components/common/icon/icon';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useModal } from '@store/apps/modal';
import { useState } from 'react';
import Spinner from '@components/common/spinner/spinner';
import CustomError from '@components/common/error/custom-error';
import { useHelpersUsersFeedbackQuery } from '@data/helpers-users-feedback/feedback';

// type PropTypes = {
//     data: User[];
//     onPaginationChange: any;
//     paginatorInfo: IPaginatorInfo
// };



const FeedbackTable = ({ userHelpersId }: any) => {
    const router = useRouter();
    const { openModal } = useModal();

    const [page, setPage] = useState<number>(1)
    const [text, setText] = useState<string>(userHelpersId)


    const { data: feedbacks, isLoading, error } = useHelpersUsersFeedbackQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text
    })
    console.log(feedbacks, "...front Feedback Data");

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
            headerName: 'Feedback',
            sortable: false,
            renderCell: ({ row }) => {
                return (
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography sx={{ color: 'text.secondary', marginLeft: 2 }}>
                            {row.message}
                        </Typography>
                    </Grid>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 250,
            field: 'feedbackType',
            headerName: 'Positive/Negative',
            sortable: false,
            renderCell: ({ row }) => {
                return (

                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography sx={{ color: 'text.secondary', marginLeft: 2 }}>
                            {row?.feedbackType}
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
                            {row?.reviewee?.username}
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
                            {row?.user?.username}
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
            sortable: false,
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
        { id: 1, feedback: 'Good', positive: 34223, from: "Tooba gwd wed", to: "Rimsha", view: "View" },
        { id: 2, feedback: 'Satisfied', positive: 343, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 3, feedback: 'Good', positive: 23214, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 4, feedback: 'Very Good', positive: 4233, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 5, feedback: 'Satisfied', positive: 24, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 6, feedback: 'Good', positive: 32323, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 7, feedback: 'Not Satisfied', positive: 320, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 8, feedback: 'Satisfied', positive: 33, from: "Tooba", to: "Rimsha", view: "View" },
        { id: 9, feedback: 'Need to improve', positive: 332345, from: "Tooba", to: "Rimsha", view: "View" }
    ];

    return <>
        <DataGrid
            autoHeight
            disableColumnMenu
            rows={feedbacks?.feedback?.data?.map((value) => ({
                id: value?.id, ...value
            })) ?? []}
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
                count={feedbacks?.feedback?.paginatorInfo.lastPage}
                page={feedbacks?.feedback?.paginatorInfo.page}
                onChange={onPageChange}
            />
        </Stack>
    </>
}

export default FeedbackTable




