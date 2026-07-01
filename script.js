// Check browser support
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    const btn = document.getElementById("listen-btn");

    let isAssistantActive = false;

    // Text to Speech
    function speak(text) {

        recognition.stop();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";

        utterance.onend = () => {

            if (isAssistantActive) {
                recognition.start();
            }
        };

        window.speechSynthesis.speak(utterance);
    }

    // Handle Commands
    function handleCommand(command) {

        console.log("Command:", command);

        if (command.includes("open youtube")) {

            speak("Opening YouTube");
            window.open("https://www.youtube.com", "_blank");

        } else if (command.includes("open google")) {

            speak("Opening Google");
            window.open("https://www.google.com", "_blank");

        } else if (command.includes("open instagram")) {

            speak("Opening Instagram");
            window.open("https://www.instagram.com", "_blank");

        } else if (command.includes("open facebook")) {

            speak("Opening Facebook");
            window.open("https://www.facebook.com", "_blank");

        } else if (
            command.includes("how are you") ||
            command.includes("kaise ho")
        ) {

            speak("I am fine. How are you?");

        } else if (
            command.includes("what is your name") ||
            command.includes("tumhara naam kya hai")
        ) {

            speak("My name is AI Assistant");

        } else if (
            command.includes("stop") ||
            command.includes("band ho jao") ||
            command.includes("shutdown")
        ) {

            speak("Goodbye");

            isAssistantActive = false;

            btn.innerHTML = "🎙️ Start Listening";
            btn.classList.remove("listening");

            recognition.stop();

        } else {

            speak("Searching Google for " + command);

            window.open(
                `https://www.google.com/search?q=${encodeURIComponent(command)}`,
                "_blank"
            );
        }
    }

    // Button Click
    btn.addEventListener("click", () => {

        if (!isAssistantActive) {

            isAssistantActive = true;

            btn.innerHTML = "Listening... 👂";
            btn.classList.add("listening");

            speak("Hello, how can I help you?");

        }
    });

    // Recognition Result
    recognition.onresult = (event) => {

        const currentIndex = event.resultIndex;

        const command =
            event.results[currentIndex][0].transcript.toLowerCase();

        handleCommand(command);
    };

    // Error Handling
    recognition.onerror = (event) => {

        console.error(event.error);

        if (event.error === "not-allowed") {
            alert("Microphone permission denied.");
        }
    };

    // Auto Restart
    recognition.onend = () => {

        if (isAssistantActive) {
            recognition.start();
        }
    };
}