import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Preview from "../components/Preview";
import "../styles/home.css";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedNodes, setHighlightedNodes] = useState([]); 

  const handleSelectItem = (item, parentIds) => {
    setSelectedItem(item);
    setHighlightedNodes(parentIds); 
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClosePreview = () => {
    setSelectedItem(null); 
    setHighlightedNodes([]); 
  };

  return (
    <div className="home">
      <Navbar onSearch={handleSearch} />
      <div className="content">
        <Sidebar
          onSelectItem={handleSelectItem}
          searchQuery={searchQuery}
          highlightedNodes={highlightedNodes} 
          selectedItem={selectedItem}
        />
        <div className="preview-area">
          {selectedItem ? (
            <Preview item={selectedItem} onClose={handleClosePreview} />
          ) : (
            <div className="no-selection">Select an item to preview</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;