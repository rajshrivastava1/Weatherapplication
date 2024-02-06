// Import necessary dependencies from React
import { useRef, useState } from "react";

// OpenWeatherMap API key
const Api_key = "5c86490ff1685b81ccc2dcc182a48a32";

// Define the Dashboard component
const Dashboard = () => {

  // Create a reference for the input field
  const inputRef = useRef(null);

  // State variables to store API data, weather display, and loading status
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

 // Weather types with corresponding icons
  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/4088/4088981.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/1409/1409305.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1779/1779807.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/6966/6966907.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005817.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/2675/2675876.png",
    },
    {
      type: "Fog",
      img: "https://cdn-icons-png.flaticon.com/512/6183/6183210.png",
    },
  ];

   // Function to fetch weather data from OpenWeatherMap API
  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);

    // Fetch data from the API
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);

        // Handle cases where location is not found or there is an error
        // eslint-disable-next-line eqeqeq
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/9841/9841569.png",
            },
          ]);
        }
        // Filter weather types based on API response
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);

         // Set API data and update loading status
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Return the JSX for rendering the Dashboard component
  return (
    <div
      className="bg-custom-image bg-cover h-screen grid place-items-center"
      style={{
        backgroundImage: 'url("https://wallpaperaccess.com/full/1323936.jpg")',
      }}
    >
        <h1 className="text-6xl font-bold text-sky-400 absolute top-4 left-12">
          WEATHER FORECAST
        </h1>
        <h1 className="text-3xl text-white absolute top-20 left-28">
        for today and during the weekend...
        </h1>
        <h1 className="text-md text-gray-300 absolute bottom-0 right-2">
        @designed & developed by Raj Shrivastava
        </h1>
      <div className="bg-white w-80 p-4 rounded-3xl border border-blue-800">
        <div className="flex items-center justify-between">

         {/* Input field for location */}
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl
           font-semibold uppercase flex outline-none"
          />

           {/* Button to trigger weather data fetching */}
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2623/2623825.png"
              alt="..."
              className="w-8 ml-2"
            />
          </button>
        </div>

         {/* Display weather information */}
        <div
          className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}
        >
          {loading ? (

             // Show loading spinner while fetching data
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/13552/13552168.png"
                alt="..."
                className="w-24 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (

            // Display weather information when data is available
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (

                  // Display location information
                  <p className="text-xl font-semibold">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}

                {/* Display weather icon */}
                <img
                  src={showWeather[0]?.img}
                  alt="..."
                  className="w-52 mx-auto"
                />

                {/* Display weather type */}
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </h3>

                {apiData && (

                   // Display temperature information
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1850/1850753.png"
                        alt="..."
                        className="h-9 mt-1"
                      />
                      <h2 className="text-4xl font-extrabold">
                        {apiData?.main?.temp}&#176;C
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// Export the Dashboard component
export default Dashboard;
