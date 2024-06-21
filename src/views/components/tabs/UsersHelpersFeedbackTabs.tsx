import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FeedbackTable from '@components/feedback-reviews/FeedbackTable';
import ReviewsTable from '@components/feedback-reviews/ReviewsTable';

type feedBackAndReviews = {
    feedbackTable: string,
    reviewsTable: string,
    userHelpersId: any
}

export default function UsersHelpersFeedbackTabs({ feedbackTable, reviewsTable, userHelpersId }: feedBackAndReviews) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                    <TabList onChange={handleChange}>
                        <Tab
                            label={feedbackTable}
                            value="1"
                            sx={{
                                width: '200px',
                                borderRadius: '10px',
                                padding: '12px',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(21, 1, 1, 0.06);',
                                    color: 'black',
                                }
                            }}
                        />
                        <Tab
                            label={reviewsTable}
                            value="2"
                            sx={{
                                width: '200px',
                                borderRadius: '10px',
                                padding: '12px',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(21, 1, 1, 0.06);',
                                    color: 'black'
                                }
                            }}
                        />
                    </TabList>
                </Box>
                <TabPanel value="1"><FeedbackTable userHelpersId={userHelpersId} feedbackHeading={feedbackTable} /></TabPanel>
                <TabPanel value="2"><ReviewsTable userHelpersId={userHelpersId} reviewsHeading={reviewsTable} /></TabPanel>
            </TabContext>
        </Box>
    );
}
