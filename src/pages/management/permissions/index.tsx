import { ReactNode, useState } from 'react'
import { superAdminOnly } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import CustomError from '@components/common/error/custom-error'
import Icon from '@components/common/icon/icon';
import { useModal } from '@store/apps/modal'
import { usePermissionsQuery } from '@data/permissions/permissions-query'
import PermissionsList from '@components/permissions/permissions-list'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'

const Permissions = () => {
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const { openModal } = useModal()

    const { data: permissions, isLoading, error } = usePermissionsQuery({
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
            <Typography variant='h4' sx={{ color: "text.primary" }}>Permissions List</Typography>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder='Search by name, module name' onChange={e => setSearchVal(e.target.value)} />
                </form>

                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}
                >
                    Reset
                </CustomButton>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => openModal({ view: "CREATE_PERMISSION_VIEW" })}
                    //@ts-ignore
                    startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                >
                    Create Permission
                </CustomButton>
            </Box>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <PermissionsList
                    onPaginationChange={onPageChange}
                    data={permissions?.permissions?.data}
                    paginatorInfo={permissions?.permissions?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

Permissions.authProps = {
    allowedRoles: superAdminOnly
}

Permissions.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default Permissions
