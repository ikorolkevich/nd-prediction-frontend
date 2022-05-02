import React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Animation, PathFn, PathPoints, PointComponentProps, FactoryFn, ScaleObject } from '@devexpress/dx-react-chart';
import { DynamicPoint } from '../../types/weather';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';


const Line: React.FC<LineSeries.PathSeriesProps> = (props) => {
  // let path: PathFn = line<PointComponentProps>().x((d: PointComponentProps) => {return d.arg}).y((d: PointComponentProps) => {return d.val}).curve(curveCatmullRom) as any; 
  return (
    <LineSeries.Path
      {...props}
      // path={path}
    />
  )
}

export type ChartSplineProps = {
  height: number
  data: DynamicPoint[]
  valueField: string
  argumentField: string
}

const ChartSpline: React.FC<ChartSplineProps> = (props) => {
  return (
      <Chart height={props.height}
        data={props.data}
      >
        <ArgumentScale factory={scalePoint as any}/>
        <ArgumentAxis />
        <ValueAxis/>

        <LineSeries
          valueField={props.valueField}
          argumentField={props.argumentField}
          seriesComponent={Line}
        />
        <Animation />
      </Chart>
  );
}

export default ChartSpline