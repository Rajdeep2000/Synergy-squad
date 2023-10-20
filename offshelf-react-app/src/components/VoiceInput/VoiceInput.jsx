import React, { useState } from 'react';
import {
  Button, ClickableTile, Loading, Tile, ToastNotification
} from '@carbon/react';
import Webcam from "react-webcam";
import CameraInput from '../CameraInput';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Checkmark, Renew, ResultNew } from '@carbon/icons-react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import apiConfig from '../../config/apiConfig.json';
import axios from 'axios';
import {text2num } from './t2n.js';
const VoiceInput = ({name, setName,type}) => {

  const [error, setError] = useState();
  const [msg,setMsg] = useState();
  const [loading, setLoading] = useState();
  const [tempName, setTempName] = useState();  
 
  const generateText = async(blob) => {
    try{
      setMsg();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', `test`);
    formData.append('audio_file',blob);
    const {data} = await axios.post(apiConfig.audio, formData,{
    headers: {
        'content-type': 'multipart/form-data'
    }}
    ); 
    setLoading(false);
    if(data?.data){
      if(type==='quantity'){
        setTempName(text2num(data?.data.trim(),'en'));
      }
      else if(type==='expiry' && data.data){
        let temp = [];
        let arr = data.data.split(" ");
        if(arr && arr[0]&&arr[1]&&arr[2]&&arr[3] &&arr[4]){
          temp.push(text2num(arr[0].trim()),'en');
          temp.push(text2num(arr[1].trim()),'en');
          temp.push(text2num(arr[2].trim()+text2num(arr[3].trim()+arr[4].trim()),'en'));        
          setTempName(temp.join('/'));
        }
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
      disabled={tempName?.length>0}
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
        <Button disabled={!tempName} kind="tertiary" onClick={e=>{setMsg();setTempName()}}hasIconOnly renderIcon={Renew} iconDescription='Retry'></Button>
        <Button  disabled={!tempName} kind="tertiary" onClick={e=>{setName(tempName)}}hasIconOnly renderIcon={Checkmark} iconDescription='Accept'></Button>
        <Button kind="tertiary" onClick={e=>{if(!name)setName(' ')}}hasIconOnly renderIcon={ArrowRight} iconDescription='Skip'></Button>
      </div>
      <div>{tempName}</div>
      {error && <ToastNotification onCloseButtonClick={() => setError()} role="status" title="Error" subtitle={error} kind="error" lowContrast={true} />}
    </>
  );
}

export default VoiceInput;
