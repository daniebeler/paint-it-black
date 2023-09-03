"use client";

import Storage from "@/services/storage.service";
import { useCallback, useEffect, useState } from "react";
import WorldMap, { CountryContext, DataItem, ISOCode } from "react-svg-worldmap";
import Popup from "./popup";

const World = () => {
  const [addPopup, setAddPopup] = useState<boolean>();
  const [removePopup, setRemovePopup] = useState<boolean>();
  const [clickedCountry, setClickedCountry] = useState<CountryContext<string>>();
  const [countriesIsoCodes, setCountriesIsoCodes] = useState<ISOCode[]>([]);

  useEffect(() => {
    const dataFromStorage: ISOCode[] | null = Storage.getData();

    console.log("datafromstorage", dataFromStorage);

    console.log("countries");

    if (dataFromStorage) {
      setCountriesIsoCodes(dataFromStorage);
    }
  }, []);

  const addValueToCountry = (isoCodes: string[]): DataItem<string>[] => {
    const newData: DataItem<string>[] = isoCodes.map(
      (countryf: ISOCode) => {
        return {
          country: countryf,
          value: "",
        } as DataItem<string>;
      }
    );
    return newData;
  };

  const countryClicked = (country: CountryContext<string>) => {
    console.log(country);
    if (countriesIsoCodes.indexOf(country.countryCode) === -1) {
      setAddPopup(true);
      setClickedCountry(country);
    }else {
     setRemovePopup(true);
     setClickedCountry(country);
    }
    
  };

  const saveCountry = (isoCode: ISOCode) => {
    let countryList: string[] = countriesIsoCodes;
    countryList.push(isoCode)
    Storage.storeData(countryList);
    setCountriesIsoCodes(countryList);
    setAddPopup(false);
  };

  const removeCountry = (isoCode: ISOCode) => {
    console.log(isoCode);
    let countryList: string[] = countriesIsoCodes;
    countryList = countryList.filter((country: string) => country !== isoCode)
    Storage.storeData(countryList);
    setCountriesIsoCodes(countryList);
    setRemovePopup(false);
  }

  return (
    <>
      <div className="w-screen h-screen">
        {countriesIsoCodes ? (
          <WorldMap
            color="#000"
            title="Top 10 Populous Countries"
            value-suffix="people"
            size="responsive"
            data={addValueToCountry(countriesIsoCodes)}
            onClickFunction={(country: CountryContext<string>) => countryClicked(country)}
          />
        ) : (
          <></>
        )}
      </div>

      {addPopup ? (
        <Popup>
          <div>Do you want to paint {clickedCountry?.countryName} black?</div>
          <button onClick={() => setAddPopup(false)}>close</button>
          <button onClick={() => saveCountry(clickedCountry!.countryCode)}>yes</button>
        </Popup>
      ) : (
        <></>
      )}
      {removePopup ? (
        <Popup>
          <div>Do you want to remove {clickedCountry?.countryName}</div>
          <button onClick={() => setRemovePopup(false)}>close</button>
          <button className="bg-red-500" onClick={() => removeCountry(clickedCountry!.countryCode)}>yes</button>
        </Popup>
      ) : (
        <></>
      )}
    </>
  );
};

export default World;
