import { Card, CardHeader, Grid, Box, Typography, LinearProgress } from '@mui/material';

const FeedbackCard = ({ positiveFeedback, negativeFeedback }: any) => {
    const totalFeedback = positiveFeedback + negativeFeedback;
    const positivePercentage = (positiveFeedback / totalFeedback) * 100;
    const negativePercentage = (negativeFeedback / totalFeedback) * 100;

    return (
        <Card className='cards-styling-rim'>
            <CardHeader
                title={
                    <Typography sx={{ textAlign: "left" }}
                        variant='h4' className='dashboard-heading-rim'>
                        User Feedback
                    </Typography>
                }
            />

            <Box padding={5}>
                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <Typography variant='h4' sx={{ color: '#AAAAAA', fontSize: '14px', fontWeight: '400' }} gutterBottom>
                            Positive Feedback
                        </Typography>
                        <Typography variant='h2' sx={{ color: '#070707', fontSize: '28px', fontWeight: '500' }} gutterBottom>
                            {positiveFeedback}%
                        </Typography>

                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h4' sx={{ color: '#AAAAAA', fontSize: '14px', fontWeight: '400' }} gutterBottom>
                            Negative Feedback
                        </Typography>
                        <Typography variant='h2' sx={{ color: '#070707', fontSize: '28px', fontWeight: '500' }} gutterBottom>
                            {negativeFeedback}%
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <LinearProgress variant='determinate'
                            value={positivePercentage}
                            sx={{
                                height: 16,
                                backgroundColor: 'red',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: 'green'
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default FeedbackCard;
