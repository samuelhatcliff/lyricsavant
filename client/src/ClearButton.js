import Button from '@mui/material/Button';
import ClearContext from "./Context"
import React, { useContext } from 'react';

const ClearButton = ({ }) => {
    return (
        <Button className="button" variant="contained" color="secondary"
            onClick={() => window.location.reload(false)}
            style={{ display: 'block' }}>
            Clear        </Button>
    )
}




export default ClearButton;