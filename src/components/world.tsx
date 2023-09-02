"use client";

import Storage from "@/services/storage.service";
import { useEffect, useState } from "react";
import WorldMap, { DataItem, ISOCode } from "react-svg-worldmap";
import Popup from "./popup";

const World = () => {
  const [popup, setPopup] = useState<boolean>();
  const [countryData, setCountryData] = useState<DataItem<string>[]>();

  useEffect(() => {

    const dataFromStorage: ISOCode[] | null = Storage.getData();

    console.log("datafromstorage", dataFromStorage);

    console.log("countries");

    if (dataFromStorage) {
      const newData: DataItem<string>[] = dataFromStorage.map(
        (countryf: ISOCode) => {
          return {
            country: countryf,
            value: "lul",
          } as DataItem<string>;
        }
      );

      console.log(newData);

      setCountryData(newData);
    }
  }, []);

  const countryClicked = () => {
    console.log("fief");
    setPopup(true);
  };

  const saveCountry = (isoCode: ISOCode) => {
    let countryList: string[] = Storage.getData()
    countryList.indexOf(isoCode) === -1 ? countryList.push(isoCode) : console.log("mehege")
    Storage.storeData(countryList)
    setPopup(false)
  }

  return (
    <>
      <div className="w-screen h-screen">
        {countryData ? (
          <WorldMap
            color="#000"
            title="Top 10 Populous Countries"
            value-suffix="people"
            size="responsive"
            data={countryData}
            onClickFunction={countryClicked}
          />
        ) : (
          <></>
        )}
      </div>

      {popup ? (
        <Popup>
          <div>Do you want to paint Austria black?</div>
          <button onClick={() => setPopup(false)}>
            close
          </button>
          <button onClick={() => saveCountry("IT")}>
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
