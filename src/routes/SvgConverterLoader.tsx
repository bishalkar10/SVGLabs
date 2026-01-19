import { Skeleton } from "@/components/ui/Skeleton";
import classes from "./SvgConverterLoader.module.css";

export const SvgConverterLoader = () => {
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
              className={classes.editorLine}
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
            <div className={classes.bundleList}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={classes.bundleItem}>
                   <Skeleton width={40} height={20} />
                   <Skeleton width={i * 16} height={i * 16} />
                </div>
              ))}
            </div>
             <Skeleton width="100%" height={40} className={classes.bundleFooter} />
          </div>
        </div>
      </div>
    </div>
  );
};
