import eventBus from "./eventBus";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  position?: ToastPosition;
  duration?: number;
}

export interface ToastData extends ToastOptions {
  id: number;
  type: ToastType;
  message: string;
}

const defaultOptions: ToastOptions = {
  position: "top-right",
  duration: 3000,
};

const show = (type: ToastType, message: string, options?: ToastOptions) => {
  eventBus.emit("show-toast", {
    type,
    message,
    ...defaultOptions,
    ...options,
  });
};

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    show("success", message, options),
  error: (message: string, options?: ToastOptions) =>
    show("error", message, options),
  info: (message: string, options?: ToastOptions) =>
    show("info", message, options),
  warning: (message: string, options?: ToastOptions) =>
    show("warning", message, options),
};
