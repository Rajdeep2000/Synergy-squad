import React, { useState } from 'react';
import {
  Button, ClickableTile, Loading, Tile, ToastNotification
} from '@carbon/react';
import Webcam from "react-webcam";
import CameraInput from '../CameraInput';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Checkmark, Renew, ResultNew } from '@carbon/icons-react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';
import wordsToNumbers from 'words-to-numbers';

const VoiceInput = ({name, setName,type}) => {
  const [error, setError] = useState();
  const [msg,setMsg] = useState();
  const [loading, setLoading] = useState();
  const [tempName, setTempName] = useState();  

  const generateText = async(blob) => {
    try{
      setMsg();
      console.log(blob);
      const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    setLoading(true);
    const formData = new FormData();
    console.log('append');
    formData.append('title', `test`);
    console.log('importing file');
    formData.append('audio_file',blob);
    console.log(formData);
    const {data} = await axios.post(apiConfig.audio, formData,{
    headers: {
        'content-type': 'multipart/form-data'
    }}
    ); 
    console.log('done');
    console.log(data);
    setLoading(false);
    if(data?.data){
    if(type==='quantity'){
      setTempName(wordsToNumbers(data?.data));
    }
    else if(type==='expiry' && data.data){
      let temp = [];
      data.data.split(" ").map(d=>{
        temp.push(wordsToNumbers(d))
      })
      setTempName(temp.join('/'));
    }
    else{
    setTempName(data?.data);
    }
  }
  else{
    setMsg('No results! Try again')
  }
    /* setTimeout(()=>{
      setName(data);
    },3000);
    */
    }
    catch (err) {
      if (await err.response) {
        const str = await Object.values(err.response?.data).join('\n');
        setError(str);
      }
      else {
        setError("Unexpected error occurred")
      }
      setLoading(false)
    }
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={generateText}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => {setError(err.toString())}}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      // showVisualizer={true}
      />
      <br />
      {loading && <Loading/>}
      <div className='voice-button-container'>
        <Button kind="tertiary" onClick={e=>{setMsg();setTempName()}}hasIconOnly renderIcon={Renew} iconDescription='Retry'></Button>
        <Button kind="tertiary" onClick={e=>{setName(tempName)}}hasIconOnly renderIcon={Checkmark} iconDescription='Accept'></Button>
      </div>
      <div>{tempName}</div>
      {error && <ToastNotification onCloseButtonClick={() => setError()} role="status" title="Error" subtitle={error} kind="error" lowContrast={true} />}
    </>
  );
}

export default VoiceInput;
