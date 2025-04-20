import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForms';
import PersonDetail from './components/PersonDetail';
import TreeView from './components/TreeView';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonList />} />
        <Route path="/add" element={<PersonForm />} />
        <Route path="/edit/:id" element={<PersonForm />} />
        <Route path="/view/:id" element={<PersonDetail />} />
        <Route path="/tree" element={<TreeView />} />
      </Routes>
    </Router>
  );
};

export default App;