import React, {  } from 'react'
import { connect } from 'react-redux'

export const EventImage = (props) => {
    return (
        <div className="image">
            <img  src={props.data} alt="event"></img>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EventImage)
