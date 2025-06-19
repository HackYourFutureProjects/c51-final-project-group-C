import { useEffect, useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  showCloseButton = true,
  preventClose = false,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [mouseDownTarget, setMouseDownTarget] = useState(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled || preventClose) return;

    setIsClosing(true);
    setShowModal(false);

    setTimeout(() => {
      onClose?.();
      setIsClosing(false);
    }, 300);
  };

  const handleSubmit = () => {
    if (disabled) return;
    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  };

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <div
      className={`
        modal-background
        flex justify-center items-center 
        overflow-x-hidden overflow-y-auto 
        fixed inset-0 z-50 
        outline-none focus:outline-none
        transition-opacity duration-300
        ${showModal ? "bg-neutral-900/80" : "bg-transparent"}
      `}
      onMouseDown={(e) => setMouseDownTarget(e.target)}
      onClick={(e) => {
        if (
          e.target === e.currentTarget &&
          mouseDownTarget === e.currentTarget &&
          !preventClose
        ) {
          handleClose();
        }
      }}
    >
      <div className="modal-container relative w-full max-w-[500px] my-6 px-6 sm:px-6 md:px-8">
        <div
          className={`
            modal-content
            transform duration-200
            ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="modal-window border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none min-h-[300px]">
            {/* Modal Title */}
            <div className="modal-header flex items-center p-6 pt-8 px-10 rounded-t justify-center relative border-b-[1px]">
              <div className="modal-title text-2xl font-semibold">{title}</div>
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="modal-close p-1 border-0 hover:opacity-70 transition absolute right-9"
                >
                  <CloseIcon size={20} />
                </button>
              )}
            </div>

            {/* Modal Main Content */}
            <div className="modal-body relative p-6 flex-auto">{body}</div>

            {/* Modal Footer */}
            <div className="modal-footer flex flex-col gap-2 p-6 mt-auto">
              <div className="modal-actions flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <button
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    className={`
                      modal-button-secondary
                      relative
                      disabled:opacity-70
                      disabled:cursor-not-allowed
                      rounded-lg
                      hover:opacity-80
                      transition
                      w-full
                      py-3
                      text-white
                      bg-[#adacac]
                    `}
                  >
                    {secondaryActionLabel}
                  </button>
                )}
                {actionLabel && (
                  <button
                    disabled={disabled}
                    onClick={handleSubmit}
                    className={`
                      modal-button-primary
                      relative
                      flex items-center justify-center gap-2
                      disabled:opacity-70
                      disabled:cursor-not-allowed
                      rounded-lg
                      hover:opacity-90
                      transition
                      w-full
                      min-h-[50px]
                      py-3
                      text-white
                      bg-accent
                    `}
                  >
                    {actionLabel}
                  </button>
                )}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
