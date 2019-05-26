import React, { Component } from "react";
import Geocode from "react-geocode";

var apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

Geocode.setApiKey(apiKey);
Geocode.enableDebug();

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPoints: ["testing", "testing1"]
    };
  }

  // componentDidMount() {
  //   this.renderMap();
  // }

  componentDidUpdate(prevProps) {
    if (this.props.addresses !== prevProps.addresses) {
      console.log("component is updated: ", this.props.addresses);
      // timing issue - on initial render, state is empty until user uploads csv

      const { addresses } = this.props; // destructuring for readability
      let mapPoints = [];

      addresses.map(address => {
        Geocode.fromAddress(address.address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            // console.log(lat, lng);
            var points = { lat, lng };

            mapPoints.push({
              address,
              points
            });
          },
          error => {
            console.error(error);
          }
        );
        return mapPoints;
      });
      this.setState(
        {
          mapPoints
        },
        // callback to fire after state set
        this.renderMap
      );
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
