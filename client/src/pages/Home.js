import React from 'react';
import Deposit from '../components/Deposit';

function Home(props) {
  const { tbtc } = props;
  return (
    <div className="Home">
      <div onClick={props.connect}>Connect</div>
      <Deposit tbtc={tbtc} />
    </div>
  );
}

export default Home;
