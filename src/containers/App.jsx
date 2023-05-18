import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    try {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          return response.json();
        })
        .then((users) => {
          setRobots(users);
        });
    } catch (error) {
      console.error("The following error occurred ", error);
    }
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return !robots.length ? (
    <h1 className="tc">Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
}

export default App;
