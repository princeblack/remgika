import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateGroupPhoto , urlGroupPage} from "../../actions";

export const UpdateGroupPicture = (props) => {
  const image = props.data.imgCollection[0];
  const [picture, setPicture] = useState(false);

  const checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      // eslint-disable-next-line no-loop-func
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }
    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };

  const handlefiles = (event) => {
    if (checkMimeType(event)) {
      // if return true allow to setState
      handlePicture(event);
    }
  };
  const handlePicture = (e) => {
    setPicture(e.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (picture) {
      const data = new FormData();
      data.append("imgCollection", picture);
      const id = props.data._id
      props.updateGroupPhoto(data, id)
    }
  };
  useEffect(() => {
      if (props.updateGroupPIc) {
        const id = props.data._id
        props.urlGroupPage(id)
      }
  }, [props.updateGroupPIc])
  return (
    <div className="update-picture">
      <img src={image} alt="group-img"></img>
        <div>
            <input type="file" onChange={handlefiles}></input>
            <button onClick={handleSubmit}>Update</button>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    updateGroupPIc: state.updateGroupPIc 
});

export default connect(mapStateToProps, {updateGroupPhoto,urlGroupPage})(UpdateGroupPicture);
