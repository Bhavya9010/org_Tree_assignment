import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import api from '../api';

const transformData = (person, people) => {
  const children = people.filter(p => p.parent === person.id);
  return {
    name: person.name,
    children: children.map(child => transformData(child, people))
  };
};

const OrgTree = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('people/')
      .then(res => {
        const root = res.data.find(p => !p.parent);
        setData([transformData(root, res.data)]);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      {data.length > 0 && <Tree data={data} orientation="vertical" />}
    </div>
  );
};

export default OrgTree;