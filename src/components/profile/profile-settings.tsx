import { SyntheticEvent, useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import ChangePassword from "./change-password"
import EditProfile from "./edit-profile"
import { useTranslation } from 'react-i18next'


const ProfileSetting = () => {

    const [value, setValue] = useState<string>('edit-profile')
    const { t } = useTranslation(["common"])
    const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <Card>
            <TabContext value={value}>
                <TabList
                    variant='scrollable'
                    scrollButtons={false}
                    onChange={handleTabsChange}
                    sx={{ borderBottom: theme => `2px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
                >
                    <Tab value='edit-profile' label={`${t('common:edit-profile')}`} />
                    <Tab value='change-password' label={`${t("common:change-password")}`} />
                </TabList>

                <CardContent>
                    <ChangePassword />
                    <EditProfile />
                </CardContent>
            </TabContext>
        </Card>
    )
}

export default ProfileSetting