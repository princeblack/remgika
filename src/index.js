import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(<Provider store={store}>
    <App />
    <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADwKVOI7pGKkLCxhJy4B_Rjw03DG56WwI&libraries=places&callback=initMap"
        ></script>
  </Provider>,
  document.getElementById('root'));