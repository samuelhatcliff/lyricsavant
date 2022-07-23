import Button from '@mui/material/Button';
import './InsightButton.css'

const InsightButton = ({ selected, handleOnSearch }) => {
    return (
        <div className='button-container'>
            <Button
                disabled={selected ? false : true}
                variant="contained"
                color="success"
                onClick={handleOnSearch}
                style={{ display: 'block', marginLeft: 10, marginTop: 32 }}>
                Get Insights
            </Button>
        </div>
    )
}

export default InsightButton;
