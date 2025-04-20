import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`people/${id}/`)
      .then(res => setPerson(res.data))
      .catch(() => alert('Error fetching person details'));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      api.delete(`people/${id}/`)
        .then(() => navigate('/'))
        .catch(() => alert('Error deleting person'));
    }
  };

  if (!person) return <p>Loading...</p>;

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Parent ID: {person.parent || 'None'}</p>
      <Link to={`/edit/${id}`}>Edit</Link> | <button onClick={handleDelete}>Delete</button> | <Link to="/">Back</Link>
    </div>
  );
};

export default PersonDetail;