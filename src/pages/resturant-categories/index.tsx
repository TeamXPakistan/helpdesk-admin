import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import CustomError from "@components/common/error/custom-error";
import Icon from '@components/common/icon/icon';
import { useRouter } from 'next/router'
import AdminLayout from "@layouts/admin-layout";
import { useResturantCategoriesQuery } from "@data/resturant-categories/resturant-categories-query";
import ResturantCategoriesList from "@components/resturant-categories/resturant-categories-list";
import { AdminStaffPermissions } from "@utils/constants";
import { useTranslation } from "react-i18next";

const ResturantCategoriesIndex = () => {
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const router = useRouter();
    const { t } = useTranslation(["common"])

    const { data: categories, isLoading, error } = useResturantCategoriesQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text: text,
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setText(''); setSearchVal('')
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Box
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>{t("nav-store-owner-text-categories")}</Typography>

            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder={`${t('placeholder-search-name')}`} onChange={e => setSearchVal(e.target.value)} />
                </form>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}
                >
                    {t("Reset")}
                </CustomButton>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => router.push(router.asPath + "/create")}
                    startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                >
                    {t("nav-store-owner-text-create-category")}
                </CustomButton>
            </Box>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <ResturantCategoriesList
                    onPaginationChange={onPageChange}
                    data={categories.categories.data}
                    paginatorInfo={categories.categories.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

ResturantCategoriesIndex.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.RESTURANT_CATEGORIES]
}
ResturantCategoriesIndex.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
export default ResturantCategoriesIndex;