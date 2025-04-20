import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';


const PersonList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    api.get('people/')
      .then(res => setPeople(res.data))
      .catch(() => alert('Error fetching people'));
  }, []);

  return (
    <div>
      <h2>Person List</h2>
      <Link to="/add">➕ Add Person</Link>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{people.find(parent => parent.id === p.parent)?.name || '-'}</td>
              <td>
                <Link to={`/view/${p.id}`}>View</Link> | <Link to={`/edit/${p.id}`}>Edit</Link>
                <Link to="/tree">View as Tree</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonList;
