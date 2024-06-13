import { ReactNode, useState } from 'react'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import { AdminStaffPermissions } from '@utils/constants';
import CustomError from '@components/common/error/custom-error'
import { useHelpersQuery } from '@data/helpers/helpers-query'
import HelpersList from '@components/helpers/helpers-list'

const HelpersPage = () => {
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const { data: helpers, isLoading, error } = useHelpersQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text
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
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Helpers List</Typography>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder='Search by name, email and contact ' onChange={e => setSearchVal(e.target.value)} />
                </form>

                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}
                >
                    Reset
                </CustomButton>
            </Box>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <HelpersList
                    onPaginationChange={onPageChange}
                    data={helpers.helpers.data}
                    paginatorInfo={helpers.helpers.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

HelpersPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.HELPERS]
}

HelpersPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default HelpersPage
