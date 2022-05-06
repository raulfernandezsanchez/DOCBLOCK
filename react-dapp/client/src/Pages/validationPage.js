import React, {useState} from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";


var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}

function ValidationPage(){
    const [searchShow, setSearchShow] = useState(false);
    const [searchField, setSearchField] = useState("");
    function handleSubmit(){
        setSearchShow(true);
        /*if( typeof findExperience(searchField) === 'undefined' ){
            //show table with experience
        }
        else{
            alert("Code provided not available")
        }
        */
    };
    function changeSubmit(e){
        setSearchField(e.target.value)
        setSearchShow(false);
    };
    return (
        <>
        <NavBar></NavBar>
        <div id="validation" style={rootStyle}>
            <h3>Enter an ID to validate its experience</h3>
            <input onChange={changeSubmit} placeholder="User code"></input>
            <br/><br/>
            <button type='submit' onClick={handleSubmit} className="btn btn-primary btn-block">Search</button>
            <br/>
            <br/>
            {searchShow ? (<p>{searchField}</p>) : (<p></p>)}
        </div>
        <Footer></Footer>
        </>
    );
} export default ValidationPage;