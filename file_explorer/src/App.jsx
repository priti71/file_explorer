import { useState } from "react";
import explorer from "./data/data";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use_traverse_tree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  // console.log("explorer data...", explorerData);
  const { insertNode } = useTraverseTree();
  const handleNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <Folder handleNode={handleNode} explorer={explorerData} />
    </div>
  );
}
