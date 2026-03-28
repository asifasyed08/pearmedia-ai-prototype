import { useState } from "react";
import WorkflowText from "./components/WorkflowText";
import WorkflowImage from "./components/WorkflowImage";

function App() {
  const [tab, setTab] = useState("text");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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