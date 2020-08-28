import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { ButtonToggle } from 'reactstrap'
import {getAllGroupMembers, removeToAdmin} from '../../actions/index';
import  Addadmin  from './Addadmin';
import  RemoveAdmin  from './RemoveAdmin';
import  RemoveMembers  from './RemoveMembers'
import NewMembers from "./NewMembers";
import UpdateGroup from "./UpdateGroup";
import UpdateGroupPicture from "./UpdateGroupPicture";

import "../../scss/groupPictureUpdate.scss";
import "../../scss/groupInfoUpdate.scss";

export const Admin = (props) => {
    const [allAdmin, setAllAdmin] = useState(true)
    const [addAdmin, setAddAdmin] = useState(false)
    const [remMembers, setRemMembers] = useState( false)
    const [accpteMembers, setAccpteMembers] = useState( false)
    const [confidentiality, setConfidentiality] = useState( false)
    const [picture, setPicture] = useState( false)
    const [info, setInfo] = useState( false)

    const handlePicture = ()=>{
        setPicture(true)
        setInfo(false)
    }
    const handleInfo = ()=>{
        setInfo(true)
        setPicture(false)
    }
    const handleallAdmin =()=>{
        setAllAdmin(true)
            setAddAdmin(false)
            setRemMembers(false)
            setAccpteMembers(false)
            setConfidentiality(false)
    }
    const handeladdAdmin =()=>{
        setAddAdmin(true)
            setRemMembers(false)
            setAccpteMembers(false)
            setConfidentiality(false)
            setAllAdmin(false)
    }
    const handelremMembers =()=>{
        setRemMembers(true)
            setAccpteMembers(false)
            setConfidentiality(false)
            setAllAdmin(false)
            setAddAdmin(false)
    }
    const handelaccpteMembers = ()=>{
        setAccpteMembers(true)
            setConfidentiality(false)
            setAllAdmin(false)
            setAddAdmin(false)
            setRemMembers(false)
    }
    const handelconfidentiality = ()=>{
        setConfidentiality(true)
            setAllAdmin(false)
            setAddAdmin(false)
            setRemMembers(false)
            setAccpteMembers(false)

        
    }
    useEffect(() => {
        const id= props.data._id
        props.getAllGroupMembers(id)
}, [props.data._id])
 

    let groupAdmin = props.data.admin
    const getGroupAdmin = groupAdmin.map((el,index) =>{
       return <RemoveAdmin data={el} key={el._id} group={props.data._id}></RemoveAdmin>
    })

    let members;    
     members = props.groupMembers.map((el,index)=>{
  
        return <Addadmin data={el} group={props.data} key={el._id}></Addadmin>
    })
    let removeMembers;
    removeMembers = props.groupMembers.map((el,index)=>{
  
        return <RemoveMembers data={el} group={props.data} key={el._id}></RemoveMembers>
    })
    let userRequest = props.data.joindReq
    const newMembers = userRequest.map((el,index) =>{

        return <NewMembers data={el} group={props.data} key={el._id}></NewMembers>
    })
    return (
       <>
         <div className="admin_section">
            <ButtonToggle onClick={handleallAdmin} autoFocus>All Admin</ButtonToggle>
            <ButtonToggle onClick={handeladdAdmin}>Add Admin</ButtonToggle>
            <ButtonToggle onClick={handelremMembers}>Remove Members</ButtonToggle>
            <ButtonToggle onClick={handelaccpteMembers}>members request</ButtonToggle>
            <ButtonToggle onClick={handelconfidentiality}>confidentiality</ButtonToggle>
        </div>
        {allAdmin &&
            <div className="admin_members">
                <h3>Admin members</h3>
                {getGroupAdmin}
            </div>
        }
        {addAdmin && 
            <div className="add_admin">
                <>
                <h3>Members</h3>
                    {members}
                </>
            </div>
        }
        {remMembers && 
            <div className="remove_members"> 
                <h3>remove members</h3>
                {removeMembers}
            </div>
        }
        {accpteMembers && 
            <div className="new_members">
                <h3>User request</h3>
                {newMembers}
            </div>
        }
        {confidentiality && 
            <>
                <div className="button-container">
                    <div className="picture">
                        <ButtonToggle onClick={handlePicture} >Update picture</ButtonToggle>
                    </div>
                    <div className="info-container">
                        <ButtonToggle onClick={handleInfo}>Update Info</ButtonToggle>
                    </div>
                </div>
                <div className="update-container">
                    {picture && 
                        <UpdateGroupPicture data={props.data}></UpdateGroupPicture>
                    }
                    {info &&
                     <UpdateGroup data={props.data}></UpdateGroup> 
                    }
                </div>
            </>
        }
       </>
    )
}

const mapStateToProps = (state) => {
   return{
    groupMembers: state.groupMembers,
    info : state.info,
    addNewAdmin : state.addNewAdmin
   } 
}



export default connect(mapStateToProps,{getAllGroupMembers,removeToAdmin})(Admin)
