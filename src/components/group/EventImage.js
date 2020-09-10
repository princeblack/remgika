import React, {  } from 'react'
import { connect } from 'react-redux'

export const EventImage = (props) => {
    return (
            <div
              className="image"
              style={{ backgroundImage: `url(${props.data})` }}
            ></div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EventImage)
