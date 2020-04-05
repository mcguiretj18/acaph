import React from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

const initialState = {
  yourID: '',
  users: new Map(),
  stream: undefined,
  // receivingCall: false,
  // caller: '',
  // callerSignal: undefined,
  // callAccepted: false
};

const Video = styled.video`
  border: 1px solid #dedede;
  width: 50%;
  height: 50%;
`;

function App() {
  // const [state, dispatch] = React.useReducer(reducer, initialState)
  const userVideo = React.useRef();
  // const partnerVideo = React.useRef();
  const [stream, setStream] = React.useState(undefined);
  const socket = React.useRef();
  React.useEffect(() => {
    socket.current = io.connect('/');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    // socket.current.on('yourId', id => {
    //   setYourId(id);
    // });

    // socket.current.on('allUsers', users => {
    //   setUsers(users);
    // });

    // socket.current.on('hey', data => {
    //   console.log(data);
    // });
  }, []);

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideo} autoPlay />
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {UserVideo}
      </header>
    </div>
  );
}

export default App;
