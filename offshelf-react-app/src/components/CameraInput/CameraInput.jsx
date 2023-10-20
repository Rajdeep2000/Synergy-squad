import React, { useState } from 'react';
import {
  Button
} from '@carbon/react';
import Webcam from "react-webcam";
import { ArrowLeft, Camera, Checkmark, Scan, ScanAlt } from '@carbon/icons-react';
import { Link, useNavigate } from 'react-router-dom';

const CameraInput = ({ image, setImage }) => {
  const [savedImage, setSavedImage] = useState();
  const navigate = useNavigate();
  const [productName, setProductName] = useState();
  const [password, setDays] = useState();
  const [productType, setProductType] = useState();
  const isMobile = window.matchMedia("(max-width: 767px)").matches ? true: false;
  const videoConstraints = {

    // facingMode: { exact: "environment" }
    facingMode: isMobile ? "environment":"user"
  };
  return (
    <div className='form-container-camera'>
      <div className='btn-div'>
        <Button style={{ borderRadius: '50px' }} className='btn-cancel' kind='default' onClick={e => { navigate('/form/new') }} renderIcon={ArrowLeft} hasIconOnly ></Button> </div>
      {(!savedImage ? <div className='img-container' style={{backgroundColor: 'black'}}><Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <div className='btn-container camera-btn-container' >
            <Button
            style={{width:'100vw'}}
              className='camera-save-btn'
              onClick={() => {
                const imageSrc = getScreenshot();
                setImage(imageSrc);
                setSavedImage(imageSrc);
                console.log(imageSrc)
                console.log(image)
                navigate("/form/output")
              }}
              renderIcon={ScanAlt}
            >
              Capture
            </Button>
          </div>
        )}
      </Webcam></div> : navigate("/form/output", { setImage: image })
        // <div>
        //   <div className='img-container'>
        //     <img src={savedImage} className='img-captured' />
        //   </div>
        //   <br />
        //   <div className='text-container'>
        //     <div className='inline-text'>
        //       <span className='text-left' onChange={e => { setProductName(e.target.value) }}>Carrot</span>
        //       <span className='text-right' onChange={e => { setDays(e.target.value) }}>7 days</span>
        //     </div>
        //     <div className='bottom-text' onChange={e => { setDays(e.target.value) }}>Vegetables</div>
        //   </div>
        //   <br />
        //   <div className='button-footer'>
        //     <Button onClick={e => { setSavedImage() }} renderIcon={Camera} className='scan-again'>Scan again</Button>
        //     <Button onClick={e => { navigate("/form/output") }} className='img-saved' renderIcon={Checkmark} >Save</Button>
        //   </div>
        //   {/* <div className="button-container" >
        //     <Button >Next</Button>
        //     <Button kind="tertiary" onClick={e => { setSavedImage() }}>Retake</Button>
        //     <Button kind="secondary">Back</Button>
        //   </div> */}
        // </div>

      )}
    </div>)
}

export default CameraInput;