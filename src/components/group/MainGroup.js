import React from 'react'
import { connect } from 'react-redux'
import GroupsAutocomplete from './GroupsAutocomplete'
import '../../scss/groups.scss'
export const MainGroup = (props) => {
   return(
    <div className="MainGroup">
    <>
      <div className="serchBar">
        < GroupsAutocomplete/>
      </div>
    </>
  </div>
   )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGroup)
