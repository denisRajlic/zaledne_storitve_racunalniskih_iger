import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io.connect(ENDPOINT);

    socket.on('updateScore', data => {
      console.log(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;