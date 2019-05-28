# Neat Maps

App is designed to allow users to upload CSV files with 5 columns containing US addresses and then display those addresses using Google Maps API, categorizing markers by colour.

The App also has basic protection against anonymous users using Neat API.

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
