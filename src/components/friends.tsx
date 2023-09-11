import FriendElement from "./friend-element";

const Friends = () => {
  const friendsData: IFriend[] = [
    {
      name: "Emanuel Hiebeler",
      countries: ["AUT"],
      arcs: [
        {
          startLat: 40.63980103,
          startLng: -73.77890015,
          endLat: 50.033333,
          endLng: 8.570556,
        },
        {
          startLat: 47.464699,
          startLng: 8.54917,
          endLat: 51.4706,
          endLng: -0.461941,
        },
      ],
    },
    {
        name: "Luca Kessler",
        countries: ["AUT", 'ITA'],
        arcs: [
          {
            startLat: 40.63980103,
            startLng: -73.77890015,
            endLat: 50.033333,
            endLng: 8.570556,
          },
          {
            startLat: 47.464699,
            startLng: 8.54917,
            endLat: 51.4706,
            endLng: -0.461941,
          },
        ],
      }
  ];

  return (
    <>
      <div>
        <h1>Friends</h1>
      </div>
      <div className="flex">
        {friendsData.map((item: IFriend) => {
          return (
            <div key={item.name} className="">
              <FriendElement friend={item} />
            </div>
          );
        })}

        <div className="flex-initial w-64 ...">02</div>
        <div className="flex-initial w-32 ...">03</div>
      </div>
    </>
  );
};

export default Friends;
