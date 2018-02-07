import * as React from 'react';
import { Container, Icon, Segment } from 'semantic-ui-react';

export default () => (
  <Segment vertical inverted style={{ marginTop: '1rem' }}>
    <Container fluid style={{ paddingLeft: '1rem' }}>
      written by Philipp Jardas{' '}
      <a href="https://github.com/phjardas/serious-retro" target="_blank">
        <Icon name="github" />
        Source code on GitHub
      </a>
    </Container>
  </Segment>
);
