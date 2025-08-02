const micIcon = document.querySelector('.mic-icon');

const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = '';
let outputDiv;

window.onload = () => {
    outputDiv = document.createElement('div');
    outputDiv.classList.add('speech-text');
    document.body.appendChild(outputDiv);
};

micIcon.addEventListener('click', () => {
    finalTranscript = '';
    outputDiv.innerHTML = "<b>🎤 Listening...</b><br>";
    recognition.start();
});

recognition.onresult = function(event) {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            speakText(transcript); // 🔊 Speak final part
        } else {
            interimTranscript += transcript;
        }
    }

    outputDiv.innerHTML = `
    <b>🎤 You said:</b><br>
    <span style="color:#00ffcc;">${finalTranscript}</span>
    <span style="color:#999;">${interimTranscript}</span>
  `;
};

// 🔊 Text to Speech Function
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1; // speed: 0.1 (slow) to 2 (fast)
    utterance.pitch = 1; // pitch: 0 (low) to 2 (high)
    speechSynthesis.speak(utterance);
}

recognition.onerror = function(event){
    outputDiv.innerHTML=`<span style ="color:red;">Error:${event.erro}</span>`;
};

