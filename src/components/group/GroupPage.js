import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { urlGroupPage, joinGroupReq } from "../../actions/index";
import BackNav from "./BackNav";
import "../../scss/groupeUrl.scss";
import woman from "../../img/pro3.jpeg";
import { faLock, faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "./Menu";

const GroupPage = (props) => {
  const [redirect, setRedirect] = useState(false);
const [isTrue,setIsTrue] = useState(false);
  useEffect(() => {
    const id = props.match.params.id;
    props.urlGroupPage(id);
  }, [props.match.params.id]);

  const joinReq = (e) => {
    const id = props.match.params.id;
    if (props.isLoggedIn) {
      props.joinGroupReq(id);
    } else {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (props.joinRequest) {
      const id = props.match.params.id;
      props.urlGroupPage(id);
      setIsTrue(false)
    }
  }, [props.joinRequest]);
  const data = props.urlGroupInfo;
  const info = props.info;

  let member = false;
  let request = isTrue;
  if (info.group) {
    for (let i = 0; i < info.group.length; i++) {
      if (data._id === info.group[i]) {
        member = true;
      }
    }
  }
  if (data.joindReq ) {
    for (let i = 0; i < data.joindReq.length; i++) {
      if (info._id === data.joindReq[i]._id) {
        request = true;
      }
    }
  }
  
  const image = data.imgCollection;
  return (
    <>
      {redirect && <Redirect to="/login"></Redirect>}
      <div className="groupePage">
        <BackNav></BackNav>
        {data._id && (
          <div className="info">
            <div className="groupPictur-info">
              <i
                className="img_background"
                style={{ backgroundImage: `url(${image})` }}
              ></i>
              <div className="name">
                <div>
                  <p>{data.groupName}</p>
                  <span>{data.confidentiality} Group</span>
                </div>
              </div>
            </div>
            <div className="group-confi">
              {!member ? (
                <>
                  {data.confidentiality === "Public" ? (
                    <>
                      <div className="public-descr-block">
                        <div className="africa">
                          <FontAwesomeIcon icon={faGlobeAfrica} />
                        </div>
                        <div className="public-descr">
                          <span>Public</span>
                          <p>
                            Everyone can see who is in the group and what is
                            being published
                          </p>
                        </div>
                      </div>
                      <div className="join-group-button">
                        {request ? (
                          <button>Request sent</button>
                        ) : (
                          <button onClick={joinReq}>Join the group</button>
                        )}
                      </div>

                      <div className="navMenu">
                        <Menu data={data}></Menu>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="public-descr-block">
                        <div className="africa">
                          <FontAwesomeIcon icon={faLock} />
                        </div>
                        <div className="public-descr">
                          <span>Private</span>
                          <p>
                            Only members can see who is in the group and what is
                            being posted
                          </p>
                        </div>
                      </div>
                      <div className="join-group-button">
                        {request ? (
                          <button>Request sent</button>
                        ) : (
                          <button onClick={joinReq}>Join the group</button>
                        )}
                      </div>
                      <div className="group-about">
                        <div className="about">
                          <span>About</span>
                        </div>
                        <div className="about-info">
                          <span>{data.description}</span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="navMenu">
                    <Menu data={data}></Menu>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    urlGroupInfo: state.urlGroupInfo,
    info: state.info,
    isLoggedIn: state.isLoggedIn,
    joinRequest: state.joinRequest,
  };
};

export default connect(mapStateToProps, { urlGroupPage, joinGroupReq })(
  GroupPage
);
