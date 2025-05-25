import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Paper,
} from "@mui/material";

const PrivacyPolicyEditor = () => {
  const [editorData, setEditorData] = useState("");
  const [viewHtml, setViewHtml] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState("2024-08-15");
  const [lastUpdatedDate, setLastUpdatedDate] = useState("2024-08-15");

  useEffect(() => {
    const saved = localStorage.getItem("privacyPolicyTiny");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEditorData(parsed.data);
      setEffectiveDate(parsed.effectiveDate);
      setLastUpdatedDate(parsed.lastUpdatedDate);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "privacyPolicyTiny",
      JSON.stringify({
        data: editorData,
        effectiveDate,
        lastUpdatedDate,
      }),
    );
    alert("Saved to localStorage!");
  };

  const handleExport = () => {
    const blob = new Blob([editorData], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "privacy_policy.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = () => {
    const payload = {
      html: editorData,
      effectiveDate,
      lastUpdatedDate,
    };
    console.log("Submitted:", payload);
    alert("Submitted (check console)");
  };

  return (
    <Box p={2}>
      <Typography variant="h6">Page HTML:</Typography>

      <Stack spacing={2} direction="row" mb={2}>
        <TextField
          label="Effective Date"
          size="small"
          type="date"
          value={effectiveDate}
          onChange={(e) => setEffectiveDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Last Updated"
          type="date"
          size="small"
          value={lastUpdatedDate}
          onChange={(e) => setLastUpdatedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={() => setViewHtml(!viewHtml)}
          variant="outlined"
          size="small"
        >
          {viewHtml ? "Editor Mode" : "Preview HTML"}
        </Button>
        <Button
          onClick={handleExport}
          variant="contained"
          color="secondary"
          size="small"
        >
          Export HTML
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          size="small"
        >
          Save
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="success"
          size="small"
        >
          Submit to API
        </Button>
      </Stack>

      <Paper sx={{ p: 2 }}>
        {viewHtml ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `
            <p><strong>Effective date:</strong> ${new Date(effectiveDate).toDateString()}</p>
            <p><strong>Last updated on:</strong> ${new Date(lastUpdatedDate).toDateString()}</p>
            ${editorData}
          `,
            }}
          />
        ) : (
          <Editor
            apiKey="2zf0lnouwmqd6siy28v2oqqwigdk6im7m3n71och8czyy4yc" // Optional, free usage
            value={editorData}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline | " +
                "forecolor backcolor | fontselect fontsizeselect | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "link image media table | removeformat | code fullscreen help",
              font_formats:
                "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier; Helvetica=helvetica; Times New Roman=times new roman,times",
            }}
            onEditorChange={(content) => setEditorData(content)}
          />
        )}
      </Paper>
    </Box>
  );
};

export default PrivacyPolicyEditor;
