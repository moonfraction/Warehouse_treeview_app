import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faFileAlt,
  faChevronRight,
  faDownLeftAndUpRightToCenter, // Collapse icon
} from "@fortawesome/free-solid-svg-icons"; 
import "../styles/sidebar.css";
import { BASE_URL } from "../App";


const Sidebar = ({ onSelectItem, highlightedNodes, selectedItem, searchQuery }) => {
  const [godownTree, setGodownTree] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [matchedNodes, setMatchedNodes] = useState([]);

  useEffect(() => {
    const fetchGodownTree = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/godowns/`);
        setGodownTree(response.data);
      } catch (error) {
        console.error("Error fetching godown tree:", error);
      }
    };

    fetchGodownTree();
  }, []);

  useEffect(() => {
    setSelectedItemId(selectedItem ? selectedItem._id : null); 
  }, [selectedItem]);

  useEffect(() => {
    if (searchQuery) {
      const matchedNodes = searchTree(godownTree, searchQuery);
      if (matchedNodes.length > 0) {
        const newExpandedNodes = {};
        matchedNodes.forEach((node) => {
          node.parentIds.forEach((id) => {
            newExpandedNodes[id] = true;
          });
        });
        setExpandedNodes(newExpandedNodes);
        setMatchedNodes(matchedNodes.map(node => node._id));
      } else {
        setMatchedNodes([]);
      }
    } else {
      setMatchedNodes([]);
    }
  }, [searchQuery]);

  const searchTree = (node, query, parentIds = []) => {
    if (!node) return [];
    const currentParentIds = [...parentIds, node.godown_id];
    let matchedNodes = [];

    if (node.name.toLowerCase().includes(query.toLowerCase())) {
      matchedNodes.push({ ...node, parentIds: currentParentIds });
    }

    if (node.children) {
      node.children.forEach((child) => {
        matchedNodes = matchedNodes.concat(searchTree(child, query, currentParentIds));
      });
    }

    if (node.items) {
      node.items.forEach((item) => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          matchedNodes.push({ ...item, parentIds: currentParentIds });
        }
      });
    }

    return matchedNodes;
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes((prevExpandedNodes) => ({
      ...prevExpandedNodes,
      [nodeId]: !prevExpandedNodes[nodeId],
    }));
  };

  const handleSelectItem = (item, parentIds) => {
    setSelectedItemId(item._id); 
    onSelectItem(item, parentIds); 
  };

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData("itemId", itemId);
  };

  const handleDrop = async (e, godownId) => {
    const itemId = e.dataTransfer.getData("itemId");
    try {
      await axios.put(`${BASE_URL}/api/items/move/${itemId}`, { godown_id: godownId });
      // Re-fetch the godown tree to update the UI
      const response = await axios.get(`${BASE_URL}/api/godowns/`);
      setGodownTree(response.data);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Collapse all nodes
  const collapseAll = () => {
    setExpandedNodes({});
  };

  const renderTree = (node, parentIds = [], level = 1) => {
    const currentParentIds = [...parentIds, node.godown_id]; 

    return (
      <li key={node.godown_id} className="tree-node">
        <div
          onClick={() => toggleNode(node.godown_id)}
          className={`tree-node-label ${
            expandedNodes[node.godown_id] ? "expanded" : "collapsed"
          } ${highlightedNodes.includes(node.godown_id) ? "highlighted" : ""} ${
            matchedNodes.includes(node.godown_id) ? "matched" : ""
          }`}
          style={{ "--level": level }} 
          onDrop={(e) => handleDrop(e, node.godown_id)}
          onDragOver={(e) => e.preventDefault()}
        >
          <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />

          <FontAwesomeIcon
            icon={faWarehouse}
            className="folder-icon"
          />

          {node.name}
        </div>
        <ul className={`tree-node-children ${expandedNodes[node.godown_id] ? 'expanded' : ''}`}>
          {expandedNodes[node.godown_id] && node.children && node.children.length > 0 && (
            <>
              {node.children.map((child) => renderTree(child, currentParentIds, level + 1))}
            </>
          )}
        </ul>
        <ul className={`tree-node-items ${expandedNodes[node.godown_id] ? 'expanded' : ''}`}>
          {expandedNodes[node.godown_id] && node.items && node.items.length > 0 && (
            <>
              {node.items.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleSelectItem(item, currentParentIds)}
                  style={{ cursor: "pointer", "--level": level + 1 }} 
                  className={`tree-node-item ${
                    selectedItemId === item._id ? "selected" : ""
                  } ${matchedNodes.includes(item._id) ? "matched" : ""}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item._id)}
                >
                  <FontAwesomeIcon icon={faFileAlt} className="item-icon" />
                  {item.name}
                  {item.status === 'out_of_stock' && <span className="status-dot"></span>}
                </li>
              ))}
            </>
          )}
        </ul>
      </li>
    );
  };

  return (
    <div className="sidebar">
      {godownTree ? (
        <ul className="tree-root">{renderTree(godownTree)}</ul>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
      <button className="collapse-all" onClick={collapseAll} title="Collapse All">
        <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
      </button>
    </div>
  );
};

export default Sidebar;