import { CarDataCheck } from '../App';

export const getColorByVin = (addedVins: Array<CarDataCheck>, vin: string) => {
  const foundedVin = addedVins.find(addedVin => addedVin.vin === vin);
  return foundedVin ?foundedVin.color : '#000';
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


