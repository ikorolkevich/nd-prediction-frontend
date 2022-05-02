import React from 'react';
import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';



const CircularProgressWithLabel: React.FC<CircularProgressProps> = (props) => {

    let color: CircularProgressProps['color'] = 'primary'
    let value: number = 0
    if (props.value !== undefined){
        value = props.value
    }
    if (value > 85) {
        color = 'error'
    }
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }} minHeight={150}>
            {value > 0 && 
            <CircularProgress {...props} thickness={4.5} color={color} size={150} variant={'determinate'} />
            }
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
             <LocalFireDepartmentIcon/>   
                <Typography
                    variant="h5"
                >{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    )
}

export default CircularProgressWithLabel