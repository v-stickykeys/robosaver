import React from 'react';

function Home(props) {
  return (
    <div className="Home">
      <div onClick={props.connect}>Connect</div>
    </div>
  );
}

export default Home;
