import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getAllGroupMembers} from '../../actions/index';
import  MembersItems  from './MembersItems';
import '../../scss/groupMembers.scss'
const Members = (props) => {
    useEffect(() => {
        const id= props.data._id
        props.getAllGroupMembers(id)
    }, [props.data._id])
    let members;    
    members = props.groupMembers.map((el,index)=>{
        return <MembersItems data={el} key={index} group={props.data}></MembersItems>
    })
    
    return (
        <div className="members-container">
            <div className="members-numbers">
                <h2>Members :
                    <span>{props.data.members}</span>
                </h2>
                
            </div>
            <div className="memebers">
                {members}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        groupMembers: state.groupMembers
    }
    
}


export default connect(mapStateToProps, {getAllGroupMembers})(Members)
