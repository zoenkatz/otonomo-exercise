import './App.scss'
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import LazyLoad from 'react-lazyload';
import generateCarData from './api/data-generator';
import createStreamerFrom from './api/streamer'
import type { CarData } from "./api/data-generator";
import Input from "./components/Input";
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import LevelBar from './components/LevelBar'
import VinEvent from './components/VinEvent'
import AddedVin from './components/AddedVin'

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
  const streamer = useCallback((vin) => {
      return createStreamerFrom(() => generateCarData(vin))}, []);


  useEffect(() => {
    if(carData && carData.vin){
      setVinStreamerEvents([carData, ...vinsStreamerEvents]);
    }
  }, [carData])


  const handleCheckingVin = useCallback(async (e, index) => {
    const changedVin = {...addedVins[index], isChecked: e.target.checked};
    if(e.target.checked){
      const newStreamer = await streamer(changedVin.vin);
      newStreamer.subscribe(setCarData);
      newStreamer.start();
    }
    setAddedVins([...addedVins.slice(0, index), changedVin ,...addedVins.slice(index +1)] )
  }, [addedVins, streamer]);

  const [isFilteredFuel, setIsFilteredFuel] = useState(false);

  const getRandomColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

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
      return vinsStreamerEvents.filter(streamEvent => streamEvent.fuel < 0.15 && addedVins.find(addedVin => addedVin.vin === streamEvent.vin && addedVin.isChecked));
    }
    return vinsStreamerEvents.filter(streamEvent => addedVins.find(addedVin => addedVin.vin === streamEvent.vin && addedVin.isChecked));
  }, [isFilteredFuel, vinsStreamerEvents, addedVins]);


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
