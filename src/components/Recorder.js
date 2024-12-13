import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import './recorder.css';
const LAMBDA_URL = 'https://2mszyzrxjbhcpubodym5pwmmpm0ikldx.lambda-url.us-east-1.on.aws';

const Recorder = () => {
    const [recording, setRecording] = useState(false);
    const [sessionId, setSessionId] = useState(uuidv4()); // Generate a UUID for the session
    const [chunkIndex, setChunkIndex] = useState(0); // Track the chunk index
    const [chunks, setChunks] = useState([])
    const [isMerged, setIsMerged] = useState(false);
    const [message, setMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState('');// signed s3 url for playing the audio
    const recorderRef = useRef(null);

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract only the Base64 content
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const sendChunk = async (chunk) => {
        const chunkName = `${sessionId}_${chunkIndex}`; // Creating a unique chunk name using UUID and index
        const base64Chunk = await convertBlobToBase64(chunk);

        const payload = {
            payload: {
                chunkName,
                sessionId,
                chunkBase64: base64Chunk
            },
        };

        try {
            const response = await fetch(
                `${LAMBDA_URL}/audio/add`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload)
                }
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setMessage('Audio uploaded successfully');
        } catch (error) {
            setMessage('Audio upload failed');
            console.error('Error sending chunk:', error);
        }
    };

    const startRecording = () => {
        setMessage('');
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                recorderRef.current = recorder;

                recorder.ondataavailable = async (e) => {
                    const chunk = e.data;
                    setChunks(prev => [...prev, chunk]); // Save the chunk locally
                    await sendChunk(chunk); // Send the chunk to the backend
                    setChunkIndex(chunkIndex + 1); // Increment the chunk index
                };

                recorder.start(); // Start recording continuously
                setRecording(true);

                recorder.onstop = () => {
                    setRecording(false);
                    stream.getTracks().forEach(track => track.stop()); // Stop all tracks
                };
            })
            .catch(err => console.error('Error accessing microphone:', err));
    };

    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stop();
        }
        setRecording(false);
    };

    const handleMerge = async () => {
        try {
            setMessage('');
            const payload = {
                payload: {
                    sessionId
                },
            };
            const response = await fetch(
                `${LAMBDA_URL}/audio/merge`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload)
                }
            );
            const data = await response.json();
            setAudioUrl(data.mergedFileUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            setChunks([]);
            setMessage('Audio merged successfully');
            setIsMerged(true);
        } catch (err) {
            setMessage('Error In Merging Audio Files');
            console.error('Error merging audio:', err);
        }
    };

    const handleRemove = async () => {
        try {
            setMessage('');
            const payload = {
                payload: {
                    sessionId
                },
            };
            const response = await fetch(
                `${LAMBDA_URL}/audio/remove`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload)
                }
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            setMessage('Audio Deleted Successfully');
            setIsMerged(false);
            setChunkIndex(0);
            setAudioUrl('');
            setSessionId(uuidv4());
        } catch (err) {
            setMessage('Error In Deleting Files');
            console.error('Error merging audio:', err);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', padding: '2rem' }}>Voice Recorder</h1>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
                    <button className={`start ${recording ? 'recording' : ''}`} onClick={startRecording} disabled={recording}>Start Recording</button>
                    <button className={`stop`} onClick={stopRecording} disabled={!recording}>Stop Recording</button>
                    <button onClick={handleMerge} disabled={chunks.length === 0}>Merge Audio</button>
                    <button onClick={handleRemove} disabled={!isMerged}>Remove Merged Audio</button>
                </div>
                {audioUrl && (
                    <div style={{ marginTop: '1rem' }}>
                        <audio controls>
                            <source src={audioUrl} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                        <button onClick={() => document.querySelector('audio').play()} style={{ marginTop: '0.5rem' }}>
                            Play Audio
                        </button>
                    </div>
                )}
                <p style={{ marginTop: '2rem' }}>{message}</p>
            </div>
        </div>
    );
};

export default Recorder;
