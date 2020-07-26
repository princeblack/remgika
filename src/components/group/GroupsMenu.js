import React, { Component } from "react";
import { connect } from "react-redux";
import Groups from "./Groups";
import AddGroup from "./AddGroup";

class GroupsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discoverToggle: true,
      groupsToggle: true,
      addsToggle: true,
    };
    this.handleDiscover = this.handleDiscover.bind(this);
    this.handleGroups = this.handleGroups.bind(this);
    this.handleAdds = this.handleAdds.bind(this);
  }
  
  handleDiscover(e) {
    e.preventDefault();
    this.setState((state) => ({
      discoverToggle: !state.discoverToggle,
    }));
    if (this.state.discoverToggle === true) {
      this.setState((state) => ({
        groupsToggle: true,
        addsToggle: true,
      }));
    }
  }
  handleGroups(e) {
    e.preventDefault();
    this.setState((state) => ({
      groupsToggle: !state.groupsToggle,
    }));
    if (this.state.groupsToggle === true) {
      this.setState((state) => ({
        discoverToggle: true,
        addsToggle: true,
      }));
    }
  }
  handleAdds(e) {
    e.preventDefault();
    this.setState((state) => ({
      addsToggle: !state.addsToggle,
    }));
    if (this.state.addsToggle === true) {
      this.setState((state) => ({
        discoverToggle: true,
        groupsToggle: true,
      }));
    }
  }

  render() {
    let handleDiscover = this.state.discoverToggle;
    let handleGroups = this.state.groupsToggle;
    let handleAdds = this.state.addsToggle;
    let filterdata = this.props.filterGroup;

if (handleDiscover && handleGroups && handleAdds) {
    handleDiscover = false
}
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
          <>{!handleGroups && <>you are members in these groups</>}</>
          <>{!handleAdds && <> <AddGroup></AddGroup> </>}</>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allPublicGroup: state.allPublicGroup,
  };
};

export default connect(mapStateToProps)(GroupsMenu);
