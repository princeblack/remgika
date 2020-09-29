import React, { Component } from "react";
import link from "../../img/link.svg";
import unlink from "../../img/unlink.svg";
import ItemsCarousel from "react-items-carousel";
import PlayImage from "./PlayImage";
import {  GoogleApiWrapper } from "google-maps-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import AddressInfo from "./AddressInfo";
import { connect } from "react-redux";
import { commentAdd, fetchComment } from "../../actions";
import { NavLink } from "react-router-dom";

const online = window.navigator.onLine

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
      setActiveItemIndex: 0,
      lng: null,
      lat: null,
      userlng: null,
      userlat: null,
      distanceResults: null,
      activeIndex: null,
      activeCommet: null,
      comment: "",
    };
    this.changeActiveItem = this.changeActiveItem.bind(this);
    // this.handlePlace = this.handlePlace.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.toggleCommenter = this.toggleCommenter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.commentOnchange = this.commentOnchange.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {});
    this.handlePlace();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.addComment !== this.props.addComment) {
      this.props.fetchComment();
    }
    if (prevProps.commentIsDelete !== this.props.commentIsDelete) {
      this.props.fetchComment();
    }
  }
  toggleClass(index, e) {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
    });
  }
  toggleCommenter(commet, e) {
    this.setState({
      activeCommet: this.state.activeCommet === commet ? null : commet,
    });
  }
  handlePlace() {
    let userlongitude, userlatitude;
    if (online) {
      navigator.geolocation.getCurrentPosition(function (position) {
        userlongitude = position.coords.latitude;
        userlatitude = position.coords.longitude;
      });
      getGeocode({
        address: this.props.data.street 
      })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          if (lat !== null) {
            this.setState({
              lat: lat,
              lng: lng,
              userlng: userlongitude,
              userlat: userlatitude,
            });
          }
        })
        .catch((error) => {});
    }
  }

  changeActiveItem(activeItemIndex) {
    this.setState({ activeItemIndex });
  }
  commentOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const newData = await {
      content: this.state.comment,
      postId: this.props.data._id,
      firstName: this.props.data.firstName,
      lastName: this.props.data.lastName,
    };
    this.props.commentAdd(newData);
    this.setState({
      comment: "",
    });
  };

  // RENDER
  render() {
    const chevronWidth = 40;
    const activeItemIndex = this.state.activeItemIndex;
    const image = this.props.data.imgCollection.map((el, index) => {
      return <PlayImage data={el} key={index}></PlayImage>;
    });

    return (
      <>
        <div className="playgroud-item">
          <div className="userVote">
            <div className="positif">
              <span>{this.props.data.like}</span>
              <img src={link} alt="like"></img>
            </div>
            <div className="negatif">
              <img src={unlink} alt="unlike"></img>
              <span>{this.props.data.unlike}</span>
            </div>
          </div>
          <div className="image">
            <ItemsCarousel
              enablePlaceholder
              requestToChangeActive={this.changeActiveItem}
              activeItemIndex={activeItemIndex}
              numberOfCards={1}
              gutter={12}
              outsideChevron={false}
              chevronWidth={chevronWidth}
              leftChevron={'<' }
              rightChevron={ '>'}
            >
              {image}
            </ItemsCarousel>
            <div className="info">
              <p className="address">{this.props.data.street}</p>
            </div>
            <div className="dictanceInfo">
              {online && 
                            <AddressInfo
                            google={this.props.google}
                            data={this.state}
                          ></AddressInfo>
              }
            </div>
          </div>
          <div className="title">
            <h3>{this.props.data.title}</h3>
          </div>
          <div className="visite">
            <NavLink to={`/playgroundPage/${this.props.data._id}/playground`}>
              Visit
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}
const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI",
})(Play);

const mapStateToProps = (state) => {
  return {
    allComment: state.allComment,
    addComment: state.addComment,
    commentIsDelete: state.commentIsDelete,
    allUserInfo: state.allUserInfo,
    writerImg: state.writerImg,
  };
};

 export default connect(mapStateToProps, {
  commentAdd,
  fetchComment,
})(online? WrappedContainer : Play) 

