import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';



export default function FacialExpression({setsongs}) {
    const videoRef = useRef();

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    async function detectMood() {
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        let mostProbableExpression = 0;
        let expressionName = '';

        if (!detections || detections.length === 0) {
            console.log("No face detection");
            return;
        }

        for (const expression of Object.keys(detections[0].expressions)) {
            if (detections[0].expressions[expression] > mostProbableExpression) {
                mostProbableExpression = detections[0].expressions[expression];
                expressionName = expression;
            }
        }

        // get http://localhost:3000/songs?mood=happy
        axios.get(`http://localhost:3000/songs?mood=${expressionName}`)
        .then(response=>{
            console.log(response.data);
            setsongs(response.data.songs);
        })
        console.log(expressionName);
    }

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    useEffect(() => {
        let intervalId;


        loadModels().then(startVideo);

        return () => {
            clearInterval(intervalId);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.srcObject?.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className='flex flex-col'>
            <video
                ref={videoRef}
                autoPlay
                muted
                className=' m-auto h-60 lg:h-80 rounded-4xl'
            />

            <button className='bg-blue-300 rounded-xl px-3 py-2 items-center w-fit mx-auto hover:scale-105 hover:bg-blue-400 transition-all duration-300 my-2' onClick={detectMood}>Detect Mood</button>
        </div>
    );
}
