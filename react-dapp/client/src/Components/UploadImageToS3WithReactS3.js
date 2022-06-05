import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;


const S3_BUCKET ='contratospae';
const REGION ='eu-west-3';
const ACCESS_KEY ='AKIAWCVOKIGW3OGEOBB2';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setname] = useState();
    //const [url, seturl] = useState()

    const handleFileInput = (e) => {
        console.log("LLEGA 1");
        setSelectedFile(e.target.files[0]);
    };


    const handleUpload = async(file) => {
        console.log("LLEGA 3");
        await uploadFile(file, config)
        .then(console.log("LLEGAA"))
            .then(data => handlePost(data.location))
            .catch(err => console.error(err))

    };

    const handlePost = async(url) => {
        console.log(url);
        let new_contract = {
            contractname : name,
            contractpdf : url,
        };
        let resultPost = await fetch("https://vast-peak-05541.herokuapp.com/api/contracts", {
                        body: JSON.stringify(new_contract),
                        method:'POST',
                        headers:{
                            "Content-Type":'application/json',
                        },
                    });

        const cmp_id = localStorage.getItem("id");
        console.log(cmp_id);
        let compcont = {
            companyContractsuploaded: name
        };
        let resultPost2 = await fetch("https://vast-peak-05541.herokuapp.com/api/companies/" + cmp_id, {
                    body: JSON.stringify(compcont),
                        method:'PUT',
                        headers:{
                            "Content-Type":'application/json',
                        },
                    });
        const data = await resultPost.json();
        console.log(resultPost2.json());
    };

    const doublecall = async (file) => {
        console.log(name);
        handleUpload(file);
    };

    const doublecall2 = async (file) => {
        const x = localStorage.getItem("id");
        console.log(x);
    };

    return <div>
        <div>React S3 File Upload</div>
        <p>Contract name</p>
        <input type="text" onChange={e => setname(e.target.value)}/>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => doublecall(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;
