import React, { Component } from "react";
import { connect } from "react-redux";
import Groups from "./Groups";
import AddGroup from "./AddGroup";
import { OneUser } from "../../actions";
import IamMember from "./IamMember";

class GroupsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discoverToggle: false,
      groupsToggle: true,
      addsToggle: true,
    };
    this.handleDiscover = this.handleDiscover.bind(this);
    this.handleGroups = this.handleGroups.bind(this);
    this.handleAdds = this.handleAdds.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.info !== this.props.info) {
      const id = this.props.info._id
      this.props.OneUser(id)
    }
  }

  handleDiscover(e) {
    e.preventDefault();
    this.setState((state) => ({
      discoverToggle: false,
      groupsToggle: true,
      addsToggle: true,
    }));
  }
  handleGroups(e) {
    e.preventDefault();
    this.setState((state) => ({
      groupsToggle: false,
      discoverToggle: true,
      addsToggle: true,
    }));
  }
  handleAdds(e) {
    e.preventDefault();
    this.setState((state) => ({
      addsToggle: false,
      discoverToggle: true,
      groupsToggle: true,
    }));
  }

  render() {
    let handleDiscover = this.state.discoverToggle;
    let handleGroups = this.state.groupsToggle;
    let handleAdds = this.state.addsToggle;
    let filterdata = this.props.filterGroup;


    // get random Groups
    let n = 20;
    let rendom = this.props.allPublicGroup
      .sort(() => Math.random() - Math.random())
      .slice(0, n);

    let groupList;
    groupList = rendom.map((el, index) => {
      return (
        <Groups
          user={this.props.info}
          eventsIndex={index}
          data={el}
          key={index}
        ></Groups>
      );
    });
    // get Groups that match the user  research input
    if (filterdata !== undefined) {
      groupList = filterdata.map((el, index) => {
        return (
          <Groups
            user={this.props.info}
            eventsIndex={index}
            data={el}
            key={index}
          ></Groups>
        );
      });
    }

    let memberGroup;
    if (this.props.getOneUser.group) {
      memberGroup = this.props.getOneUser.group.map((el, index) => {
        return (
          <IamMember data={el} key={el._id}></IamMember>
        )
      })
    }

    // console.log(this.props.allPublicGroup[Math.floor(Math.random()*this.props.allPublicGroup.length)]);
    return (
      <>
        <div className="menu">
          <button onClick={this.handleDiscover}>Discover</button>
          <button onClick={this.handleGroups}>Groups</button>
          <button onClick={this.handleAdds}>Adds</button>
        </div>
        <div className="element">
          <>
            {!handleDiscover && (
              <>
                <div className="sugges">Suggestions for you</div>
                <div className="group-table">{groupList}</div>
              </>
            )}
          </>
          <>{!handleGroups && <>
            <div className="sugges">You are members in these groups</div>
            <div className="group-table">{memberGroup}</div>
          </>}</>
          <>

            {!handleAdds && <>
              <div className="sugges">Create a new group</div>
              <AddGroup></AddGroup>
            </>}</>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allPublicGroup: state.allPublicGroup,
    info: state.info,
    getOneUser: state.getOneUser
  };
};

export default connect(mapStateToProps, { OneUser })(GroupsMenu);
