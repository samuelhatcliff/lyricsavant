import React from 'react';
//MUI Components
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const Prompt = ({ handleChecked }) => {
    return (
        <label className="prompt" >
            <Typography variant="body2" component="div" gutterBottom style={{ display: 'inline', paddingTop: 12 }}>
                <Checkbox placeholder="checkbox" onChange={handleChecked} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{ display: 'inline', zIndex: -1 }} />
                <span>Compare two separate artists?</span>
            </Typography>
        </label>
    )
}

export default Prompt