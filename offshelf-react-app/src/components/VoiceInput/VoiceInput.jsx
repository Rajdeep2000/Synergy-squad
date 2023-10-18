import React, { useState } from 'react';
import {
  Button, ClickableTile, Tile
} from '@carbon/react';
import Webcam from "react-webcam";
import CameraInput from '../CameraInput';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from '@carbon/icons-react';
import { AudioRecorder } from 'react-audio-voice-recorder';

const VoiceInput = () => {
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <div className='voice-input-container'>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
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
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      // showVisualizer={true}
      />
      <br />
    </div>
  );
}

export default VoiceInput;
