// import React from 'react';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { Box } from '@mui/system';
// import { Card, CardHeader, Typography } from '@mui/material';
// import CustomButton from '@components/common/Button/custom-button';
// import { useModal } from '@store/apps/modal';


// export default function ReviewsTable() {

//     const { openModal } = useModal();

//     const columns: GridColDef[] = [
//         {
//             flex: 0.1,
//             field: 'reviews',
//             minWidth: 220,
//             headerName: 'Reviews',
//             renderCell: ({ row }) => {
//                 return (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                             {row.reviews}
//                         </Typography>
//                     </Box>
//                 )
//             }
//         },
//         {
//             flex: 0.1,
//             minWidth: 220,
//             field: 'rating',
//             headerName: 'Rating',
//             renderCell: ({ row }) => {
//                 return (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                             {row?.rating}
//                         </Typography>
//                     </Box>
//                 )
//             }
//         },
//         {
//             flex: 0.1,
//             minWidth: 220,
//             field: 'from',
//             headerName: 'From',
//             renderCell: ({ row }) => {
//                 return (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                             {row?.from}
//                         </Typography>
//                     </Box>
//                 )
//             }
//         },
//         {
//             flex: 0.1,
//             minWidth: 220,
//             field: 'to',
//             headerName: 'To',
//             renderCell: ({ row }) => {
//                 return (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                             {row?.to}
//                         </Typography>
//                     </Box>
//                 )
//             }
//         },
//         {
//             flex: 0.1,
//             minWidth: 220,
//             field: 'view',
//             headerName: 'View',
//             renderCell: ({ row }) => {
//                 return (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                             <CustomButton
//                                 type={'button'}
//                                 onClick={() => openModal({ view: "HELPERS_USERS_FEEDBACK_REVIEWS_MODAL", data: row })}
//                             >
//                                 {row?.view}
//                             </CustomButton>
//                         </Typography>
//                     </Box>
//                 )
//             }
//         }
//     ]

//     const rows = [
//         { id: 1, reviews: 'Nice', rating: 5, from: "Tooba gwd wed", to: "Rimsha", view: "View" },
//         { id: 2, reviews: 'Satisfied', rating: 2, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 3, reviews: 'Good', rating: 3, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 4, reviews: 'Very Good', rating: 5, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 5, reviews: 'Satisfied', rating: 1, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 6, reviews: 'Good', rating: 4, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 7, reviews: 'Not Satisfied', rating: 5, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 8, reviews: 'Satisfied', rating: 3, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 9, reviews: 'Need to improve', rating: 3, from: "Tooba", to: "Rimsha", view: "View" }
//     ];

//     return (
//         <div style={{ height: 530, width: '100%' }}
//             className='user-helpers-feedback-table'>
//             <Card className='user-helpers-feedback-tableInner'>
//                 <CardHeader
//                     title={
//                         <Typography
//                             sx={{ textAlign: 'center' }}
//                             variant='h4'>
//                             REVIEWS TABLE
//                         </Typography>
//                     }
//                 />

//                 <DataGrid
//                     autoHeight
//                     rows={rows}
//                     rowHeight={58}
//                     columns={columns}
//                     rowSelection={false}
//                     initialState={{
//                         pagination: {
//                             paginationModel: { page: 0, pageSize: 8 },
//                         },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                 />
//             </Card>
//         </div>
//     );
// }


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

type PropTypes = {
    data: User[];
    onPaginationChange: any;
    paginatorInfo: IPaginatorInfo
};

const ReviewsTable = () => {
    const router = useRouter();
    const { openModal } = useModal();

    // const usersListColumn: GridColDef[] = [
    //     {
    //         flex: 0.25,
    //         minWidth: 200,
    //         field: 'Profile',
    //         headerName: 'Name',
    //         sortable: false,
    //         renderCell: ({ row }: { row: User }) => {
    //             return (
    //                 <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
    //                     <Avatar alt={"profile"} src={row?.profilePic} sx={{ width: 38, height: 38, borderRadius: "20%" }} />
    //                     <Typography sx={{ color: 'text.secondary', marginLeft: 2 }}>{fullName(row?.firstName, row?.lastName)}</Typography>
    //                 </Grid>
    //             )
    //         }
    //     },
    //     {
    //         flex: 0.25,
    //         minWidth: 200,
    //         field: 'email',
    //         headerName: 'Email',
    //         sortable: false,
    //         renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.email ?? "-"}</Typography>
    //     },
    //     {
    //         flex: 0.25,
    //         minWidth: 200,
    //         field: 'phone',
    //         headerName: 'Contact',
    //         sortable: false,
    //         renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.phone ?? "-"}</Typography>
    //     },
    //     {
    //         flex: 0.25,
    //         minWidth: 200,
    //         field: 'genderPreference',
    //         headerName: 'Gender',
    //         sortable: false,
    //         renderCell: ({ row }: { row: User }) => <Typography sx={{ color: 'text.secondary' }}>{row?.genderPreference ?? "-"}</Typography>
    //     },
    //     {
    //         flex: 0.25,
    //         minWidth: 200,
    //         field: 'isActive',
    //         headerName: 'Ban/ Un-Ban User',
    //         sortable: false,
    //         renderCell: ({ row }: { row: User }) => {
    //             return (<>
    //                 <Box>
    //                     <CustomButton
    //                         type={'button'}
    //                         variant='contained'
    //                         onClick={() => openModal({ view: "USER_STATUS_MODAL", data: row })}
    //                     >
    //                         {`${row?.isActive ? 'Ban' : 'Un-Ban'} User`}
    //                     </CustomButton>
    //                 </Box >
    //             </>)
    //         }
    //     },
    //     {
    //         flex: 0.25,
    //         minWidth: 200,
    //         field: 'view-detail',
    //         headerName: 'View Detail',
    //         sortable: false,
    //         renderCell: ({ row }: { row: User }) => {
    //             return (<>
    //                 <Box>
    //                     <IconButton title='View' color='inherit' aria-haspopup='true' onClick={() => router.push(`${router.asPath}/details/${row?.id}`)}>
    //                         <Icon fontSize='1.625rem' icon={'ph:eye'} />
    //                     </IconButton>
    //                 </Box >
    //             </>)
    //         }
    //     }
    // ]

    const columns: GridColDef[] = [
        {
            flex: 0.1,
            field: 'reviews',
            minWidth: 220,
            headerName: 'Reviews',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {row.reviews}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 220,
            field: 'rating',
            headerName: 'Rating',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {row?.rating}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 220,
            field: 'from',
            headerName: 'From',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {row?.from}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 220,
            field: 'to',
            headerName: 'To',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {row?.to}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 220,
            field: 'view',
            headerName: 'View',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            <CustomButton
                                type={'button'}
                                onClick={() => openModal({ view: "HELPERS_USERS_FEEDBACK_REVIEWS_MODAL", data: row })}
                            >
                                {row?.view}
                            </CustomButton>
                        </Typography>
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
            rows={rows}
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
                count={paginatorInfo.lastPage}
                page={paginatorInfo.page}
                onChange={onPaginationChange}
            /> */}
        </Stack>
    </>
}

export default ReviewsTable 
