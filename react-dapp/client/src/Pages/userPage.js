import React, {useState} from "react";
import emailjs from 'emailjs-com';
import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";
import "../css/companyPage.css";

function getUnique(arr, index) {
  const unique = arr
       .map(e => e[index])
       // store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)
       // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

export default function UserPage(){

    const userID = localStorage.getItem('userID');

    // user
    const [user, setUser] = useState('');
    const [userContracts, setUserContracts] = useState('');

    // loaded contracts
    const [foundContracts, setFoundContracts] = useState('');

    //popup de contrato
    //const [buttonPopupInfo, setButtonPopupInfo] = useState(false);
    const [popupContract, setPopupContract] = useState('');
    const [minVal] = useState(1000000);
    const [maxVal] = useState(1000000000);
    const [randomNum, setRandomNum] = useState(0);
    const fileContent = localStorage.getItem('contractContent');

    const generateRandomNum = () =>{
        let newVal = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
        setRandomNum(newVal);
        console.log(newVal)
    };
    window.onload = () =>{
        generateRandomNum();
    };
    //para debugar
    let mail = 'infodocblock@gmail.com';

    const sendEmail = (e) =>{
        const firstNameInput = document.getElementById('signInput');
        const modalSigned = document.getElementById('signModal');
        modalSigned.hidden = false;
        firstNameInput.disabled = false;
        var templateParams = {
            user_email: mail, //user.mail,
            number: randomNum,
            contract: popupContract
        };

        e.preventDefault();
        emailjs.send('Docblock_support', 'Signature_template', templateParams, 'XWMGER03w0eoay02e').then((result) =>{
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };


    // load users and contracts
    React.useEffect(() => {
       fetch("https://vast-peak-05541.herokuapp.com/api/users/" + userID, {
           method:'GET',
           headers:{
               "Content-Type":'application/json',
           }
       }).then(response => response.json())
         .then(data => {
           setUser(data.user);
           setUserContracts(data.user.assignedContracts);
         });
        fetch("https://vast-peak-05541.herokuapp.com/api/contracts", {
            method:'GET',
            headers:{
                "Content-Type":'application/json',
            }
        }).then(response => response.json())
          .then(data => {
            let contracts = getUnique(data, 'name');
            setFoundContracts(contracts);
          });

       }, []);

    function handleContractInfo(event, contractID) {
        event.preventDefault();
        setPopupContract(contractID);
        //sendEmail(event);
    };

    const handleSign = () => {
        const signInput = document.getElementById('signInput');
        if (parseInt(signInput.value,10) !== randomNum){
            alert('Wrong number, try again');
            console.log(randomNum);
        }
        else{
            const modalSigned = document.getElementById('signModal');
            alert('Successfully signed');
            modalSigned.hidden = true;
            signInput.disabled = true;
        }
        signInput.value = '';
    };

    return (
        <>
        <NavBarUser></NavBarUser>
        <div className="about-section" width="100%">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
        <div className="row mx-5 my-5">
          <div className="col-lg-12">
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th><span>Contract</span></th>
                      <th><span>Status</span></th>
                      <th><span>Action</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userContracts && userContracts.length > 0 ? (
                      userContracts.map((contract) => (
                        <tr key={contract} className="">
                          <td className="user-id">{contract}</td>
                          <td className="user-name"><span className="c-pill c-pill--warning">Pending</span></td>
                          <td>
                            <div className="col d-flex justify-content-center">
                                <button className="button" variant="primary" data-bs-toggle="modal" data-bs-target="#multifactor" onClick={(e) => handleContractInfo(e, contract)}>Sign</button>
                                <div className="modal fade " id="multifactor" tabIndex="-1" aria-labelledby="multifactor" aria-hidden="true">
                                    <div className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title" id="multifactor">Sign {popupContract}</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={generateRandomNum}></button>
                                            </div>
                                            <div className="modal-body" >
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <p>Enter the code from your email:</p>
                                                        <input type='number' id='signInput'/>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        {fileContent ? <iframe src={fileContent} title='PDF' width='100%' height={window.innerHeight*0.8}></iframe> : <></>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={generateRandomNum}>Close</button>
                                                <button type="button" id='signModal' className="btn btn-primary" hidden={false} onClick={handleSign}>Confirm signature</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No contracts assigned!</td>
                      </tr>
                    )}
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </>
    );
}
