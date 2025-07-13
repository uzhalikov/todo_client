import { forwardRef } from "react";
import './Dialog.css'

const Dialog = forwardRef(({ title, children, onClose }, ref) => {
  return (
    <dialog ref={ref} className="dialog">
      <div className="dialog-content flex flex-column gap10">
        {title && <h3>{title}</h3>}
        {children}
        <button onClick={onClose} className="dialog-close">X</button>
      </div>
    </dialog>
  );
});

export default Dialog;
