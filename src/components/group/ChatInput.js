import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {faPaperPlane, faSmile} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import io from 'socket.io-client'
import '../../scss/chat.scss'
let socket;

export const ChatInput = (props) => {
    const [show,setShow] = useState(false)
    const [welcome, setWelcome] = useState('')
    const [allMessage, setAllMessage] = useState([])
    const [usertext,setUsertext] = useState('')
    const [users,setUsers] = useState('')

    const handleShowIcon = (e)=>{
        if (show) {
            setShow(!show)
        } else {
            setShow(true)
        }
    }
    const handlImo = (e)=>{        
        setUsertext(usertext + e.native)
        
    }
    const handleChange = (e)=> {
        e.preventDefault()
        setUsertext(e.target.value)        
    }
    
    const ENDPOINT = 'http://localhost:4000'
    socket = io(ENDPOINT)
   

    // send message to the room
    const sendMessage = (event)=>{
        event.preventDefault();
        if(usertext) {
            socket.emit('sendMessage', {message: usertext} );
            setUsertext('')
          }
    }

    return (
        <div className="input">
            <div>
                <textarea  value={usertext} placeholder="Type a messsage..."  onChange={handleChange} ></textarea>
            </div>
            <div className='emo'>
                <FontAwesomeIcon icon={faSmile} onClick={handleShowIcon} title="Choose an emoji"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPaperPlane} title="Send " onClick={sendMessage}></FontAwesomeIcon>

            </div>
            <div>
            {show && <Picker onSelect={handlImo} set='apple' title='Pick your emoji…' emoji='point_up' skin="5" i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    
    return{
        info : state.info,
        isLoggedIn: state.isLoggedIn
    }
}



export default connect(mapStateToProps)(ChatInput)
