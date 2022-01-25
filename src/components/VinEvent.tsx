import React from 'react';
import LazyLoad from 'react-lazyload'
import LevelBar from './LevelBar'
import type { CarData } from "../api/data-generator";
import {getColorByVin} from "../Utils/UtilsFunctions";
import { CarDataCheck } from '../App'

interface VinEventProps {
  streamEvent: CarData,
  addedVins: Array<CarDataCheck>
}

const VinEvent = ({streamEvent, addedVins}: VinEventProps) => {
  return  <LazyLoad height={200} offset={[-10, 0]}>
    <div className="vin-event" >
      <div className="vin-event-title" style={{backgroundColor: getColorByVin(addedVins, streamEvent.vin), color: '#fff'}}>{streamEvent.vin}</div>
      <div className="vin-event-details">
        <div className="vin-event-fuel-level vin-event-detail"><label>Fuel Level: </label><LevelBar width={100} fraction={streamEvent.fuel}/></div>
        <div className="vin-event-wiper-fluid vin-event-detail"><label>Wiper Fluid: </label><LevelBar width={100} fraction={streamEvent.wiperFluid}/></div>
        <div className="vin-event-location vin-event-detail"><label>location: </label>{JSON.stringify(streamEvent.location)}</div>
      </div>
    </div>
  </LazyLoad>
};

export default VinEvent
