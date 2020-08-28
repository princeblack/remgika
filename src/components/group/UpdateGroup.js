import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TextareaAutosize from 'react-autosize-textarea';
import { updateGroupInformation, urlGroupPage } from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";

export const UpdateGroup = (props) => {
    const [usertext, setUsertext] = useState(props.data.description)
    const [groupName, setgroupName] = useState(props.data.groupName)
    const [select, setSelect] = useState('Public')
    const [check, setCheck] = useState(false);


    const handleChange = (e) => {
        e.preventDefault();
        setUsertext(e.target.value);
      };
      const handleNameChange = (e) => {
        e.preventDefault();
        setgroupName(e.target.value);
      };
      const handleSelect = (e)=>{
        e.preventDefault();
        setSelect(e.target.value)
      }
      const Update = (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append("description",usertext)
        data.append("groupName", groupName)
        data.append("confidentiality", select)

        const id = props.data._id
        props.updateGroupInformation(data,id)
      };
      useEffect(() => {
        if (props.updateGroupInfo) {
         const id = props.data._id
         props.urlGroupPage(id)
        }
        async function n() {
            if (props.updateGroupInfo) {
              setTimeout(() => {
                setCheck(true);
              }, 1000);
            }
          }
        async function m() {
            if (props.updateGroupInfo) {
              setTimeout(() => {
                setCheck(false);
              }, 4000);
            }
          }
          n();
          m();
     }, [props.updateGroupInfo])
    return (
        <div className="UpdateGroup">
            <form className="updateForm">
                <div>
                    <p>Group Name</p>
                    <input
                    value={groupName}
                    onChange={handleNameChange}
                    required={ true}
                    >
                    </input>
                </div>
                <div>
                    <select name="private" onChange={handleSelect}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <div>
                    <p>Group Description</p>
                    <TextareaAutosize
                    value={usertext}
                    placeholder='Type a messsage...'
                    onChange={handleChange}
                    >
                    </TextareaAutosize>
                </div>
                <div>
                    <button onClick={Update}>Update</button>
                </div>
            </form>
            {check && (
              <div className="check-container">
                <FontAwesomeIcon icon={faCheck} className="spinner" />
                <p> The Group is created successfully</p>
              </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    info : state.info,
    updateGroupInfo : state.updateGroupInfo
})


export default connect(mapStateToProps, {updateGroupInformation, urlGroupPage})(UpdateGroup)
