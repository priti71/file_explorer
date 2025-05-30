import { useState } from "react";

function Folder({ explorer, handleNode }) {
  console.log("explorer data", explorer);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const handleFolder = (e, isFolder) => {
    setExpand(true);
    e.stopPropagation();

    setShowInput({
      visible: true,
      isFolder,
    });
  };
  const addNewFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁{explorer.name}</span>
          <div>
            <button onClick={(e) => handleFolder(e, true)}>Folder +</button>{" "}
            <button onClick={(e) => handleFolder(e, false)}>File +</button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {" "}
          {showInput.visible && (
            <div>
              {showInput.isFolder ? "📁" : "📄"}
              <input
                type="text"
                onKeyDown={addNewFolder}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              ></input>
            </div>
          )}
          {explorer.items.map((exp) => (
            <Folder handleNode={handleNode} explorer={exp} key={exp.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
}
export default Folder;
