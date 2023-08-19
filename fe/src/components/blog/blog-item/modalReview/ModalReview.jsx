import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddReview, fetchGetReviews, setRating, setShowModal } from '../../../../redux/reducers/ReviewSlice';
import Rate from './Rate';

import ReviewList from './ReviewList';


function ModalReview() {
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.review.showModal);
  const postToReview = useSelector(state => state.review.postToReview);
  const rating = useSelector(state => state.review.rating);

  const handleClose = () => {
    dispatch(setRating(0));
    dispatch(setShowModal(false));
  };

  const comment = useRef('');

  const handleSubmit = async () => {

    const data = {
      rate: rating,
      comment: comment.current.value,
      postId: postToReview
    }

     await dispatch(fetchAddReview(data)).then(()=>{
      dispatch(setRating(0));
      comment.current.value = '';
    }).then(() => dispatch(fetchGetReviews()));
  }


  return (
    <div>
      <Modal size='lg' show={showModal} onHide={handleClose} centered>

        <ReviewList />

        <Form.Group className='p-2' controlId="exampleForm.ControlTextarea1">
          <Form.Label className='fs-5'>Add a comment</Form.Label>
          <Form.Control as="textarea" rows={3} ref={comment} />
        </Form.Group>
        <div className='mt-2 p-3 d-flex flex-column align-items-center ' >
          <Rate rating={rating} />
        </div>
        <Modal.Footer className='mt-2'>
          <Button variant='success' onClick={handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}



export default ModalReview;