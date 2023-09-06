"use client";

import Storage from "@/services/storage.service";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useEffect, useState } from "react";
import Popup from "./popup";

const World = () => {
  const [addPopup, setAddPopup] = useState<boolean>();
  const [removePopup, setRemovePopup] = useState<boolean>();
  const [clickedCountry, setClickedCountry] =
    useState<string>();
  const [countriesIsoCodes, setCountriesIsoCodes] = useState<string[]>([]);

  useEffect(() => {
    const dataFromStorage: string[] | null = Storage.getData();

    console.log("datafromstorage", dataFromStorage);

    console.log("countries");

    if (dataFromStorage) {
      setCountriesIsoCodes(dataFromStorage);
    }
  }, []);

  const countryClicked = (country: string) => () => {
    console.log(country);
    if (countriesIsoCodes.indexOf(country) === -1) {
      setAddPopup(true);
      setClickedCountry(country);
    } else {
      setRemovePopup(true);
      setClickedCountry(country);
    }
  };

  const saveCountry = (isoCode: string) => {
    let countryList: string[] = countriesIsoCodes;
    countryList.push(isoCode);
    Storage.storeData(countryList);
    setCountriesIsoCodes(countryList);
    setAddPopup(false);
  };

  const removeCountry = (isoCode: string) => {
    console.log(isoCode);
    let countryList: string[] = countriesIsoCodes;
    countryList = countryList.filter((country: string) => country !== isoCode);
    Storage.storeData(countryList);
    setCountriesIsoCodes(countryList);
    setRemovePopup(false);
  };

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  return (
    <>
      <div className="w-[80vw] h-[80vh]">
        {countriesIsoCodes ? (
          <ComposableMap projection="geoMercator">
            <ZoomableGroup center={[0, 0]} zoom={9}>
              <Geographies geography={geoUrl} stroke="red"
        strokeWidth={0.3}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography 
                    key={geo.rsmKey} 
                    geography={geo} 
                    fill={countriesIsoCodes.includes(geo.id) ? "black" : "white" }
                    onClick={countryClicked(geo.id)}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        ) : (
          <></>
        )}
      </div>

      {addPopup ? (
        <Popup>
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div>Do you want to paint {clickedCountry} black?</div>

            <div>
              <button onClick={() => setAddPopup(false)}>close</button>
              <button onClick={() => saveCountry(clickedCountry!)}>
                yes
              </button>
            </div>
          </div>
        </Popup>
      ) : (
        <></>
      )}
      {removePopup ? (
        <Popup>
          <div>Do you want to remove {clickedCountry}</div>
          <button onClick={() => setRemovePopup(false)}>close</button>
          <button
            className="bg-red-500"
            onClick={() => removeCountry(clickedCountry!)}
          >
            yes
          </button>
        </Popup>
      ) : (
        <></>
      )}
    </>
  );
};

export default World;
