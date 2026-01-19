import { Skeleton } from "@/components/ui/Skeleton";
import classes from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={classes.container}>
      {/* Header Skeleton */}
      <div className={classes.header}>
        <Skeleton width={200} height={32} />
      </div>

      <div className={classes.workspace}>
        {/* Editor Pane Skeleton */}
        <div className={classes.editorPane}>
          {/* Mock lines of code */}
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              height={20}
              width={`${Math.random() * 40 + 30}%`}
              style={{ opacity: 0.3 }}
            />
          ))}
        </div>

        {/* Preview Pane Skeleton */}
        <div className={classes.previewPane}>
          <div className={classes.previewCard}>
            <Skeleton width="100%" height="100%" />
          </div>

          <div className={classes.bundleArea}>
            <Skeleton width={100} height={20} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                   <Skeleton width={40} height={20} />
                   <Skeleton width={48} height={48} />
                </div>
              ))}
            </div>
             <Skeleton width="100%" height={40} style={{ marginTop: "16px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
