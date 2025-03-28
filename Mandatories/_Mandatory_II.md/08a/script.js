let localStream;
let peerConnection;
const socket = new WebSocket('ws://localhost:3000'); // signaling server

const config = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
  });

socket.onmessage = async ({ data }) => {
  const message = JSON.parse(data);

  if (message.type === 'offer') {
    await setupPeer();
    await peerConnection.setRemoteDescription(message.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.send(JSON.stringify({ type: 'answer', answer }));
  } else if (message.type === 'answer') {
    await peerConnection.setRemoteDescription(message.answer);
  } else if (message.type === 'ice') {
    await peerConnection.addIceCandidate(message.candidate);
  }
};

async function startCall() {
  await setupPeer();

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.send(JSON.stringify({ type: 'offer', offer }));
}

async function setupPeer() {
  peerConnection = new RTCPeerConnection(config);

  peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.send(JSON.stringify({ type: 'ice', candidate: event.candidate }));
    }
  };

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });
}
