import React from 'react';
import Country from '../Country';
import CountriesList from '../CountriesList';
import './styles.css';

export const App = () => (
  <div className="app">
    <Country editable />
    <CountriesList />
  </div>
);

export default App;
