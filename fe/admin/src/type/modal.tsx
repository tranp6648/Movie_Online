export type ModalType = "success" | "error" | "warning" | "info";

export type OpenModalFn = (
  title: string,
  description: string,
  type?: ModalType,
  autoClose?: number
) => void;
