const socket = io();
let localStream;
let peerConnection;

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
document.getElementById("startBtn").onclick = start;
document.getElementById("callBtn").onclick = call;

async function start() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;
}

async function call() {
  peerConnection = new RTCPeerConnection(config);

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.onicecandidate = ({ candidate }) => {
    if (candidate) socket.emit("ice-candidate", candidate);
  };

  peerConnection.ontrack = ({ streams: [stream] }) => {
    remoteVideo.srcObject = stream;
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("offer", offer);
}

socket.on("offer", async offer => {
  peerConnection = new RTCPeerConnection(config);

  peerConnection.onicecandidate = ({ candidate }) => {
    if (candidate) socket.emit("ice-candidate", candidate);
  };

  peerConnection.ontrack = ({ streams: [stream] }) => {
    remoteVideo.srcObject = stream;
  };

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("answer", answer);
});

socket.on("answer", async answer => {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on("ice-candidate", async candidate => {
  if (candidate) {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }
});
