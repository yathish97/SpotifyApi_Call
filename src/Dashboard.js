import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Dashboard(props) {
  const [searchKey, setSearchKey] = useState("");
  const Token = props.TOKEN;
  const Device_ID= "123";
  const Logout = () => {
    props.LOGOUT();
  };
  const searchDevice = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log(data);
  };
  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });
    console.log(data);
  };

  const PlayTrack = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `https://api.spotify.com/v1/me/player/play&device_id=${Device_ID}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        params: {
          context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
          offset: {
            position: 5,
          },
          position_ms: 0,
        },
      }
    );

    console.log(data);
  };

  return (
    <div>
      <h4>Dashboard</h4>
      <form onSubmit={searchTracks}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <Container className="App">
        <button onClick={searchDevice}>Device</button>
        <button onClick={PlayTrack}>play</button>
        <button onClick={Logout}>logout</button>
      </Container>
    </div>
  );
}

export default Dashboard;
