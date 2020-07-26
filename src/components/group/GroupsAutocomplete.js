import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { publicGroups } from "../../actions/index";
import Groups from "./Groups";
import GroupsMenu from "./GroupsMenu";
import '../../scss/groups.scss'

export const GroupsAutocomplete = (props) => {
  const [userId] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    props.publicGroups();
  }, [userId]);

  const ref = useRef();

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    handelCharacters(e.target.value);
  };

  const [getGroups, setgetGroups] = useState();
  const handelCharacters = async (character) => {
    let filterCharacter;
    filterCharacter = await props.allPublicGroup.filter((play) => {
      return (
        play.groupName.toLowerCase().indexOf(character.toLowerCase()) !== -1
      );
    });
    setgetGroups(filterCharacter);

  };  

  const [size, setSize] = useState(0);
  
  return (
    <>
      <div ref={ref} className="MainGroups-autocomplte">
        <div className="inpute-auto">
          <input
            value={value}
            onChange={handleInput}
            type="text"
            name="search"
            placeholder="Groups in your city"
          />
        </div>
      </div>
      <div className="categorie">
        <h1>Groups</h1>
        <hr></hr>
      </div>
      <div className="groupSection">
        <div className="groupMenu">
            <GroupsMenu filterGroup={getGroups} size = {size}/>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allPublicGroup: state.allPublicGroup,
  };
};

export default connect(mapStateToProps, { publicGroups })(GroupsAutocomplete);
