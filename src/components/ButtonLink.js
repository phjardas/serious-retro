import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(({ spacing }) => ({
  icon: {
    marginRight: spacing(1),
  },
}));

function ButtonLink({ component, icon, children, ...props }) {
  const classes = useStyles();
  const Component = component;
  const Icon = icon;

  return (
    <Component {...props} component={Link}>
      {Icon && <Icon className={classes.icon} />}
      {children}
    </Component>
  );
}

ButtonLink.defaultProps = {
  component: Button,
};

export default ButtonLink;
