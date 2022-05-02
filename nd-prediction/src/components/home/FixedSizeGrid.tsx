import React from 'react';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { WeatherData } from '../../types/weather';

const gridColumnsData: GridColDef[] = [
  { 
    field: 'dt', 
    headerName: 'Дата/Время', 
    width: 210 
  },
  {
    field: 'temp',
    headerName: 'Температура',
    type: 'number',
    width: 210,
  },
  {
    field: 'humidity',
    headerName: 'Влажность',
    type: 'number',
    width: 210,
  },
  {
    field: 'wind_speed',
    headerName: 'Скорость ветра',
    type: 'number',
    width: 210,
  },
  {
    field: 'pressure',
    headerName: 'Атмосферное давление',
    type: 'number',
    width: 210,
  },
  {
    field: 'dew_point',
    headerName: 'Температура в точке росы',
    type: 'number',
    width: 210,
  },
]

export type FixedSizeGridProps = {
  rows: WeatherData[]
}


const FixedSizeGrid: React.FC<FixedSizeGridProps> = (props) => {
  return (
    <Box textAlign={'center'} height={650} width={'100%'}>
      <DataGrid {...props} pageSize={10} columns={gridColumnsData} rows={props.rows} getRowId={(row) => row.dt}/>
    </Box>
  );
}

export default FixedSizeGrid