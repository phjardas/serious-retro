import React from 'react';
import Responsive, { MediaQueryProps } from 'react-responsive';

const breakpoints = {
  tablet: 768,
  desktop: 992,
};

export const Desktop = (props: MediaQueryProps) => <Responsive {...props} minWidth={breakpoints.desktop} />;
export const NotDesktop = (props: MediaQueryProps) => <Responsive {...props} maxWidth={breakpoints.desktop - 1} />;

export const Tablet = (props: MediaQueryProps) => (
  <Responsive {...props} minWidth={breakpoints.tablet} maxWidth={breakpoints.desktop - 1} />
);

export const Mobile = (props: MediaQueryProps) => <Responsive {...props} maxWidth={breakpoints.tablet - 1} />;
export const NotMobile = (props: MediaQueryProps) => <Responsive {...props} minWidth={breakpoints.tablet} />;
