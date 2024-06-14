// import { useRouter } from "next/router";
// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'
// import { ReactNode } from "react";
// import Adminlayout from '@layouts/admin-layout'
// import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
// import Spinner from "@components/common/spinner/spinner";
// import CustomError from "@components/common/error/custom-error";
// import { AdminStaffPermissions } from "@utils/constants";
// import { useHelperQuery } from "@data/helpers/helper-query";
// import HelperProfileCard from "@components/helpers/helper-profile-card";

// const UserDetailPage = () => {
//     const router = useRouter();

//     const { data: faqEntries, error: userError, isLoading: fetchingFaqEntry } = useHelperQuery(router?.query?.id as string);

//     if (fetchingFaqEntry) return <Spinner />
//     if (userError) return <CustomError errorMsg={userError?.message} />

//     return (
//         <>
//             <Box
//                 sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}
//             >
//                 <Typography variant='h4' sx={{ color: "text.primary" }}>
//                     Faq Entries
//                 </Typography>
//             </Box>

//             <Grid container spacing={6}>

//                 <Grid item xs={12} md={5} lg={4}>
//                     <HelperProfileCard faqQueries={faqEntries} />
//                 </Grid>
//             </Grid>
//         </>
//     )
// };

// UserDetailPage.authProps = {
//     allowedRoles: superAdmin_and_AdminStaff,
//     adminStaffPermissions: [AdminStaffPermissions.HELPERS]
// }

// UserDetailPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>


// export default UserDetailPage;
