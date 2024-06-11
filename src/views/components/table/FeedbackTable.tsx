// import React from 'react';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { Box } from '@mui/system';
// import { Card, CardHeader, Typography } from '@mui/material';
// import CustomButton from '@components/common/Button/custom-button';
// import { useModal } from '@store/apps/modal';


// export default function FeedbackTable({onPaginationChange :}) {

//     const { openModal } = useModal();
//     const columns: GridColDef[] = [
//         {
//             flex: 0.1,
//             field: 'feedback',
//             minWidth: 220,
//             headerName: 'Feedback',
//             renderCell: ({ row }) => {
//                 return (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                             {row.feedback}
//                         </Typography>
//                     </Box>
//                 )
//             }
//         },
//         {
//             flex: 0.1,
//             minWidth: 220,
//             field: 'positive',
//             headerName: 'Positive/Negative',
//             renderCell: ({ row }) => {
//                 return (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                             {row?.positive}
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
//         { id: 1, feedback: 'Good', positive: 34223, from: "Tooba gwd wed", to: "Rimsha", view: "View" },
//         { id: 2, feedback: 'Satisfied', positive: 343, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 3, feedback: 'Good', positive: 23214, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 4, feedback: 'Very Good', positive: 4233, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 5, feedback: 'Satisfied', positive: 24, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 6, feedback: 'Good', positive: 32323, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 7, feedback: 'Not Satisfied', positive: 320, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 8, feedback: 'Satisfied', positive: 33, from: "Tooba", to: "Rimsha", view: "View" },
//         { id: 9, feedback: 'Need to improve', positive: 332345, from: "Tooba", to: "Rimsha", view: "View" }
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
//                             FEEDBACK TABLE
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

// type PropTypes = {
//     data: User[];
//     onPaginationChange: any;
//     paginatorInfo: IPaginatorInfo
// };

const FeedbackTable = () => {
    const router = useRouter();


    const { openModal } = useModal();
    const columns: GridColDef[] = [
        {
            flex: 0.1,
            field: 'feedback',
            minWidth: 220,
            headerName: 'Feedback',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {row.feedback}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 220,
            field: 'positive',
            headerName: 'Positive/Negative',
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {row?.positive}
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

export default FeedbackTable




