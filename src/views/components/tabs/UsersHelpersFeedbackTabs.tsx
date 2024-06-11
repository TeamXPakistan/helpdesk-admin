import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FeedbackTable from '../table/FeedbackTable';
import ReviewsTable from '../table/ReviewsTable';

type feedBackAndReviews = {
    feedbackTable: string,
    reviewsTable: string
}


export default function UsersHelpersFeedbackTabs({ feedbackTable, reviewsTable }: feedBackAndReviews) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            width: '100%'
            , margin: 'auto',
            alignItems: 'center', justifyContent: 'center',
            display: 'flex', flexDirection: 'column'
        }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label={feedbackTable} value="1" />
                        <Tab label={reviewsTable} value="2" />
                    </TabList>
                </Box>

                <TabPanel value="1"><FeedbackTable /></TabPanel>
                <TabPanel value="2"><ReviewsTable /></TabPanel>
            </TabContext>
        </Box>
    );
}
