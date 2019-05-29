import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import ButtonLink from './ButtonLink';

const site = 'Serious Retrospective';

export default function Layout({ title, children }) {
  return (
    <>
      <Helmet>
        <title>
          {title ? `${title} - ` : ''}
          {site}
        </title>
      </Helmet>
      <AppBar position="static">
        <Toolbar>
          <ButtonLink component={Typography} to="/" variant="h6" color="inherit">
            {title || site}
          </ButtonLink>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </>
  );
}
