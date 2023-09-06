"use client";

import Storage from "@/services/storage.service";
import { useCallback, useEffect, useState } from "react";
import Popup from "./popup";
import Globe from "react-globe.gl";

const World = () => {
  const [addPopup, setAddPopup] = useState<boolean>();
  const [removePopup, setRemovePopup] = useState<boolean>();
  const [clickedCountry, setClickedCountry] = useState<string>();
  const [countriesIsoCodes, setCountriesIsoCodes] = useState<string[]>([]);

  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    const dataFromStorage: string[] | null = Storage.getData();

    console.log("datafromstorage", dataFromStorage);

    console.log("countries");

    if (dataFromStorage) {
      setCountriesIsoCodes(dataFromStorage);
    }

    fetch("../datasets/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  const countryClicked = (country: any, lat: any) => () => {
    //iso1A2Code([-4.5, 54.2]);
    console.log("fief");
    if (countriesIsoCodes.indexOf(country) === -1) {
      setAddPopup(true);
      setClickedCountry(country);
    } else {
      setRemovePopup(true);
      setClickedCountry(country);
    }
  };

  const emitArc = useCallback(
    (poly, event, { lat: endLat, lng: endLng }) => {
      console.log(poly);
      console.log(countriesIsoCodes);
      if (countriesIsoCodes.indexOf(poly.properties.ISO_A3) === -1) {
        setAddPopup(true);
        setClickedCountry(poly.properties.ISO_A3);
      } else {
        setRemovePopup(true);
        setClickedCountry(poly.properties.ISO_A3);
      }
    },
    [countriesIsoCodes]
  );

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

  return (
    <>
      <div>
        <Globe
          backgroundColor="white"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          showGlobe={true}
          showAtmosphere={false}
          polygonsData={countries.features}
          polygonCapColor={(d: any) =>
            countriesIsoCodes.includes(d.properties.ISO_A3) ? "black" : "white"
          }
          polygonSideColor={() => "rgba(0, 0, 0, 0)"}
          polygonStrokeColor={() => "red"}
          onPolygonClick={emitArc}
        />
      </div>

      {addPopup ? (
        <Popup>
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div>Do you want to paint {clickedCountry} black?</div>

            <div>
              <button onClick={() => setAddPopup(false)}>close</button>
              <button onClick={() => saveCountry(clickedCountry!)}>yes</button>
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
