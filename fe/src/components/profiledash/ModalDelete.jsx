import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDelete } from '../../redux/reducers/LoginSlice';

export default function ModalDelete(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"ù
      centered
    >
      <Modal.Body className='text-center p-5'>
        
        <h1>
            Are you sure you want to delete your account?
        </h1>
        <p className='fs-3'>
            If you delete your account, you will lose all your posts, reviews, likes and saved post.
        </p>
        <div className='d-flex justify-content-around fs-3 mt-5'>
            <Button variant='success' className='fs-3' onClick={() => dispatch(fetchDelete()).then(()=> navigate('/login'))}>Yes</Button>
            <Button variant='success' className='fs-3' onClick={props.onHide}>No</Button>
        </div>

      </Modal.Body>
    </Modal>
  );
}

