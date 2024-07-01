import ParentCategoriesList from '@components/categories/parent-categories/parent-categories-list'
import SubCategoriesList from '@components/categories/sub-categories/sub-categories-list'
import CustomButton from '@components/common/Button/custom-button'
import CustomError from '@components/common/error/custom-error'
import Spinner from '@components/common/spinner/spinner'
import { useSubCategoriesQuery } from '@data/category/sub-category/sub-categories-query'
import { Icon } from '@iconify/react'
import AdminLayout from '@layouts/admin-layout'
import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'

const SubCategories = () => {

    const [page, setPage] = useState<number>(1)
    const router = useRouter();

    const { data: subCategories, isLoading, error } = useSubCategoriesQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page
    });
    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />


    return <>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Sub Categories</Typography>
            <CustomButton
                type="button"
                variant='contained'
                fullWidth={false}
                onClick={() => router.push(router.asPath + "/create")}
                //@ts-ignore
                startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
            >
                Create Sub Category
            </CustomButton>
        </Box >

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <SubCategoriesList
                    onPaginationChange={onPageChange}
                    data={subCategories?.subCategories?.data}
                    paginatorInfo={subCategories?.subCategories?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

SubCategories.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    //adminStaffPermissions: [AdminStaffPermissions.HELPERS]
}

SubCategories.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
export default SubCategories
