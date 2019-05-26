import React, { Component } from "react";
import Geocode from "react-geocode";

var apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

Geocode.setApiKey(apiKey);
Geocode.enableDebug(false);

export class Map extends Component {
  constructor(props) {
    super(props);
    this.mapMarkers = [];
  }

  componentDidUpdate(prevProps) {
    if (this.props.addresses !== prevProps.addresses) {
      console.log("component is updated: ", this.props);
      // timing issue - on initial render, state is empty until user uploads csv
      this.renderMap();
    }
  }

  renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    // need to add 'window.' to fix undefined error
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });

    const { addresses, categories } = this.props; // destructuring for readability

    // categories passed through as props, then create a new array with unique values
    var uniqueCategories = [...new Set(categories)];
    console.log(uniqueCategories);
    // switch statement for color coding markers
    var iconBase = "http://labs.google.com/ridefinder/images/";
    const icons = category => {
      switch (category) {
        case uniqueCategories[0]:
          return `${iconBase}mm_20_red.png`;
        case uniqueCategories[1]:
          return `${iconBase}mm_20_green.png`;
        case uniqueCategories[2]:
          return `${iconBase}mm_20_orange.png`;
        case uniqueCategories[3]:
          return `${iconBase}mm_20_purple.png`;
        case uniqueCategories[4]:
          return `${iconBase}mm_20_white.png`;
        case uniqueCategories[5]:
          return `${iconBase}mm_20_yellow.png`;
        case uniqueCategories[6]:
          return `${iconBase}mm_20_black.png`;
        case uniqueCategories[7]:
          return `${iconBase}mm_20_blue.png`;
        case uniqueCategories[8]:
          return `${iconBase}mm_20_brown.png`;
        case uniqueCategories[9]:
          return `${iconBase}mm_20_gray.png`;
        default:
          console.log("Something went wrong");
          break;
      }
    };

    addresses.map(address => {
      Geocode.fromAddress(address.address).then(
        response => {
          // console.log(address.category);
          const { lat, lng } = response.results[0].geometry.location;
          var points = { lat, lng };
          // creating the marker for the map
          var mapMarker = new window.google.maps.Marker({
            title: address.category,
            position: points,
            icon: {
              url: icons(address.category)
            },
            map
          });

          this.mapMarkers.push(mapMarker);
        },
        error => {
          console.error(error);
        }
      );
      return this.mapMarkers;
    });
    // console.log(this.mapMarkers);
    // console.log(categories);
  };

  render() {
    return (
      <div className="row">
        <div id="map" />
      </div>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Map;
