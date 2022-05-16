import React from 'react'
import '../css/popup.css'


function Popup(props) {

  return (props.trigger) ? (
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn btn-close" onClick={() => props.setTrigger(false)} type="button" aria-label="Close"></button>
          { props.children }
        </div>
      </div>
  ) : "";

} export default Popup
