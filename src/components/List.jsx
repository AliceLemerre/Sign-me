import getVideoUrl from "./getVideoUrl";
import getImageUrl from "./getImageUrl";
import Checkbox from "./checkbox";
import { signImages } from './signImages';
import { useState } from "react";
import { sign } from "./signList";



 export default function List({ selectedConfigs, selectedConfigsTwo }) {


  const matches = (config, selected) => {
    if (selected.length === 0) return true;
    const values = Array.isArray(config) ? config : [config];
    return values.some(v => selected.includes(v));
  };

  const filteredSigns = sign.filter(s =>
    matches(s.configuration, selectedConfigs) &&
    matches(s.configurationTwo, selectedConfigsTwo)
  );

  const listItems = filteredSigns.map(signVid =>
    <li key={signVid.id} className="signs-videos-list">
      <video autoPlay loading="lazy" className="sign-video" playsInline controls>
        <source src={getVideoUrl(signVid)} type="video/mp4"/>
        Votre navigateur ne prend pas en charge les vidéos
      </video>
      
  
      <p>
        <b>{signVid.word}</b>
          {/* {' ' + signVid.type + ' '} */}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}



  // (signVid.configuration == signImage.checked.configuration)
