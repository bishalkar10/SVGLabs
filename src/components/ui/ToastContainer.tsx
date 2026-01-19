import { useEffect, useState } from "react";
import eventBus from "@/utils/eventBus";
import classes from "./ToastContainer.module.css";
import type { ToastData, ToastPosition } from "@/utils/toast";

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const unsubscribe = eventBus.on("show-toast", (data: Omit<ToastData, "id">) => {
      const id = Date.now();
      const newToast = { ...data, id };
      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getPositionClass = (pos: ToastPosition) => {
    switch (pos) {
      case "top-left": return classes.topLeft;
      case "top-center": return classes.topCenter;
      case "top-right": return classes.topRight;
      case "bottom-left": return classes.bottomLeft;
      case "bottom-center": return classes.bottomCenter;
      case "bottom-right": return classes.bottomRight;
      default: return classes.topRight;
    }
  };

  return (
    <>
      {POSITIONS.map((pos) => {
        const positionToasts = toasts.filter((t) => (t.position || "top-right") === pos);
        if (positionToasts.length === 0) return null;

        return (
          <div key={pos} className={`${classes.toastContainer} ${getPositionClass(pos)}`}>
            {positionToasts.map((toast) => (
              <div
                key={toast.id}
                className={`${classes.toast} ${classes[toast.type]}`}
                onClick={() => removeToast(toast.id)}
              >
                {/* Optional Icon based on type could go here */}
                {toast.message}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default ToastContainer;
