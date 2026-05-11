import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "./App.css";


// PrismJS language support
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism-tomorrow.css";

const languageMap = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
};

const defaultCode = {
  javascript: `function sum(a, b) {\n  return a + b;\n}`,
  python: `def sum(a, b):\n    return a + b`,
  java: `public int sum(int a, int b) {\n    return a + b;\n}`,
  cpp: `int sum(int a, int b) {\n    return a + b;\n}`,
};

export default function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCode.javascript);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCode(defaultCode[language]);
  }, [language]);

  const highlightCode = (code) => {
    const grammar = prism.languages[languageMap[language]];
    return prism.highlight(code, grammar, language);
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await axios.post(`${apiUrl}/ai/get-review`, {
        code,
        language,
      });
      setReview(res.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setReview(err.response.data);
      } else {
        setReview("Error fetching review. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* LEFT PANEL */}
      <div className="left">
        <div className="language-select">
          <label htmlFor="language-select">Select Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightCode}
            padding={16}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              minHeight: "300px",
            }}
          />
        </div>

        <div className="review" onClick={handleReview}>
          {loading ? "Reviewing..." : "Review"}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right">
        <h3>🧠 AI Feedback</h3>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </ReactMarkdown>
      </div>
    </main>
  );
}
