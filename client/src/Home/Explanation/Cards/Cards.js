import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Card = ({ heading, paragraph }) => {
    return (
        <Grid item xs={12} sm={4}>
            <Paper sx={{
                ':hover': {
                    boxShadow: 6,
                },
                backgroundColor: 'primary.main',
                borderRadius: 3,
                boxShadow: 2
            }} style={{ textAlign: 'center', padding: 3 }}>
                <h2>{heading}</h2>
                <p style={{ textAlign: 'center', padding: 10, margin: 3 }}>{paragraph}</p>
            </Paper>
        </Grid>
    )
}

export default Card;