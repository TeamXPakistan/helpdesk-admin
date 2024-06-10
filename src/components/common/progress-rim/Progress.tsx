import LinearProgress from '@mui/material/LinearProgress';

const ProgressLinearColors = () => {
    return (
        <LinearProgress
            variant="determinate"
            value={70}
            sx={{
                borderRadius: '5px',
                height: '10px',
                '& .MuiLinearProgress-bar': {
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, #ff0000 20%, #0000ff 20%, #0000ff 70%, transparent 70%)'
                }
            }}
        />
    );
}

export default ProgressLinearColors;
