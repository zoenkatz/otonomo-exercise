import './SelectBox.scss'
import React from 'react';
import Select from 'react-select';

const SelectBox = ({ className='', defaultOption="", isDisabled=false, isLoading=false, isClearable=false, isRtl=false, isSearchable=false, options= [""]}) => {
  return <Select
    className="basic-single"
    classNamePrefix="select"
    defaultValue={defaultOption}
    isDisabled={isDisabled}
    isLoading={isLoading}
    isClearable={isClearable}
    isRtl={isRtl}
    isSearchable={isSearchable}
    name="color"
    options={options}
  />
}

export default SelectBox
