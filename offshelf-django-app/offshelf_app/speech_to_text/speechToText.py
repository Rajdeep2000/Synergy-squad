import json
from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


def init():
    # Replace with your API key and endpoint
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

    return speech_to_text

def extract_text(audio_path):
    speech_to_text = init()
    # Define the audio file you want to transcribe
    # audio_path = "recorded_audio.wav"

    # Open and read the audio file

    type = "audio/webm" if audio_path.split('.')[-1] == "webm" else "audio/wav"

    with open(audio_path, 'rb') as audio_file:
        response = speech_to_text.recognize(
            audio=audio_file,
        ).get_result()

    # Extract and print the transcribed text
    results = " ".join([result['alternatives'][0]['transcript'] for result in response['results']])
    # for result in results:
    #     print(result['alternatives'][0]['transcript'])

    return results
