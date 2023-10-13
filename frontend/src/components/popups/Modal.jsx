import { useSelector } from 'react-redux';
import Add from './Add';
import Rename from './Rename';
import Remove from './Remove';

const modals = {
  adding: Add,
  renaiming: Rename,
  removing: Remove,
};

const getModal = (modalName) => modals[modalName];

const Modal = () => {
  const modalType = useSelector((state) => state.modalsReducer.type);
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return (
    <Component />
  );
};

export default Modal;
