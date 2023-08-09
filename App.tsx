import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './Redux';
import MainNavigation from './Navigation';
import AxiosConfigure from './Api/AxiosConfigure';

const App = () => {
  useEffect(() => {
    AxiosConfigure();
  }, []);

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
