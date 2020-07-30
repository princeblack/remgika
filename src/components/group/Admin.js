import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ButtonToggle } from 'reactstrap'
import avatar from "../../img/avatar.png";

export const Admin = (props) => {
    const [allAdmin, setAllAdmin] = useState(true)
    const [addAdmin, setAddAdmin] = useState(false)
    const [remAdmin, setRemAdmin] = useState( false)
    const [remMembers, setRemMembers] = useState( false)
    const [accpteMembers, setAccpteMembers] = useState( false)
    const [confidentiality, setConfidentiality] = useState( false)
    const handleallAdmin =()=>{
        setAllAdmin(true)
        // if (allAdmin) {
            setAddAdmin(false)
            setRemAdmin(false)
            setRemMembers(false)
            setAccpteMembers(false)
            setConfidentiality(false)
        // }
    }
    const handeladdAdmin =()=>{
        setAddAdmin(true)
        // if (addAdmin) {
            setRemAdmin(false)
            setRemMembers(false)
            setAccpteMembers(false)
            setConfidentiality(false)
            setAllAdmin(false)
        // }
    }
    const handelremAdmin  =()=>{
        setRemAdmin(true)
        // if (remAdmin) {
            setRemMembers(false)
            setAccpteMembers(false)
            setConfidentiality(false)
            setAllAdmin(false)
            setAddAdmin(false)
        // }
    }
    const handelremMembers =()=>{
        setRemMembers(true)
        // if (remMembers) {
            setRemAdmin(false)
            setAccpteMembers(false)
            setConfidentiality(false)
            setAllAdmin(false)
            setAddAdmin(false)
        // }
    }
    const handelaccpteMembers = ()=>{
        setAccpteMembers(true)
        // if (accpteMembers) {
            setRemAdmin(false)
            setConfidentiality(false)
            setAllAdmin(false)
            setAddAdmin(false)
            setRemMembers(false)
        // }
    }
    const handelconfidentiality = ()=>{
        setConfidentiality(true)
        // if (confidentiality) {
            setRemAdmin(false)
            setAllAdmin(false)
            setAddAdmin(false)
            setRemMembers(false)
            setAccpteMembers(false)

        // }
    }
    let groupAdmin = props.data.admin
    // const handel()=>{}
    // const handel()=>{}
    const getGroupAdmin = groupAdmin.map((el,index) =>{
        return <div className="admin" key={el._id}>
            <img src={avatar} alt="user"></img>
            <p>{el.adminUsers.firstName} {el.adminUsers.lastName}</p>
            {/* <p>{el.adminUsers.lastName}</p> */}
        </div>
    })
    return (
       <>
         <div className="admin_section">
            <ButtonToggle onClick={handleallAdmin} autoFocus>All Admin</ButtonToggle>
            <ButtonToggle onClick={handeladdAdmin}>Add Admin</ButtonToggle>
            <ButtonToggle onClick={handelremAdmin}>Remove Admin</ButtonToggle>
            <ButtonToggle onClick={handelremMembers}>Remove Members</ButtonToggle>
            <ButtonToggle onClick={handelaccpteMembers}>members request</ButtonToggle>
            <ButtonToggle onClick={handelconfidentiality}>confidentiality</ButtonToggle>
        </div>
        {allAdmin &&
            <div className="admin_members">
                <h3>All admin members</h3>
                {getGroupAdmin}
            </div>
        }
        {addAdmin && 
            <div>add admin</div>
        }
        {remAdmin && 
            <div>remove admin</div>
        }
        {remMembers && 
            <div> remove members</div>
        }
        {accpteMembers && 
            <div>accpte news users</div>
        }
        {confidentiality && 
            <div>group confidentiality</div>
        }
       </>
    )
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps)(Admin)
