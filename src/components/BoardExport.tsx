import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

interface Props {
  exportBoard(type: string): void;
}

export default (props: Props) => {
  const { exportBoard } = props;

  return (
    <Dropdown item text="Export as&hellip;">
      <Dropdown.Menu>
        <Dropdown.Item text="Markdown" onClick={() => exportBoard('markdown')} />
      </Dropdown.Menu>
    </Dropdown>
  );
};
