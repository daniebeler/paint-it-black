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

  const arcs = [
    {
      startLat: 40.63980103,
      startLng: -73.77890015,
      endLat: 50.033333,
      endLng: 8.570556,
      color: 'red'
    },
    {
      startLat: 47.464699,
      startLng: 8.54917,
      endLat: 51.4706,
      endLng: -0.461941,
      color: 'red'
    },
    {
      startLat: 47.464699,
      startLng: 8.54917,
      endLat: 45.5175018311,
      endLng: -73.4169006348,
      color: 'red'
    },
    {
      startLat: 47.464699,
      startLng: 8.54917,
      endLat: 41.8002778,
      endLng: 12.2388889,
      color: 'red'
    },
    {
      startLat: 41.8002778,
      startLng: 12.2388889,
      endLat: 47.464699,
      endLng: 8.54917,
      color: 'red'
    }
  ]

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



  const countryClicked = useCallback(
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
          backgroundColor="#a9def9"
          globeImageUrl="/bg.png"
          showGlobe={true}
          showAtmosphere={true}
          polygonsData={countries.features}
          polygonCapColor={(d: any) =>
            countriesIsoCodes.includes(d.properties.ISO_A3) ? "black" : "white"
          }
          polygonSideColor={() => "rgba(0, 0, 0, 0)"}
          polygonAltitude={0.01}
          polygonStrokeColor={() => "#283618"}
          onPolygonClick={countryClicked}
          arcsData={arcs}
          arcColor={['#ffb703', '#ffb703']}
          arcDashLength={0.5}
          arcDashGap={1}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
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
