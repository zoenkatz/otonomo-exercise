import './App.scss'
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import generateCarData from './api/data-generator';
import createStreamerFrom from './api/streamer'
import type { CarData } from "./api/data-generator";
import Input from "./components/Input";
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import VinEvent from './components/VinEvent'
import AddedVin from './components/AddedVin';
import {getRandomColor} from "./Utils/UtilsFunctions";

export interface CarDataCheck {
  vin: string
  timestamp: any
  fuel: number
  wiperFluid: number
  location: {
    lat: number
    lng: number
  },
  isChecked: boolean
  color: string

}

const App = () => {
  const [carData, setCarData] = useState( {
    vin: '',
      timestamp:0,
      fuel: 0,
      wiperFluid: 0,
      location: {
        lat: 0,
        lng: 0
      },
  });
  const [addedVin, setAddedVin] = useState("");
  const [addedVins, setAddedVins] = useState<Array<CarDataCheck>>([]);
  const [vinsStreamerEvents, setVinStreamerEvents] = useState<Array<CarData>>([]);
    const [streamersCache, setStreamersCache] = useState<Array<any>>([]);
  const streamer = useCallback((vin) => {
      return createStreamerFrom(() => generateCarData(vin))}, []);


  useEffect(() => {
    if(carData && carData.vin){
      setVinStreamerEvents([carData, ...vinsStreamerEvents]);
    }
  }, [carData])

  useEffect(() => {

    return () => {
      streamersCache.forEach(streamerItem => {
        streamerItem.streamer.stop();
        streamerItem.streamer.removeHandler(setCarData);
      })
    }
  }, [])


  const handleCheckingVin = useCallback(async (e, index) => {
    const changedVin = {...addedVins[index], isChecked: e.target.checked};
    const foundStreamer = streamersCache.find(stream => stream.vin === changedVin.vin);
    if(e.target.checked &&  !foundStreamer){
      const newStreamer = await streamer(changedVin.vin);
      newStreamer.subscribe(setCarData);
      newStreamer.start();
      setStreamersCache([...streamersCache, {streamer: newStreamer, vin: changedVin.vin}]);
    }
    else if(e.target.checked){
      foundStreamer.streamer.start();
    }
    else{
      foundStreamer.streamer.stop();
    }
    setAddedVins([...addedVins.slice(0, index), changedVin ,...addedVins.slice(index +1)] )
  }, [addedVins, streamer, streamersCache, streamersCache]);

  const [isFilteredFuel, setIsFilteredFuel] = useState(false);



  const handleAddingVin = useCallback(() => {
   const newVin = {
      vin: addedVin,
      timestamp:0,
      fuel: 0,
      wiperFluid: 0,
      location: {
      lat: 0,
        lng: 0
      },
      isChecked: false,
      color: getRandomColor()
    };

    setAddedVins([...addedVins, newVin])
  }, [addedVins, addedVin]);


  const filteredVinsStreamerEvents = useMemo(() => {
    if(isFilteredFuel){
      return vinsStreamerEvents.filter(streamEvent => streamEvent.fuel < 0.15);
    }
    return vinsStreamerEvents;
  }, [isFilteredFuel, vinsStreamerEvents]);


  return (
    <div className="vin-app">
        <div className="vin-add-select">
          <div className="vin-add">
            <Input onChange={(e: any) => setAddedVin(e.target.value)}/>
            <Button onClick={handleAddingVin}>{"+ Add"}</Button>
          </div>
          <div className="vin-selected-list">
            {addedVins.map((addedVin, index) => {
              return <AddedVin key={index} addedVin={addedVin} handleCheckingVin={handleCheckingVin} index={index}/>
            })}
          </div>
        </div>
        <div className="vin-events">
          <div className="vin-events-filter-fuel">
            <Checkbox onChange={(e: any) => setIsFilteredFuel(e.target.checked)}/>
            <label>Filter events where fuel level is under 15%</label>
          </div>
          <div className="vin-events-chosen">
            {filteredVinsStreamerEvents.map((streamEvent, index) => {
              return (
               <VinEvent key={index} streamEvent={streamEvent} addedVins={addedVins}/>
              )
            })
            }
          </div>
        </div>
    </div>
  )
}

export default App
