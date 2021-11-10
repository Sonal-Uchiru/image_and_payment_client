import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import saveAs from "save-as";
import { Document, Page } from 'react-pdf';


// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


export default function MediaHandling() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageName, setImageName] = useState("");
  const [newclass, setClass] = useState("");

  // important
  function importImage() {
    const storageRef = ref(storage, `images/${file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        if (prog >= 100) {
          setClass("bg-success");
        } else {
          setClass("");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function retrieveimage() {
    const storageRef = ref(storage, `images/${file[0].name}`);
    getDownloadURL(storageRef).then((url) => setImageName(url));
    console.log(imageName);
  }



  
  function downloadFile() {
    //window.location.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8ODg4AAAAICAjh4eF9fX0zMzNOTk7X19cqKiphYWGsrKwKCgr7+/vm5uZ0dHS8vLzu7u5DQ0OdnZ3Nzc1TU1OTk5O/v7+GhoZJSUl5eXlYWFi2trZmZmbx8fEmJiZubm45OTkeHh4YGBjIyMijo6Ourq6YmJiDg4OqYIa4AAAEDUlEQVR4nO3cWWOiMBQFYLmIomLdWxds1S76/3/hAC4VSpxOPc690vM985AjCTcJkVqNiIiIiIiIiIiIiIiIiIiIiIiIiIiIiOiXCTtBoN2GGxr3JPGi3Yyb6bdEIs/zX7UbciNhQ8RLSUO7KbexO+RLEja123ILz41jviThXLs1N1CXz4CevGs3B68uvneWMNRuD9xzLmAk2u3Ba5110UoOwyAXsIKdNCwEbGk3CK5RSNjXbhBavxCwehOaVtVH4bgQsHorp16+UlTvMVNLl0snvgy02wOXKxW+1LXbg9c5n3FXMWCyKjwbg9Xroon2adlbwadoZnHYuJBh5ergwUL8dHdtMdZuyM2s5HUYxM/azaDvCePRNAge4wsDrt4Jmpuk067b0/jOKsfgvSmf2nG35JqnbL9b/CiK9pfN3/57O3/qLY33WdnTAMtC68OdSG4Ct79sVPZTmDNuSH79sC8P0fZU4LudRjHeKaT9ncVuuyTffhIqs04y2Ab9pTguyTK2jA/Isbvx6Y3cc1+RXfShHeKSUWnn+0cy1Y7hFly+Pd+OaHbKCgqYRHzUjlJuiwqYRDRZGp9wAZPHjcHC+Ix4yBwDvlgsGU1gH11qhynTBwa0WS1yrwSvC2jzQfoOu4Wy085SDnYLZaIdpRysUvgWy0RqApvNmCz1aS1EBWxrR3H4gCW0ug2+BCWUlXYSF9SEzewL4QfQLfQ32klcULXC6GymhlsYitm3GT1UQqPVHrZwijztIE4bzKRUZtpBnEDFwubCN4NK2NMO4lT5GQ0soeFeCko41A7iBBqHhg98+6iJt9mKv678rG1R+Zk36p2T3dOmI9gmhsXXFSnYXqLV3eBaHbfhbfVpikto9f02qlzYHYk7XEKjj1Pky0Ob/2QbIF/h2zz3BdrH2EfsaKcpMwXeRE9G2nFKvCET2tzOAB41SSMaPKC4gt5ET2RqbXaD7aZZRmtLKWw39QzuD0OfplnCWDtSAW59cUxobSDWZuBnjb2KgTx86dl84f0KnLl5staOU6IDnbk9accpgzueaPXMAvAmmisVB7CRaPb7ZrhdRaPn92A10fDHv0CHo+RBO4jbIyKiuVVFTuv6iFY3FA8A/dTqpvDR1Yf2Zasd4W+uPPJt+LjCUfeqyVskd/A1gvCam2i31p+7Yn5q9C9PX/z4vb4stJv+Xc6z+5GffUXBFdD+U+akXRIx+zbEZjZptuTL9xTuLmDJwegk1Co+zjcH/d7Xv+Wb/b+MQ6fwZYxh8fOI8TqXUUy+cbroYSL7ypgOvXnZTCxcHbpr2n/bhtcTTmGQfSdi03N+3bLbn6/TS5rbe8yX6Q6s/lWLiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIfq8/tzAurNL1lJsAAAAASUVORK5CYII="
    setImageName(
      "https://firebasestorage.googleapis.com/v0/b/reactapptest-10711.appspot.com/o/images%2F0e0bfc4c3913a983885c646fbb31e564.jpg?alt=media&token=16ba1e95-3daa-4c75-bf5c-c5d411f9b402"
    );
    var xhr = new XMLHttpRequest();

    xhr.responseType = "blob";
    xhr.onload = function (event) {
      var blob = xhr.response;
    };
    xhr.open("GET", imageName);
    xhr.send();
    console.log(xhr);

    // let blob = new Blob([imageName], { type: 'text/plain;charset=utf-8' })
    // saveAs(blob, 'hello world.txt')
  }

  return (
    <div>
      <br />
      {/* <PDFViewer
            document={{
                url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
            }}
        /> */}
      {/* <Document
        file="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/viewer.html?pdfurl=http%3A%2F%2Fwww.africau.edu%2Fimages%2Fdefault%2Fsample.pdf&clen=3028&chunk=true"
       // onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={pageNumber} /> 
      </Document> */}
    {/* <div
    style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '750px',
    }}
>
    <Viewer fileUrl="https://firebasestorage.googleapis.com/v0/b/reactapptest-10711.appspot.com/o/images%2Fsample.pdf?alt=media&token=b0317b10-d494-48b3-b1c9-716217175b78" />
</div> */}
{/* abcTesting */}

      <div className="container">
        <div class="progress ">
          <div
            class={`progress-bar ${newclass}`}
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    <button onClick={() => {window.location.href= "https://firebasestorage.googleapis.com/v0/b/reactapptest-10711.appspot.com/o/images%2Fsample.pdf?alt=media&token=b0317b10-d494-48b3-b1c9-716217175b78"}}>Preview and download </button>
      <br />
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files);
        }}
      />
      <button onClick={() => importImage()}>import image</button>
      <h2>Progress : {progress}</h2>

      <button onClick={() => retrieveimage()}>get image</button>
      <img src={imageName} alt="Firebase" />
      <button onClick={() => downloadFile()}>download</button>
    </div>
  );
}
