import * as React from 'react';
import { Container, List, SemanticICONS } from 'semantic-ui-react';

interface Export {
  id: string;
  icon: SemanticICONS;
  label: string;
}

const exportOptions: Export[] = [
  { id: 'markdown', icon: 'file text outline', label: 'Markdown' },
  { id: 'html', icon: 'html5', label: 'HTML' },
];

export interface Props {
  exportBoard(exporter: string): void;
}

export default (props: Props) => {
  return (
    <Container>
      <p>Select a method to export your retrospective:</p>
      <List relaxed selection>
        {exportOptions.map(ex => <List.Item key={ex.id} icon={ex.icon} content={ex.label} onClick={() => props.exportBoard(ex.id)} />)}
      </List>
    </Container>
  );
};
