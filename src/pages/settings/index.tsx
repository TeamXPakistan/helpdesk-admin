import { superAdminOnly } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import { ReactNode } from 'react'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useSettingsQuery } from '@data/settings/settings-query';
import SettingsDetail from '@components/settings/settingsDetail';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

const Settings = () => {
    const { data, isLoading, error } = useSettingsQuery();

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error?.message} />

    return (
        <Card sx={{ borderRadius: 2, p: 4 }}>
            <CardHeader
                title='Settings'
                sx={{ p: 0 }}
                titleTypographyProps={{ fontSize: "1.1rem !important" }}
            />
            <SettingsDetail data={data?.settings} />
        </Card>
    )
}

Settings.authProps = {
    allowedRoles: superAdminOnly,
}
Settings.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default Settings
