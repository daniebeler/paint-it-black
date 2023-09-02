"use client"

import WorldMap from "react-svg-worldmap";



const World = () => {

    const data = [
    { country: "cn", value: "1" }, // china
    { country: "in", value: "1311559204" }, // india
    { country: "us", value: "331883986" }, // united states
  ];


    return (
        <div className="w-screen h-screen">
            <WorldMap
        color="#000"
        title="Top 10 Populous Countries"
        value-suffix="people"
        size="responsive"
        data={data}
      />
        </div>
    )
}

export default World;