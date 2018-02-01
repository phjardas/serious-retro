import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

export interface Props {
  title?: string;
  children: React.ReactNode;
}

export default (props: Props) => {
  const { title, children } = props;
  return (
    <div>
      <Helmet>
        <title>{title ? `${title} - ` : ''}Serious Retrospective</title>
      </Helmet>
      <Menu fixed="top" inverted>
        <Container fluid>
          <Menu.Item as={Link} to="/">
            {title || 'Serious Retrospective'}
          </Menu.Item>
        </Container>
      </Menu>
      <div style={{ marginTop: 40 }}>{children}</div>
    </div>
  );
};
