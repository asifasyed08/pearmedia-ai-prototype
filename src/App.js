import { useState } from "react";
import WorkflowText from "./components/WorkflowText";
import WorkflowImage from "./components/WorkflowImage";
import "./App.css";

function App() {
  const [tab, setTab] = useState("text");

  return (
    <div 
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        display: "inline-block",
        marginTop: "50px"
      }}
    >
      <h1>Pear Media AI Lab 🚀</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setTab("text")}>
          Creative Studio
        </button>

        <button onClick={() => setTab("image")} style={{ marginLeft: "10px" }}>
          Style Lab
        </button>
      </div>

      {tab === "text" ? <WorkflowText /> : <WorkflowImage />}
    </div>
  );
}

export default App;