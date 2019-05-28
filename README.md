# Neat Maps

App is designed to allow users to upload CSV files with 5 columns containing US addresses and then display those addresses using Google Maps API, categorizing markers by colour.

The App also has basic protection against anonymous users using Neat API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Current Functionality

### App's Current State:<br>

1. Contains login "protection" against anonymous users using registered Neat API users
2. User can upload CSV file with five columns of up to 20 rows of information (no hard limit set on number of rows). Data works for US addresses
   - Current limitation is that CSV **must be formated** in column order of `[CATEGORY, ADDRESS, CITY, STATE, ZIPCODE]`. **Ability to specify column headers not yet implemented**
3. Once the CSV file has been uploaded, a map will be rendered showing all data points, colour coded by each unique Category. Users can click on each point to reveal an info window with basic information
   - Limitation of colour palette limits number of unique coloured categories to 10. Additional marker colours/shapes from different sources can be added if need be
4. User can rerun CSV upload and render new map, as plot points are reset on each new render
   - **Storing recent upload feature not yet implemented.** Trying to figure out how to implement without using a backend server. Maybe by storing uploaded data into separate properties, then rendering map based on selected state property

### Additional Notes:

- **Tests have not yet been written**
- Tweaked code of [@vtex/react-csv-parser](https://github.com/oleung4/react-csv-parse) was not working via `yarn install github:repo`, so `CsvParse` code was imported into `./utils` folder
- With the current re-rendering logic of the Map component, I receive the following warning:

  > You have included the Google Maps JavaScript API multiple times on this page. This may cause unexpected errors.

  For the time being, it does not appear to break my code/cause any major spikes in API calls. Will look into issue later. Maybe something to do with how I call `renderMap()` and `initMap()`. Occurs when loading new map points

---

## How To Run

In the project directory, to get things running:

### `yarn install`

To install all app dependencies.

### `.env`

Create a `.env` file in the root directory.<br>
Add the following `REACT_APP_GOOGLE_MAPS_KEY=YOUR_API_KEY_HERE` with your own Google Maps API key.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `login`

User should be able to login using any registered Neat API account.<br>
Feel free to use testy@testy.com // 123456 if you do not have access to credentials.

### `demo csv`

Use the file [north.csv](./north.csv) to test the map function.<br>
Given current upload limitation, this file should also be used as a formatting reference for own files.
