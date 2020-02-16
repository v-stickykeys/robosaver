import React from 'react';
import Modal from '../components/Modal';

import { colors } from '../lib';

const styles = {
  container: {
    backgroundColor: colors.background,
    height: '100vh',
  }
};

function Home(props) {
  const { connect, tbtc } = props;
  return (
    <div style={styles.container} className="Home">
      <div onClick={props.connect}>Connect</div>
      <Modal {...props} />
    </div>
  );
}

export default Home;
