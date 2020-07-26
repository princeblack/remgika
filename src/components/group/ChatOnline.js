import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export const ChatOnline = () => {
    return (
        <div className="online members">
            <p>Online</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(ChatOnline)
