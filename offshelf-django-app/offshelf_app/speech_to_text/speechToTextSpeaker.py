import json
import pyaudio
import wave
from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

# Replace with your IBM Watson Speech to Text API key and endpoint
api_key = "XdvagwXKTutpt6obn7dXY2_2dMY8GmSgJZOzRQ69fl8T"
endpoint = "https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/dcd912e3-d0c0-41a2-aeb8-739b74dca459"


# Create an IAM authenticator

authenticator = IAMAuthenticator(api_key)

# Initialize the Speech to Text service
speech_to_text = SpeechToTextV1(
    authenticator=authenticator
)

# Set the service URL
speech_to_text.set_service_url(endpoint)


# Configure audio capture using PyAudio
audio_format = pyaudio.paInt16
channels = 1
sample_rate = 44100
chunk_size = 1024

audio = pyaudio.PyAudio()

stream = audio.open(
    format=audio_format,
    channels=channels,
    rate=sample_rate,
    input=True,
    frames_per_buffer=chunk_size
)

# Capture and record audio
audio_frames = []

print("Recording (Ctrl-C to stop)...")

try:
    while True:
        data = stream.read(chunk_size)
        audio_frames.append(data)
except KeyboardInterrupt:
    pass

print("Finished recording.")

# Stop and close the audio stream
stream.stop_stream()
stream.close()
audio.terminate()

# Save the recorded audio to a WAV file
output_file = "recorded_audio.wav"
with wave.open(output_file, "wb") as wf:
    wf.setnchannels(channels)
    wf.setsampwidth(audio.get_sample_size(audio_format))
    wf.setframerate(sample_rate)
    wf.writeframes(b"".join(audio_frames))

# Transcribe the recorded audio using IBM Watson Speech to Text
print("Transcribing...")
with open(output_file, 'rb') as audio_file:
    response = speech_to_text.recognize(
        audio=audio_file,
        content_type='audio/wav',
    ).get_result()

# Extract and print the transcribed text
results = response['results']
print("Finished transcribing:")
for result in results:
    print(result['alternatives'][0]['transcript'])
