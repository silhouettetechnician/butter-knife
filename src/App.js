import React from 'react';
import { useRoutes } from 'hookrouter';
import routes from './routes'
import Layout from './components/Layout'

import './App.css';

const App = () => {
  const routeResult = useRoutes(routes);
  return (
    <Layout>
    {routeResult || <p>Not found</p>}
    </Layout>
  );
}

export default App;
