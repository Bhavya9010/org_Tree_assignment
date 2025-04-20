import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const PersonForm = () => {
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const [people, setPeople] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('people/')
      .then(res => setPeople(res.data))
      .catch(() => setError('Failed to fetch people list'));

    if (id) {
      api.get(`people/${id}/`)
        .then(res => {
          setName(res.data.name);
          setParent(res.data.parent || '');
        })
        .catch(() => setError('Failed to load person data'));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const payload = { name, parent: parent || null };

    const req = id
      ? api.put(`people/${id}/`, payload)
      : api.post('people/', payload);

    req
      .then(() => navigate('/'))
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.detail || 'Error saving person');
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>{id ? 'Edit' : 'Add'} Person</h2>

        {error && <div className="error">{error}</div>}

        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label>Parent</label>
        <select value={parent || ''} onChange={(e) => setParent(e.target.value)}>
          <option value="">No Parent</option>
          {people.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PersonForm;
