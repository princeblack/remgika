import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import { removeFriend} from "../../actions";

export const Myfriend = (props) => {
    const remove = (e)=>{
        e.preventDefault();
        const id = props.data._id
        props.removeFriend(id)
    }
    return (
        <div className="user">
        <NavLink to={`/user/${props.data._id}`}>
          <div
            className="image"
            style={{ backgroundImage: `url(${props.data.imgCollection[0]})` }}
          ></div>
          <div className="name">
            <p>
              {props.data.firstName} {props.data.lastName}
            </p>
          </div>
          <div className="request-container">
              <button className="refuse" onClick={remove}>remove</button>
          </div>
        </NavLink>
      </div>
    )
}

const mapStateToProps = (state) => ({
    friendIsRemove : state.friendIsRemove
})



export default connect(mapStateToProps,{removeFriend})(Myfriend)
