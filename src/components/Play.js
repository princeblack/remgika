import React, { Component } from "react";
import link from "../img/link.svg";
import unlink from "../img/unlink.svg";
import map from '../img/map.svg'
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import PlayImage from "./PlayImage";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0,
      lng: null,
      lat: null
    };
    this.createChildren = this.createChildren.bind(this);
    this.changeActiveItem = this.changeActiveItem.bind(this);
    this.handlePlace = this.handlePlace.bind(this);
  }
  toggleSidebar = e => {
    const sidebar = document.querySelector(".mapImage");
    sidebar.classList.toggle("mapImage-cover");
    console.log('i toggle');
    
  };
  handlePlace() {
    getGeocode({
      address: this.props.data.street + " " + this.props.data.postalCode
    })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          lat: lat,
          lng: lng
        });
        //  console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch(error => {
        console.log("😱 Error: ", error);
      });
  }
  createChildren = n =>
    range(n).map(i => (
      <div key={i} style={{ height: 200, background: "#333" }}>
        {i}
      </div>
    ));
  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });
  render() {
    this.handlePlace();
    const chevronWidth = 40;
    const { activeItemIndex, children } = this.state;
    const image = this.props.data.imgCollection.map((el, index) => {
      return <PlayImage data={el} key={index}></PlayImage>;
    });
    const mapStyles = {
      width: "100%",
      height: "100%",
      display: "flex" ,
    };
    return (
      <div className="playgroud-item">
        <div className="userVote">
          <img src={link} alt="like"></img>
          <img src={unlink} alt="unlike"></img>
        </div>
        <ItemsCarousel
          enablePlaceholder
          requestToChangeActive={this.changeActiveItem}
          activeItemIndex={activeItemIndex}
          numberOfCards={1}
          gutter={12}
          outsideChevron={false}
          chevronWidth={chevronWidth}
        >
          {image}
        </ItemsCarousel>
        <div className="addressItem">
          <div className="address">
            <span>Place:</span>
            <p>{this.props.data.street}</p>
          </div>
          <div className="addressDistance">
            <span>Distance:</span>
            <p>15km </p>
          </div>
        </div>
        <div className="description">
          <p>{this.props.data.description}</p>
        </div>
        <div className="mapLogo">
          <img src={map} alt="map" onClick={this.toggleSidebar}></img>
        </div>

        {this.state.lng !== null && (
          <Map
            className="mapImage"
            google={this.props.google}
            zoom={15}
            style={mapStyles}
            initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
          >
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
          </Map>
        )}
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI"
})(Play);
