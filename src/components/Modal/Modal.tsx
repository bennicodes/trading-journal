import type { ReactNode } from "react";
import styles from "./Modal.module.css";

type Props = {
  children: ReactNode;
  onClose: () => void;
  title?: string;
};

const Modal = ({ children, onClose, title }: Props) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
