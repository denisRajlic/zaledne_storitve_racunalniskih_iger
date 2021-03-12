import React, { useState, useEffect, Fragment } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

function App() {
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const socket = io.connect(ENDPOINT);

    socket.on('updateScore', data => {
      console.log(data);
      // Sort by xp points
      setSorted(Array.from(data.players).sort((a, b) => a.xp > b.xp ? -1 : 1));
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <h1>Leaderboards</h1>
      {sorted.map((player, index) => (
        <Fragment key={index}>
          <p><span className="username">{player.user.username}</span> : {player.xp} xp</p>
        </Fragment>
      ))}
    </>
  );
}

export default App;