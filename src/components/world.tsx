"use client";

import Storage from "@/services/storage.service";
import { useCallback, useEffect, useState } from "react";
import WorldMap, { CountryContext, DataItem, ISOCode } from "react-svg-worldmap";
import Popup from "./popup";

const World = () => {
  const [popup, setPopup] = useState<boolean>();
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
    setPopup(true);
    setClickedCountry(country);
  };

  const saveCountry = (isoCode: ISOCode) => {
    let countryList: string[] = countriesIsoCodes;
    countryList.indexOf(isoCode) === -1
      ? countryList.push(isoCode)
      : console.log("mehege");
    Storage.storeData(countryList);
    setPopup(false);
  };

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

      {popup ? (
        <Popup>
          <div>Do you want to paint {clickedCountry?.countryName} black?</div>
          <button onClick={() => setPopup(false)}>close</button>
          <button onClick={() => saveCountry(clickedCountry!.countryCode)}>yes</button>
        </Popup>
      ) : (
        <></>
      )}
    </>
  );
};

export default World;
