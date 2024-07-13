// main.js
const socket = io();
const startButton = document.getElementById('startButton');
const muteButton = document.getElementById('muteButton');
const stopButton = document.getElementById('stopButton');
const buttonsDiv = document.getElementById('buttons');
const roomInput = document.getElementById('roomInput');
let localStream;
let peers = {};
let isMuted = false;

const configuration = {
    'iceServers': [
        { 'urls': 'stun:stun.l.google.com:19302' }
    ]
};

startButton.onclick = async () => {
    const roomName = roomInput.value;
    if (!roomName) {
        alert('Please enter a room name.');
        return;
    }

    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    socket.emit('join', roomName);

    socket.on('all-users', (users) => {
        users.forEach(userId => {
            const peerConnection = new RTCPeerConnection(configuration);
            peers[userId] = peerConnection;

            peerConnection.addStream(localStream);

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('signal', {
                        signal: { candidate: event.candidate },
                        to: userId
                    });
                }
            };

            peerConnection.onaddstream = (event) => {
                const remoteAudio = new Audio();
                remoteAudio.srcObject = event.stream;
                remoteAudio.play();
            };

            peerConnection.createOffer().then((offer) => {
                return peerConnection.setLocalDescription(offer);
            }).then(() => {
                socket.emit('signal', {
                    signal: { description: peerConnection.localDescription },
                    to: userId
                });
            });
        });
    });

    socket.on('signal', async (data) => {
        const { signal, from } = data;
        if (!peers[from]) {
            const peerConnection = new RTCPeerConnection(configuration);
            peers[from] = peerConnection;

            peerConnection.addStream(localStream);

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('signal', {
                        signal: { candidate: event.candidate },
                        to: from
                    });
                }
            };

            peerConnection.onaddstream = (event) => {
                const remoteAudio = new Audio();
                remoteAudio.srcObject = event.stream;
                remoteAudio.play();
            };
        }

        const peerConnection = peers[from];

        if (signal.description) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.description));
            if (signal.description.type === 'offer') {
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socket.emit('signal', {
                    signal: { description: peerConnection.localDescription },
                    to: from
                });
            }
        } else if (signal.candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
    });

    startButton.style.display = 'none';
    buttonsDiv.style.display = 'flex';
};

muteButton.onclick = () => {
    if (isMuted) {
        localStream.getAudioTracks()[0].enabled = true;
        muteButton.textContent = 'Mute';
    } else {
        localStream.getAudioTracks()[0].enabled = false;
        muteButton.textContent = 'Unmute';
    }
    isMuted = !isMuted;
};

stopButton.onclick = () => {
    Object.keys(peers).forEach(peerId => {
        peers[peerId].close();
        delete peers[peerId];
    });

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }

    socket.emit('signal', { description: null });

    buttonsDiv.style.display = 'none';
    startButton.style.display = 'block';
};
