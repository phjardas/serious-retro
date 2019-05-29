import React from 'react';
import { useBoards } from '../api/boards';
import Layout from '../components/Layout';

export default function WelcomePage() {
  const { loading, error, boards } = useBoards();

  return (
    <Layout>
      <pre>{JSON.stringify({ loading, error, boards }, null, 2)}</pre>
      {/* <CreateBoard pending={pending} createBoard={() => dispatch(createBoard(history))} /> */}
      {/* <MyBoards boards={myBoards} /> */}
    </Layout>
  );
}
