import { CarDataCheck } from '../App';

export  const getColorByVin = (addedVins: Array<CarDataCheck>, vin: string) => {
  const foundedVin = addedVins.find(addedVin => addedVin.vin === vin);
  return foundedVin ?foundedVin.color : '#000';
}
