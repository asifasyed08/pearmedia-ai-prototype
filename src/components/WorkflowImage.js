import { useState } from "react";
import { analyzeImage, generateImage } from "../utils/apiHelpers";

function WorkflowImage() {
  const [base64, setBase64] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // STEP 1: Upload Image
  const handleUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  // STEP 2: Analyze Image
  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const result = await analyzeImage(base64);
      setAnalysis(result);
    } catch {
      setError("Image analysis failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Generate Variation
  const handleGenerate = async () => {
    try {
      setLoading(true);
      const newPrompt = `Create a variation of this image with ${analysis}`;
      const img = await generateImage(newPrompt);
      setImageUrl(img);
    } catch {
      setError("Variation generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Style Lab 🎨</h2>

      {/* Upload */}
      <input type="file" onChange={handleUpload} />

      <br /><br />

      {/* Analyze */}
      <button onClick={handleAnalyze}>Analyze Image</button>

      <br /><br />

      {/* Show Analysis */}
      {analysis && <p>{analysis}</p>}

      {/* Generate Variation */}
      {analysis && (
        <button onClick={handleGenerate}>Generate Variation</button>
      )}

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p>{error}</p>}

      {/* Image */}
      {imageUrl && <img src={imageUrl} alt="variation" width="300" />}
    </div>
  );
}

export default WorkflowImage;