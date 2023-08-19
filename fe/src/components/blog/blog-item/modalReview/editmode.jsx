import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditReview, fetchGetReviews, setRating, setShowModal, setShowModalEditMode } from '../../../../redux/reducers/ReviewSlice';
import Rate from './Rate';

const EditMode = () => {
  const dispatch = useDispatch();
  const reviewToEdit = useSelector(state => state.review.reviewToEdit);
  const [comment, setComment] = useState('');
  const show = useSelector(state => state.review.showModalEditMode); // State che controlla se il modale è aperto o chiuso
  const rating = useSelector(state => state.review.rating);

  useEffect(() => {
    setComment(reviewToEdit && reviewToEdit.comment);
  }, [reviewToEdit]);

  

  const handleClose = () => {
    dispatch(setRating(0));
    dispatch(setShowModalEditMode(null));
    dispatch(setShowModal(true)); 
  };

  const handleSubmit = () => {
    const data = {
      reviewId: reviewToEdit._id,
      rate: rating,
      comment: comment,
    };
    dispatch(fetchEditReview(data)).then(() => dispatch(fetchGetReviews()).then(()=> handleClose()))
  };

  const isOpen = show === reviewToEdit?._id;

  return (
      <Modal show={isOpen} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Edit your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='p-2' controlId="exampleForm.ControlTextarea1">
            <Form.Label>Edit your comment</Form.Label>
            <Form.Control as="textarea" rows={3} value={comment || ""} onChange={(e) => setComment(e.target.value)} />
          </Form.Group>
          <div className='mt-2 p-3 d-flex flex-column align-items-center '>
            <Rate rating={rating} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}


export default EditMode;