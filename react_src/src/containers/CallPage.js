import React, {useEffect, useRef, useState} from 'react';

const concat = (buffer1, buffer2) => {
    const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

    return tmp.buffer;
};
const withWaveHeader = (data, numberOfChannels, sampleRate) => {
    const header = new ArrayBuffer(44);

    const d = new DataView(header);

    d.setUint8(0, "R".charCodeAt(0));
    d.setUint8(1, "I".charCodeAt(0));
    d.setUint8(2, "F".charCodeAt(0));
    d.setUint8(3, "F".charCodeAt(0));

    d.setUint32(4, data.byteLength / 2 + 44, true);

    d.setUint8(8, "W".charCodeAt(0));
    d.setUint8(9, "A".charCodeAt(0));
    d.setUint8(10, "V".charCodeAt(0));
    d.setUint8(11, "E".charCodeAt(0));
    d.setUint8(12, "f".charCodeAt(0));
    d.setUint8(13, "m".charCodeAt(0));
    d.setUint8(14, "t".charCodeAt(0));
    d.setUint8(15, " ".charCodeAt(0));

    d.setUint32(16, 16, true);
    d.setUint16(20, 1, true);
    d.setUint16(22, numberOfChannels, true);
    d.setUint32(24, sampleRate, true);
    d.setUint32(28, sampleRate * 1 * 2);
    d.setUint16(32, numberOfChannels * 2);
    d.setUint16(34, 16, true);

    d.setUint8(36, "d".charCodeAt(0));
    d.setUint8(37, "a".charCodeAt(0));
    d.setUint8(38, "t".charCodeAt(0));
    d.setUint8(39, "a".charCodeAt(0));
    d.setUint32(40, data.byteLength, true);

    return concat(header, data);
};

const CallPage = () => {
    const socketRef = useRef(null);
    const audioRef = useRef(new AudioContext());
    const audioContext = new AudioContext();
    const [blobData, setBlobData] = useState(null)
    // const opusEncoder = new OpusRecorder(audioContext);

    let audio;

    useEffect(() => {
        setupAudioRecording();
        audio = document.getElementById('audio')
        // Connect to the WebSocket endpoint
        socketRef.current = new WebSocket('ws://your-django-backend.com/voice-call/');

        // Handle incoming WebSocket messages
        socketRef.current.onmessage = (event) => {
            const data = event.data;

        };

        return () => {
            stopAudioRecording();
            // Clean up the WebSocket connection on unmount
            socketRef.current.close();
        };
    }, []);
    let recorder;

    const setupAudioRecording = async () => {
        audioRef.current = new AudioContext();
        await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 44100, channelCount: 2 } })
            .then((stream) => {
                recorder = new MediaRecorder(stream);
                recorder.start(2000)
                console.log("set up")



                    recorder.addEventListener('dataavailable',  async ({ data }) => {

                    // const blob = new Blob([data], { type: 'audio/mp3' });
                    // let dataUrl  = URL.createObjectURL(blob);
                    //
                    //
                    //     console.log(dataUrl)
                    // console.log(blob.type);
                    // audio.src = dataUrl

                        const audioData = (await (await data.stream()).getReader().read()).value;
                        const headerSize = 44; // The size of the custom header in bytes

                        const arrayBuffer = await audioBlob.arrayBuffer();


// Create a new ArrayBuffer with the size of the header + audio data
                        const totalSize = headerSize + audioData.byteLength;
                        const audioBufferWithHeader =  audioContext.createBuffer(
                            1, // Number of audio channels (e.g., 1 for mono, 2 for stereo)
                            audioData.byteLength,   // Total number of audio frames (samples)
                            44100    // Sample rate of the audio data (e.g., 44100 Hz)
                        );


// Create a view for the custom header
                        const headerView = new Uint8Array(audioBufferWithHeader, 0, headerSize);

// Create a view for the audio data
                        const audioDataView = new Uint8Array(audioBufferWithHeader, headerSize);

// Set your custom header values
// Modify the headerView with the appropriate values for your custom header format

// Copy the audio data into the audioDataView
                        audioDataView.set(new Uint8Array(audioData));

                        try {
                            // Decode the audio data
                            console.log((await (await data.stream()).getReader().read()).value);
                            const audioBuffer = await audioContext.decodeAudioData(audioBufferWithHeader);

                            // Create a buffer source and connect it to the audio context destination
                            const source = audioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(audioContext.destination);

                            // Start playing the audio
                            source.start();
                        } catch (error) {
                            console.error('Error decoding audio data:', error);
                        }

                    // audio.play();
                });

            })
            .catch((error) => {
                console.log('Error accessing microphone:', error);
            });
    };


    const stopAudioRecording = () => {
        audioRef.current.close();
    };

    // const playAudioData = async (data) => {
    //     const audioBuffer = await audioRef.current.decodeAudioData(data);
    //     const source = audioRef.current.createBufferSource();
    //     source.buffer = audioBuffer;
    //     source.connect(audioRef.current.destination);
    //     source.start();
    // };

    const initiateCall = () => {
        const callRequest = {
            action: 'initiate_call',
            // Include any necessary information for call initiation
            // ...
        };
        socketRef.current.send(JSON.stringify(callRequest));
    };

    return (
        <div>
            <button onClick={initiateCall}>Initiate Call</button>
            <audio id="audio" controls></audio>
        </div>
    );
};




export default CallPage;