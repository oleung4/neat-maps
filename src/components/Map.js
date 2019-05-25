import React, { Component } from "react";
import Geocode from "react-geocode";

var apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPoints: []
    };
  }
  componentDidMount() {
    this.renderMap();
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
