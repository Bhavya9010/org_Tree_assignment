import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import api from '../api';

const transformData = (people, parentId = null) => {
  const children = people.filter(p => p.parent === parentId);
  return children.map(child => ({
    name: child.name,
    attributes: { id: child.id },
    children: transformData(people, child.id),
  }));
};

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const treeRef = useRef(null);

  useEffect(() => {
    api.get('people/')
      .then(res => {
        const transformed = transformData(res.data);
        setTreeData(transformed);
      })
      .catch(() => alert("Failed to load tree data"));
  }, []);

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      {treeData.length > 0 ? (
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: 400, y: 50 }}
          collapsible={true}
          pathFunc="elbow"
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          ref={treeRef}
        />
      ) : (
        <p>Loading tree...</p>
      )}
    </div>
  );
};

export default TreeView;
