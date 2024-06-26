import { ReactNode, useState } from 'react'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import Icon from '@components/common/icon/icon';
import CustomError from '@components/common/error/custom-error'
import { useFaqEntriesQuery } from '@data/faq-entries/faq-entries-query'
import { useModal } from '@store/apps/modal'
import FaqEntriesList from '@components/content-management/Faq/faqEntriesList'

const FaqEntriesPage = () => {
    const [page, setPage] = useState<number>(1)
    const { openModal } = useModal();

    const { data: faqEntries, isLoading, error } = useFaqEntriesQuery({
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
            <Typography variant='h4' sx={{ color: "text.primary" }}>FAQ Entries</Typography>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => openModal({ view: "CREATE_FAQ_ENTRY" })}
                    // @ts-ignore
                    startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                >
                    Create FAQ
                </CustomButton>
            </Box>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <FaqEntriesList
                    onPaginationChange={onPageChange}
                    data={faqEntries.faqEntries.data}
                    paginatorInfo={faqEntries.faqEntries.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

FaqEntriesPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    // adminStaffPermissions: [AdminStaffPermissions.HELPERS]
}

FaqEntriesPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default FaqEntriesPage
