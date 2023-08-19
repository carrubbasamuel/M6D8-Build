import React from "react";
import { Spinner } from "react-bootstrap";
import { LuDelete } from "react-icons/lu";
import { MdBuild } from "react-icons/md";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteReview,
  fetchGetReviews,
  setRating,
  setReviewToEdit,
  setShowModal,
  setShowModalEditMode
} from "../../../../redux/reducers/ReviewSlice";
import Rate from "./Rate";



export default function ReviewList() {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.review);

  const handleEditMode = (review) => {
    dispatch(setReviewToEdit(review))
    dispatch(setRating(review.rate));
    dispatch(setShowModal(null))
    dispatch(setShowModalEditMode(review._id));
  };



  return (
    <>
      {loading && reviews.length === 0 && <div className="d-flex justify-content-center mt-5"><Spinner animation="grow" variant="dark" /></div>}
      {loading === false && reviews.length === 0 &&
        <div className="d-flex flex-column align-items-center mt-5">
          <h2>No reviews yet</h2>
          <p>Be the first to review this post</p>
          <div style={{width: '100px'}}>
            <Lottie options={{
              loop: true,
              autoplay: true,
              animationData: require('./noreview.json'),
            }} />

          </div>
        </div>
      }
      <div className="p-3 reviewList">
        {reviews?.map((review) => (
          <div key={review._id} className="d-flex justify-content-between reviews">
            <div className="d-flex flex-column">
              <p className="fs-4">{review.comment}</p>
              <div className="d-flex align-items-center justify-content-center h-50 w-50">
                <Rate rate={review.rate} />
              </div>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-center">
              <div>
                <div className=" avatarUser d-flex justify-content-end">
                  <img width={40} height={40} className="  rounded-circle m-2 shadow" src={review.authorId.avatar} alt="img-profile" />
                </div>   
                <p>{review.authorId.email}</p>
              </div>
              <div className="d-flex">
                {review.isMine === true && <MdBuild style={{ cursor: 'pointer', fontSize: '18px', marginRight: '10px' }} onClick={() => handleEditMode(review)} />}
                {review.isMine === true && <LuDelete style={{ cursor: 'pointer', fontSize: '22px' }} onClick={() => dispatch(fetchDeleteReview(review._id)).then(() => dispatch(fetchGetReviews()))} />}
              </div>

            </div>

          </div>

        ))}
      </div>
    </>


  );
}
