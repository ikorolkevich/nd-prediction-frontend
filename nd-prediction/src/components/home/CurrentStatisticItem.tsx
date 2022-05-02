import React from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export type CurrentStatisticItemProps = {
    icon: JSX.Element
    title: string
    value: string
}


const CurrentStatisticItem: React.FC<CurrentStatisticItemProps> = (props) => {
    return (
        <Box my={2} justifyContent='space-between' display={'flex'} width={'100%'}>
            <Box display={'flex'}>
            {props.icon}<Typography mx={1} variant="subtitle2">{props.title}</Typography>
            </Box>
            <Box>
                <Typography mx={1} variant="subtitle2">{props.value}</Typography>
            </Box>
        </Box>)
}

export default CurrentStatisticItem