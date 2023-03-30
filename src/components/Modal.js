import { Button } from "./Button";

export const Modal = ({
  title = "Modal",
  isVisible = false,
  setVisible,
  onConfirm,
  confirmText = "Okay",
  children,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 z-[2] h-full w-full flex items-center bg-black/20 transition-opacity ${
        !isVisible && "hidden"
      }`}
    >
      <div className="mx-auto min-w-[500px] min-h-[450px] bg-darkgray text-white rounded-xl p-6 flex flex-col justify-between">
        <div>
          <div className="mb-4 text-center text-3xl">{title}</div>
          {children}
        </div>
        <div className="flex ">
          <Button type="primary" className="mr-4" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button
            type="warning"
            onClick={() => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
