import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

if ((module as any).hot) {
  (module as any).hot.accept();
}

registerServiceWorker();
