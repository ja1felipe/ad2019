import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Routes from './routes';
import Spinner from './components/Spinner';
function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Spinner />}>
          <ReactNotification />
          <GlobalStyle />
          <Routes />
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
