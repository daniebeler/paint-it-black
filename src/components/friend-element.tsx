"use client"

import { useEffect, useState } from "react";
import Globe from "react-globe.gl"

interface FriendElementProps{
    friend: IFriend
}


const FriendElement = (props: FriendElementProps) => {

    const [countries, setCountries] = useState({ features: [] });

    useEffect(() => {
    
        fetch("../datasets/ne_110m_admin_0_countries.geojson")
          .then((res) => res.json())
          .then(setCountries);
      }, []);

    return (
        <>
        <div>
            {
                props.friend.name
            }
        </div>

        <div>
        <Globe
          backgroundColor="#a9def9"
          width={200}
          height={200}
          globeImageUrl="/bg.png"
          showGlobe={true}
          showAtmosphere={true}
          polygonsData={countries.features}
          polygonCapColor={(d: any) =>
            props.friend.countries.includes(d.properties.ISO_A3) ? "black" : "white"
          }
          polygonSideColor={() => "rgba(0, 0, 0, 0)"}
          polygonAltitude={0.01}
          polygonStrokeColor={() => "#283618"}
          arcsData={props.friend.arcs}
          arcColor={['#ffb703', '#ffb703']}
          arcDashLength={0.5}
          arcDashGap={1}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
        />
        </div>
        </>
    )
}

export default FriendElement