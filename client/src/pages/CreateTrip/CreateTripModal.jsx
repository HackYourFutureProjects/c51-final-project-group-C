import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import CreateTripPlan from "../../components/CreateTripPlan";

const CreateTripModal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New Trip Plan"
      showCloseButton
      preventClose={false}
      body={<CreateTripPlan />}
    />
  );
};

export default CreateTripModal;
