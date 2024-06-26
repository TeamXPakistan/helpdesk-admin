import ParentCategoriesList from '@components/categories/parent-categories/parent-categories-list'
import CustomButton from '@components/common/Button/custom-button'
import CustomError from '@components/common/error/custom-error'
import Spinner from '@components/common/spinner/spinner'
import { fetchParentCategories, useParentCategoriesQuery } from '@data/category/parent-categories-query'
import AdminLayout from '@layouts/admin-layout'
import { Card, CardContent, Icon, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'

const ParentCategories = () => {

    const [page, setPage] = useState<number>(1)
    const router = useRouter();

    const { data: categories, isLoading, error } = useParentCategoriesQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page
    });
    console.log(categories, "all parent categores")

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />


    return <>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Parent Categories</Typography>
            <CustomButton
                type="button"
                variant='contained'
                fullWidth={false}
                onClick={() => router.push(router.asPath + "/create")}
                //@ts-ignore
                startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
            >
                Create Category
            </CustomButton>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <ParentCategoriesList
                    onPaginationChange={onPageChange}
                    data={categories?.parentCategories?.data}
                    paginatorInfo={categories?.parentCategories?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

ParentCategories.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
export default ParentCategories
