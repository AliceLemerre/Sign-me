import React, { Component } from 'react';
import getImageUrl from "./getImageUrl";
import { signImages } from '../signImages';
import Checkbox from './checkbox';


  export default function CheckboxTwo({ selectedConfigs, setSelectedConfigs }) {

  function handleChange(config) {
    if (selectedConfigs.includes(config)) {
      setSelectedConfigs(selectedConfigs.filter(c => c !== config));
    } else {
      setSelectedConfigs([...selectedConfigs, config]);
    }
  }

    const checkboxesOne = signImages.map(signImg =>
    <li key={signImg.id} className="hand-image-list-item">

      <input 
      type="checkbox"
      id={signImg.configuration}
      onChange={() => handleChange(signImg.configuration)}
       checked={selectedConfigs.includes(signImg.configuration)}  
      />

      <label htmlFor={signImg.configuration}>
        <img src={getImageUrl(signImg)} />
        {signImg.configuration}
      </label>
  
    </li>
    );
    const checkboxesTwo = signImages.map(signImg =>
    <li key={signImg.id} className="hand-image-list-item">

      <input 
      type="checkbox"
      id={signImg.configurationTwo}
      onChange={() => handleChange(signImg.configurationTwo)}
       checked={selectedConfigs.includes(signImg.configurationTwo)}  
      />

      <label htmlFor={signImg.configurationTwo}>
        <img src={getImageUrl(signImg)} />
        {signImg.configurationTwo}
      </label>
  
    </li>
    );


  return <div><ul>{checkboxesOne}</ul> <ul>{checkboxesTwo}</ul></div>;

  }