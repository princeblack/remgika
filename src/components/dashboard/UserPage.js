import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { OneUser, userFriendreq } from "../../actions";
import "../../scss/user.scss";
import less from "../../img/less.svg";
import more from "../../img/more.svg";
import people from "../../img/people.svg";
import person from "../../img/person.svg";
import mood from "../../img/mood.svg";
import personRemove from "../../img/person-remove.svg";
import moment from "moment";
import { Groups } from "./Groups";
import Friendrequest from "./Friendrequest";
import Myfriend from "./Myfriend"

export const UserPage = (props) => {
  const [state, setstate] = useState();
  const [info, setInfo] = useState(true);
  const [group, setGroup] = useState(false);
  const [friend, setfriend] = useState(false);
  const [friendREq, setFriendREq] = useState(false);
  const [myFriend, setmyFriend] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    props.OneUser(id);
  }, [props.match.params.id]);
  useEffect(() => {
    if (props.getOneUser._id) {
      setstate(props.getOneUser.imgCollection[0]);
    }
  }, [props.getOneUser]);
  const handleToggleInfo = (e) => {
    e.preventDefault();
    setInfo(!info);
  };
  const handleToggleGroup = (e) => {
    e.preventDefault();
    setGroup(!group);
  };
  const handleToggleFriend = (e) => {
    e.preventDefault();
    setfriend(!friend);
    if (friendREq) {
      setFriendREq(!friendREq);
    }
    if (myFriend) {
      setmyFriend(!myFriend);
    }
  };
  const handleToggleFriendReq = (e) => {
    e.preventDefault();
    setFriendREq(!friendREq);
  };
  const handleToggleMyFriend = (e) => {
    e.preventDefault();
    setmyFriend(!myFriend);
  };
  const date = new Date(props.getOneUser.createdAt);
  const create = moment(date).format("dddd, MMMM D Y");
  let userGroup;
  let allMyFriend;
  if (props.getOneUser._id) {
    userGroup = props.getOneUser.group.map((el, index) => {
      return <Groups data={el} key={el._id}></Groups>;
    });
  }
  if (props.getOneUser._id) {
    allMyFriend = props.getOneUser.friend.map((el, index) => {
      return <Myfriend data={el} key={el._id}></Myfriend>;
    });
  }
  const jandleFriendReq = (e) => {
    e.preventDefault();
    const id = props.getOneUser._id;
    props.userFriendreq(id);
  };
  useEffect(() => {
    if (props.friendReq || props.friendRefuse || props.friendAccepted || props.friendIsRemove) {
      const id = props.getOneUser._id;
      props.OneUser(id);
    }
  }, [props.friendReq, props.friendRefuse, props.friendAccepted, props.friendIsRemove]);

  let friendRequest;
  if (props.getOneUser._id) {
    friendRequest = props.getOneUser.friendReq.map((el, index) => {
      return <Friendrequest data={el} key={el._id}></Friendrequest>;
    });
  }
  return (
    <div className="user-container">
      {props.getOneUser._id && (
        <>
          <di className="user-Image">
            <div
              className="firstDiv"
              style={{ backgroundImage: `url(${state})` }}
            ></div>
            <div className="image">
              <div
                className="theUser"
                style={{ backgroundImage: `url(${state})` }}
              ></div>
              <h1>
                {props.getOneUser.firstName} {props.getOneUser.lastName}
              </h1>
            </div>
            <div className="lastDiv"></div>
          </di>
          {props.getOneUser._id !== props.info._id && (
            <>
              {!props.getOneUser.friendId.includes(props.info._id) && (
                <div className="user-req">
                  
                  <div className="back-green" onClick={jandleFriendReq}>
                    <>
                      {props.getOneUser.friendReqId.includes(props.info._id) ? (
                        <>
                          <img src={personRemove} alt="request"></img>
                          <p>Cancel the request</p>
                        </>
                      ) : (
                        <>
                          <img src={person} alt="request"></img>
                          <p>Friend request</p>
                        </>
                      )}
                    </>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="information">
            <div className="info-container">
              <div className="toggle" onClick={handleToggleInfo}>
                <img src={info ? less : more} alt="info"></img>
                <h2> Information</h2>
              </div>
              {info && (
                <div className="info">
                  <p>
                    <span>Name:</span> {props.getOneUser.firstName}
                  </p>
                  <p>
                    <span>Last Name: </span>
                    {props.getOneUser.lastName}
                  </p>
                  <p>
                    <span>since: </span>
                    {create}
                  </p>
                </div>
              )}
            </div>
            <div className="user-group">
              <div className="toggle" onClick={handleToggleGroup}>
                <img src={group ? less : more} alt="info"></img>
                <h2> Group</h2>
              </div>
              {group && userGroup}
            </div>
            <div className="user-friend">
              {props.getOneUser._id === props.info._id ? (
                <>
                  <div className="toggle" onClick={handleToggleFriend}>
                    <img src={friend ? less : more} alt="info"></img>
                    <h2> Friend</h2>
                  </div>
                  {friend && (
                    <>
                      <div className="request">
                        <div className="button" onClick={handleToggleFriendReq}>
                          <img src={people} alt="request"></img>
                          <p>
                            {props.getOneUser.friendReq.length} Friend request
                          </p>
                        </div>
                        {friendREq && friendRequest}
                      </div>
                      <div className="myFriend">
                        <div className="button" onClick={handleToggleMyFriend}>
                          <img src={mood} alt="request"></img>
                          <p>{props.getOneUser.friend.length} Friend</p>
                        </div>
                        {myFriend && allMyFriend}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="toggle" onClick={handleToggleFriend}>
                    <img src={friend ? less : more} alt="info"></img>
                    <h2> mutual friends</h2>
                  </div>
                </>
              )}
            </div>
            <div className="publication"></div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getOneUser: state.getOneUser,
  friendReq: state.friendReq,
  info: state.info,
  friendAccepted: state.friendAccepted,
  friendRefuse: state.friendRefuse,
  friendIsRemove : state.friendIsRemove
});

export default connect(mapStateToProps, { OneUser, userFriendreq })(UserPage);
