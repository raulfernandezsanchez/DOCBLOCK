import React, {useState} from "react";
import emailjs from 'emailjs-com';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

export default function UserContracts(){
    const filename = localStorage.getItem('contractFile');
    const fileContent = localStorage.getItem('contractContent');
    //const mail = localStorage.getItem('userID');
    let mail='infodocblock@gmail.com';

    const [minVal] = useState(1000000);
    const [maxVal] = useState(1000000000);
    const [randomNum, setRandomNum] = useState(0);

    const generateRandomNum = () =>{
        let newVal = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
        setRandomNum(newVal);
        console.log(newVal)
    }

    window.onload = () =>{
        generateRandomNum();
    };

    const sendEmail = (e) =>{
        const firstNameInput = document.getElementById('signInput');
        const modalSigned = document.getElementById('signModal');
        modalSigned.hidden = false;
        firstNameInput.disabled = false;

        var templateParams = {
            user_email: mail,
            number: randomNum
        };
        
        e.preventDefault();
        emailjs.send('Docblock_support', 'Signature_template', templateParams, 'XWMGER03w0eoay02e').then((result) =>{
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    
    const handleSign = () => {
        const firstNameInput = document.getElementById('signInput');
        if (parseInt(firstNameInput.value,10) !== randomNum){
            alert('Wrong number, try again');
            console.log(randomNum);
        }
        else{
            const modalSigned = document.getElementById('signModal');
            alert('Successfully signed');
            modalSigned.hidden = true;
            firstNameInput.disabled = true;
        }
        firstNameInput.value = '';
    };

    return (
        <>
        <NavBarUser></NavBarUser>
        <div id="services" style={{'marginLeft': '20px'}}>
            <h4>Pending contracts</h4>
            <div className="row">
                <div className="col-sm-4">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#multifactor" onClick={sendEmail}>
                    Sign
                    </button>
                    <div className="modal fade" id="multifactor" tabIndex="-1" aria-labelledby="multifactor" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="multifactor">Sign {filename}</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={generateRandomNum}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Enter the code from your email:</p>
                                    <input type='number' id='signInput'/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={generateRandomNum}>Close</button>
                                    <button type="button" id='signModal' className="btn btn-primary" hidden={false} onClick={handleSign}>Confirm signature</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    {fileContent ? <iframe src={fileContent} title='PDF' width="100%" height={window.innerHeight*0.85}></iframe> : <></>}
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}