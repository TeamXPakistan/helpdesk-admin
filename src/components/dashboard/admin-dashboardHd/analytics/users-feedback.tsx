import { Card, CardHeader, Grid, Box, Typography, LinearProgress } from '@mui/material';
import { textAlign } from '@mui/system';

const FeedbackCard = ({ positiveFeedback, negativeFeedback }: any) => {
    const totalFeedback = positiveFeedback + negativeFeedback;
    const positivePercentage = (positiveFeedback / totalFeedback) * 100;
    const negativePercentage = (negativeFeedback / totalFeedback) * 100;

    return (
        <Card className='cards-styling-rim'>
            <CardHeader
                title={
                    <Typography sx={{ textAlign: "left", marginBottom: '-15px' }}
                        variant='h4' className='dashboard-heading-rim'>
                        User Feedbacks
                    </Typography>
                }
            />

            <Box padding={5}>
                <Grid container spacing={6}>
                    <Grid item xs={6} sx={{ textAlign: 'left' }}>
                        <Typography variant='h4' sx={{ color: '#AAAAAA', fontSize: '14px', fontWeight: '400' }}>
                            Positive Feedback
                        </Typography>
                        <Typography variant='h2' sx={{ color: '#070707', fontSize: '28px', fontWeight: '500', marginTop: '25px' }}>
                            {positiveFeedback}%
                        </Typography>

                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                        <Typography variant='h4' sx={{ color: '#AAAAAA', fontSize: '14px', fontWeight: '400' }}>
                            Negative Feedback
                        </Typography>
                        <Typography variant='h2' sx={{ color: '#070707', fontSize: '28px', fontWeight: '500', marginTop: '25px' }}>
                            {negativeFeedback}%
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <LinearProgress variant='determinate'
                            value={positivePercentage}
                            sx={{
                                height: 16,
                                marginTop: -2,
                                backgroundColor: '#D94242',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#72E37D',
                                    borderRadius: 0
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
