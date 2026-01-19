import React from "react";
import classes from "./Skeleton.module.css";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  className,
  width,
  height,
  style,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={`${classes.skeleton} ${className || ""}`}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};
