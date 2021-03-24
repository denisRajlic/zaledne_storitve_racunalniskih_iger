import React, { useState, useEffect, Fragment } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

function Games({ location }) {
	const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const path = location.pathname.slice(1);
    const socket = io.connect(ENDPOINT);

    socket.emit('joinRoom', path);

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
      <h1>Leaderboards - {location.pathname.slice(1).toUpperCase()}</h1>
      {sorted.map((player, index) => (
        <Fragment key={index}>
          <p><span className="username">{player.user.username}</span> : {player.xp} xp</p>
        </Fragment>
      ))}
    </>
	)
}

export default Games

