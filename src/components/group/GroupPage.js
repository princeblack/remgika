import React, { useEffect } from "react";
import { connect } from "react-redux";
import { urlGroupPage } from "../../actions/index";
import BackNav from "./BackNav";
import "../../scss/groupeUrl.scss";
import woman from "../../img/pro3.jpeg";
import { faLock, faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "./Menu";

const GroupPage = (props) => {
  useEffect(() => {
    const id = props.match.params.id;
    props.urlGroupPage(id);
  }, [props.match.params.id]);
  
  const data = props.urlGroupInfo;
  const info = props.info;

  let res = false;

  if (info.group) {
    for (let i = 0; i < info.group.length; i++) {
      if (data._id === info.group[i]) {
        res = true;
      }
    }
  }
  const image = data.imgCollection
  return (
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
            {!res ? (
              <>
                {data.confidentiality === "Public" ? (
                  <div className="public-descr-block">
                    <div className="africa">
                      <FontAwesomeIcon icon={faGlobeAfrica} />
                    </div>
                    <div className="public-descr">
                      <span>Public</span>
                      <p>
                        Everyone can see who is in the group and what is being
                        published
                      </p>
                    </div>
                  </div>
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
                  </>
                )}
                <div className="join-group-button">
                  <button>Join the group</button>
                </div>
                <div className="group-about">
                  <div className="about">
                    <span>About</span>
                  </div>
                  <div>
                    <span>{data.description}</span>
                  </div>
                </div>
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
  );
};

const mapStateToProps = (state) => {
  return {
    urlGroupInfo: state.urlGroupInfo,
    info: state.info,
  };
};

export default connect(mapStateToProps, { urlGroupPage })(GroupPage);
