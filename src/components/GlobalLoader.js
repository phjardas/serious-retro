import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function GlobalLoader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={80} color="secondary" />
    </div>
  );
}
