import React, { Component } from "react";
import link from "../../img/link.svg";
import unlink from "../../img/unlink.svg";
import map from "../../img/map.svg";
import close from "../../img/close.svg";
import feedback from "../../img/feedback.svg";
import ItemsCarousel from "react-items-carousel";
import PlayImage from "./PlayImage";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import AddressInfo from "./AddressInfo";
import { Collapse } from "react-collapse";
import classNames from "classnames";
import { connect } from "react-redux";
import { commentAdd, fetchComment ,writerImage} from "../../actions";
import Comment from "./Comment";

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
    this.handlePlace = this.handlePlace.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.toggleCommenter = this.toggleCommenter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.commentOnchange = this.commentOnchange.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {});
    this.handlePlace();
    this.props.writerImage()
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

    navigator.geolocation.getCurrentPosition(function (position) {
      userlongitude = position.coords.latitude;
      userlatitude = position.coords.longitude;
    });

    getGeocode({
      address: this.props.data.street + " " + this.props.data.postalCode,
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
    };
    this.props.commentAdd(newData);
    this.setState({
      comment: "",
    });
  };

  // RENDER
  render() {
    // console.log(this.state.comment);
    // console.log(this.props.data);
    // console.log(this.props);
    // console.log(this.props.data._id, 'play');
    // // let commentList;
    // commentList = this.props.allComment.map((el, index)=>{
    //   return(
    //     <p comment={el} key={index}></p>
    //   )
    // })
    // const test = commentList
    // console.log(test);
    let commentList;
    commentList = this.props.allComment.map((el, index) => {
      return <Comment key={index} comment={el} data={this.props.data}></Comment>;
    });

    const chevronWidth = 40;
    const activeItemIndex = this.state.activeItemIndex;
    const image = this.props.data.imgCollection.map((el, index) => {
      return <PlayImage data={el} key={index}></PlayImage>;
    });
    const mapStyles = {
      position: "relative",
      width: "100%",
      height: "80%",
    };
    const index = this.props.playIndex;
    const commet = this.props.playIndex;
    return (
      <div className="playgroud-item">
        <div className="userVote">
          <img src={link} alt="like"></img>
          <img src={unlink} alt="unlike"></img>
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
            leftChevron={"<"}
            rightChevron={">"}
          >
            {image}
          </ItemsCarousel>
          <div className="info">
            <p className="address">{this.props.data.street}</p>
          </div>
          <div className="dictanceInfo">
            <AddressInfo
              google={this.props.google}
              data={this.state}
            ></AddressInfo>
          </div>
        </div>
        <div className="title">
          <h3>{this.props.data.title}</h3>
        </div>
        {/* <div className="author">
          <p>By:</p> <span>{this.props.user.firstName}</span>
        </div> */}
        <div className="description">
          <p>{this.props.data.description}</p>
        </div>
        <div className="map-feedback">
          <div className="mapLogo">
            <img
              src={map}
              alt="map"
              onClick={this.toggleClass.bind(this, index)}
            ></img>
            <span>Map</span>
          </div>
          <div className="mapLogo">
            <img
              src={feedback}
              alt="feedback"
              onClick={this.toggleCommenter.bind(this, commet)}
            ></img>
            <span>feedback</span>
          </div>
        </div>
        {this.state.lng !== null && (
          <Collapse isOpened={this.state.activeIndex === index}>
            <div
              className={classNames("map", {
                show: this.state.activeIndex === index,
                hide: this.state.activeIndex !== index,
              })}
            >
              <div className="close-container">
                <img
                  className="close"
                  src={close}
                  alt="close"
                  onClick={this.toggleClass.bind(this, index)}
                ></img>
              </div>
              <Map
                className="map"
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                  lat: this.state.lat,
                  lng: this.state.lng,
                }}
              >
                <Marker
                  position={{ lat: this.state.lat, lng: this.state.lng }}
                />
              </Map>
            </div>
          </Collapse>
        )}
        <Collapse isOpened={this.state.activeCommet === commet}>
          <div
            className={classNames("feedback", {
              show: this.state.activeCommet === commet,
              hide: this.state.activeCommet !== commet,
            })}
          >
            {/* <Comment ></Comment> */}
            <div className="close-container">
              <img
                className="close"
                src={close}
                alt="close"
                onClick={this.toggleCommenter.bind(this, commet)}
              ></img>
            </div>
            <form
              className="commentForm"
              autoComplete="off"
              onSubmit={this.onSubmit}
            >
              <textarea
                maxLength={100}
                cols="40"
                rows="2"
                onChange={this.commentOnchange}
                value={this.state.comment}
                name="comment"
              ></textarea>
              <input className="addPlay-submit" type="submit" value="submit" />
            </form>
            <hr></hr>
            <div className="all-comment">
              {/* <Comment data={this.props.data} ></Comment> */}
              {commentList}
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}
const WrappedContainer = GoogleApiWrapper({
  // apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI",
})(Play);

const mapStateToProps = (state) => {
  return {
    allComment: state.allComment,
    addComment: state.addComment,
    commentIsDelete: state.commentIsDelete
  };
};

export default connect(mapStateToProps, {commentAdd, fetchComment,writerImage })(
  WrappedContainer
);
