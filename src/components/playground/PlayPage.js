import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchOnePlayground,
  commentAdd,
  fetchComment,
  LikePlayground,
  unLikePlayground
} from "../../actions/index";
import ItemsCarousel from "react-items-carousel";
import AddressInfo from "./AddressInfo";
import PlayImage from "./PlayImage";
import "../../scss/playgroundPlage.scss";
import link from "../../img/link.svg";
import unlink from "../../img/unlink.svg";
import feedback from "../../img/feedback.svg";
import TextareaAutosize from "react-autosize-textarea";
import Comment from "./Comment";

import place from "../../img/place.svg";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import map from "../../img/map.svg";

export const PlayPage = (props) => {
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [userlng, setUserlng] = useState(null);
  const [userlat, setUserlat] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showCommit, setShowCommit] = useState(false);
  const [commit, setCommit] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {});
  }, []);

  useEffect(() => {
    const id = props.match.params.id;
    props.fetchOnePlayground(id);
    props.fetchComment(id);
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.playIsLike) {
      const id = props.match.params.id;
      props.fetchOnePlayground(id);
    }
  }, [props.playIsLike]);

  useEffect(() => {
    if (props.playIsUnLike) {
      const id = props.match.params.id;
      props.fetchOnePlayground(id);
    }
  }, [props.playIsUnLike]);

  useEffect(() => {
    if (props.addComment) {
      const id = props.match.params.id;
      props.fetchComment(id);
    }
  }, [props.addComment]);
  useEffect(() => {
    if (props.commentIsDelete) {
      const id = props.match.params.id;
      props.fetchComment(id);
    }
  }, [props.commentIsDelete]);
  useEffect(() => {
    if (props.commentIsDelete) {
      const id = props.match.params.id;
      props.fetchComment(id);
    }
  }, [props.commentIsDelete]);
  useEffect(() => {
    if (props.onePlayground._id === props.match.params.id) {
      const handlePlace = () => {
        let userlongitude, userlatitude;
        navigator.geolocation.getCurrentPosition(function (position) {
          userlongitude = position.coords.latitude;
          userlatitude = position.coords.longitude;
        });
        if (props.onePlayground.street) {
          getGeocode({
            address: props.onePlayground.street,
          })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
              if (lat !== null) {
                setLng(lng);
                setLat(lat);
                setUserlng(userlongitude);
                setUserlat(userlatitude);
              }
            })
            .catch((error) => {});
        }
      };
      handlePlace();
    }
  }, [props]);
  const toggleCommenter = () => {
    setShowCommit(true);
    setShowMap(false);
  };
  const toggleMap = () => {
    setShowMap(true);
    setShowCommit(false);
  };
  const commentOnchange = (e) => {
    e.preventDefault();
    setCommit(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newData = await {
      content: commit,
      postId: props.match.params.id,
    };
    props.commentAdd(newData);
    setCommit("");
  };
  const handleLike = (e)=>{
    e.preventDefault();
    const id = props.match.params.id
    props.LikePlayground(id)
  }
  const handleUnLike = (e)=>{
    e.preventDefault();
    const id = props.match.params.id
    props.unLikePlayground(id)
  }
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  let image;
  if (props.onePlayground.imgCollection) {
    image = props.onePlayground.imgCollection.map((el, index) => {
      return <PlayImage data={el} key={index}></PlayImage>;
    });
  }
  let commentList;
  if (props.allComment) {
    commentList = props.allComment.map((el, index) => {
      return <Comment key={el._id} comment={el}></Comment>;
    });
  }
  const mapStyles = {
    position: "relative",
    width: "90%",
    height: "80%",
  };
  return (
    <>
      {props.onePlayground._id === props.match.params.id && (
        <>
          <div className="playgroud-plage-item">
            <div className="container1">
              <div className="image">
                <ItemsCarousel
                  enablePlaceholder
                  requestToChangeActive={setActiveItemIndex}
                  activeItemIndex={activeItemIndex}
                  numberOfCards={1}
                  gutter={12}
                  outsideChevron={false}
                  chevronWidth={chevronWidth}
                  leftChevron={<button> {'<'} </button>}
                  rightChevron={<button> {'>'} </button>}
                >
                  {image}
                </ItemsCarousel>
              </div>
              <div className="userVote">
                <div className="positif">
                  <span>{props.onePlayground.like}</span>
                  <img src={link} alt="like" onClick={handleLike}></img>
                </div>
                <div className="negatif">
                  <img src={unlink} alt="unlike" onClick={handleUnLike}></img>
                  <span>{props.onePlayground.unlike}</span>
                </div>
              </div>
            </div>
            <div className="container2">
              <div className="title">
                <h3>{props.onePlayground.title}</h3>
              </div>
              <div className="adresse-info">
                <div className="info">
                  <img src={place} alt="schedule"></img>
                  <p className="address">{props.onePlayground.street}</p>
                </div>
              </div>
              <div className="description">
                <p>{props.onePlayground.description}</p>
              </div>
            </div>
            <div className="map-feedback">
              <div className="button-toggle">
                <div className="mapLogo">
                  <img src={map} alt="map" onClick={toggleMap}></img>
                </div>
                <div className="mapLogo">
                  <img
                    src={feedback}
                    alt="feedback"
                    onClick={toggleCommenter}
                  ></img>
                </div>
              </div>

              {showMap && (
                <div className="map-container">
                  {lat !== null && (
                    <Map
                      className="map"
                      google={props.google}
                      zoom={14}
                      style={mapStyles}
                      initialCenter={{
                        lat: lat,
                        lng: lng,
                      }}
                    >
                      <Marker position={{ lat: lat, lng: lng }} />
                    </Map>
                  )}
                </div>
              )}
              {showCommit && (
                <div className="commit-container">
                  <form
                    className="commentForm"
                    autoComplete="off"
                    onSubmit={onSubmit}
                  >
                    <TextareaAutosize
                      //   cols="40"
                      //   rows="4"
                      onChange={commentOnchange}
                      value={commit}
                      name="comment"
                    ></TextareaAutosize>
                    <input
                      className="addPlay-submit"
                      type="submit"
                      value="submit"
                    />
                  </form>
                  <div className="all-comment">{commentList}</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  onePlayground: state.onePlayground,
  allComment: state.allComment,
  info: state.info,
  commentIsDelete: state.commentIsDelete,
  addComment: state.addComment,
  playIsLike : state.playIsLike,
  playIsUnLike : state.playIsUnLike
});

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI",
})(PlayPage);

export default connect(mapStateToProps, {
  fetchOnePlayground,
  fetchComment,
  commentAdd,
  LikePlayground,
  unLikePlayground,
})(WrappedContainer);
