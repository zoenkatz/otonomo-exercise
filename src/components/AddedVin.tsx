import React from 'react';
import Checkbox from './Checkbox'
import { CarDataCheck } from '../App'

interface AddedVinProps {
  addedVin: CarDataCheck,
  index: number,
  handleCheckingVin: any
}

const AddedVin = ({addedVin, handleCheckingVin, index}: AddedVinProps) => {
  return (
    <div className="vin-item">
      <Checkbox checked={addedVin.isChecked} onChange={(e: any) => handleCheckingVin(e, index)}/>
      <label style={{color: addedVin.color}}>{addedVin.vin}</label>
    </div>
  )
}

export default AddedVin;
