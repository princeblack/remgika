import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { myMessages } from '../../actions'
import ChatItems from './ChatItems'

export const Chat = (props) => {
    useEffect(() => {
        const id = props.match.params.id
        props.myMessages(id)
    }, [props.match.params.id])
    return (
        <>
            {props.myMsg && (
                <>
                    {props.myMsg.map((el,index)=>{
                        return(
                            <ChatItems data={el} key={el._id}></ChatItems>
                        )
                    })}
                </>
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    info: state.info,
    myMsg: state.myMsg
})



export default connect(mapStateToProps,{myMessages})(Chat)
