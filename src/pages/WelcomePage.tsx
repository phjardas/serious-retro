import * as React from 'react';
import { connect } from 'react-redux';

import { State, createBoard } from '../redux';

const WelcomePage = (props: any) => {
  const { boards, dispatch, history } = props;
  return (
    <div>
      <p>Welcome</p>
      <p>
        <button onClick={() => dispatch(createBoard(history))}>create new board</button>
      </p>
      <pre>{JSON.stringify(boards, null, 2)}</pre>
    </div>
  );
};

export default connect((state: State) => ({ boards: state.boards }))(WelcomePage);
