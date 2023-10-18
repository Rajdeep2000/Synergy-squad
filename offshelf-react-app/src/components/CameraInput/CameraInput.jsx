import React, { useState } from 'react';
import {
  Button
} from '@carbon/react';
import Webcam from "react-webcam";
import { ArrowLeft, Camera, Checkmark, Scan, ScanAlt } from '@carbon/icons-react';
import { Link, useNavigate } from 'react-router-dom';
const videoConstraints = {
  width: 1280,
  height: 720,
  // facingMode: { exact: "environment" }
  facingMode: "user"
};
const CameraInput = ({ }) => {
  const [image, saveImage] = useState();
  const navigate = useNavigate();
  return (
    <div className='form-container'>
      <div className='btn-div'>
        <Button style={{borderRadius: '50px'}}className='btn-cancel' kind='default' onClick={e => { navigate('/form/new') }} renderIcon={ArrowLeft} hasIconOnly ></Button> </div>
      {(!image ? <div className='img-container'><Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <div className='btn-container'>
            <Button
              className='camera-save-btn'
              onClick={() => {
                const imageSrc = getScreenshot();
                saveImage(imageSrc);
                console.log(imageSrc)
              }}
              renderIcon={ScanAlt}
            >
              Capture
            </Button>
          </div>
        )}
      </Webcam></div> :
        <div>
          <div className='img-container'>
            <img src={image} className='img-captured' />
          </div>
          <br />
          <div className='text-container'>
            <div className='inline-text'>
              <span className='text-left'>Carrot</span>
              <span className='text-right'>7 days</span>
            </div>
            <div className='bottom-text'>Vegetables</div>
          </div>
          <br />
          <div className='button-footer'>
            <Button onClick={e => { saveImage() }} renderIcon={Camera} className='scan-again'>Scan again</Button>
            <Button onClick={e => { navigate("/form/output") }} className='img-saved' renderIcon={Checkmark} >Save</Button>
          </div>
          {/* <div className="button-container" >
            <Button >Next</Button>
            <Button kind="tertiary" onClick={e => { saveImage() }}>Retake</Button>
            <Button kind="secondary">Back</Button>
          </div> */}
        </div>

      )}

    </div>)
}

export default CameraInput;