import { useState, useRef, useCallback } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import { svgToIco } from "@/utils/ico-converter";
import { formatSvg } from "@/utils/svg-formatter";
import classes from "@/features/svg-converter/SvgConverter.module.css";
import { toast } from "@/utils/toast";

export function meta() {
  return [
    { title: "SVG to ICO Converter | SVG Labs" },
    {
      name: "description",
      content:
        "Convert SVG files to ICO, PNG, and create icon bundles instantly. Free online tool for developers and designers to optimize and convert vector graphics.",
    },
    {
      name: "keywords",
      content:
        "svg to ico, svg converter, icon generator, favicon creator, tech labs, svg tools",
    },
  ];
}

const SvgConverter = () => {
  const [code, setCode] = useState(
    `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#grad)" filter="url(#shadow)" />
  <path d="M35 50 L48 63 L68 38" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`,
  );
  const [isConverting, setIsConverting] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "editor">("editor");
  const [fileName, setFileName] = useState("icon.ico");
  // Local message state removed in favor of global toast
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const blob = await svgToIco(code);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Download Started");
    } catch (error) {
      console.error(error);
      toast.error("Conversion Failed: " + (error as Error).message);
    } finally {
      setIsConverting(false);
    }
  };

  const readSvgFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCode(content);
      setFileName(file.name.replace(".svg", ".ico"));
      toast.success(`Loaded ${file.name}`);
      setActiveTab("editor"); // Switch to editor after successful load
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readSvgFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.includes("svg")) {
      readSvgFile(file);
    } else {
      toast.error("Only SVG files supported");
    }
  }, []);

  return (
    <div
      className={classes.container}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Top Header Area */}
      <div className={classes.header}>
        <div className={classes.segmentedControl}>
          <button
            onClick={() => setActiveTab("upload")}
            className={`${classes.segmentBtn} ${activeTab === "upload" ? classes.active : ""}`}
          >
            <span className={classes.segmentIcon}>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href="/spritesheet.svg#icon-upload" />
              </svg>
            </span>
            Upload SVG
          </button>
          <button
            onClick={() => setActiveTab("editor")}
            className={`${classes.segmentBtn} ${activeTab === "editor" ? classes.active : ""}`}
          >
            <span className={classes.segmentIcon}>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <use href="/spritesheet.svg#icon-code" />
              </svg>
            </span>
            Code Editor
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".svg"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className={classes.workspace}>
        {/* Editor Pane (Left/Center) */}
        <div className={classes.editorPane}>
          {activeTab === "editor" ? (
            <CodeEditor
              code={code}
              onValueChange={setCode}
              className={classes.editorWrapper}
              placeholder="<!-- Paste SVG Code Here -->"
              onFormat={() => {
                const formatted = formatSvg(code);
                setCode(formatted);
              }}
            />
          ) : (
            <div
              className={classes.uploadArea}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={classes.uploadContent}>
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <use href="/spritesheet.svg#icon-upload" />
                </svg>
                <div>
                  <div className={classes.uploadTitle}>Click to upload SVG</div>
                  <div className={classes.uploadSubtitle}>
                    or drag and drop file here
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview Pane (Right) */}
        <div className={classes.previewPane}>
          <h2 className={classes.paneHeader}>Live Preview</h2>
          <div className={classes.canvasArea}>
            {/* White card for previewing transparency */}
            <div className={classes.previewCard}>
              <div
                dangerouslySetInnerHTML={{ __html: code }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <div className={classes.bundleArea}>
            <h2
              className={classes.paneHeader}
              style={{ paddingLeft: 0, paddingRight: 0, border: "none" }}
            >
              Icon Bundle
            </h2>
            <div className={classes.bundleList}>
              {[16, 32, 48, 64].map((size) => (
                <div key={size} className={classes.bundleItem}>
                  <span>{size}px</span>
                  <div
                    className={classes.iconPreview}
                    style={{
                      width: size,
                      height: size,
                      minWidth: size,
                      minHeight: size,
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: code }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className={`btn ${classes.downloadBtn}`}
            >
              {isConverting ? "Processing..." : "Download .ICO Bundle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SvgConverter;
