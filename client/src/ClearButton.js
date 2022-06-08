import Button from '@mui/material/Button';

const ClearButton = ({ setClear }) => {

    return (
        <Button variant="contained" color="secondary" onClick={setClear(true)}
            style={{ display: 'block' }}>
            Clear        </Button>
    )
}




export default ClearButton;