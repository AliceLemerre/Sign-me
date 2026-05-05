import React from 'react';
import getImageUrl from "./getImageUrl";
import { signImages } from './signImages';
import '../../src/App.css'
import '../../src/index.css'

export default function Checkbox({ selectedConfigs, setSelectedConfigs, prefix }) {

  function handleChange(config) {
    if (selectedConfigs.includes(config)) {
      setSelectedConfigs(selectedConfigs.filter(c => c !== config));
    } else {
      setSelectedConfigs([...selectedConfigs, config]);
    }
  }

  return (
    <ul className="configurations-list">
      {signImages.map(signImg => (
        <li key={signImg.id} className="hand-image-list-item">
          <input
            type="checkbox"
            id={`${prefix}-${signImg.id}`}
            onChange={() => handleChange(signImg.configuration)}
            checked={selectedConfigs.includes(signImg.configuration)}
          />
          <label htmlFor={`${prefix}-${signImg.id}`}>
            <img src={getImageUrl(signImg)} />
            {signImg.configuration}
          </label>
        </li>
      ))}
    </ul>
  );
}