import { useEffect, useRef } from "react";
import "./index.css";

type Props = {
  hideShowModal: () => void;
  onAdd: () => void
};
export const Modal = ({ hideShowModal, onAdd }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClicOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        console.log("here");

        hideShowModal();
      }
    };
    document.addEventListener("mousedown", handleClicOutside);
    return () => {
      document.removeEventListener("mousedown", handleClicOutside);
    };
  }, [modalRef]);
  return (
    <div className="modal_container" ref={modalRef}>
      <h4>What do you want to create?</h4>
      <div>
        <button
          onClick={() => {
            onAdd();
            hideShowModal();
          }}
        >
          Category
        </button>
        <button>Service</button>
      </div>
    </div>
  );
};
