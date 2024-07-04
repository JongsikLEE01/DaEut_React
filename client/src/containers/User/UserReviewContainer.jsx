import React, { useEffect, useState } from 'react';
import { getUserPaymentsAndReview } from '../../apis/Users/User';
import UserReviewForm from '../../components/user/UserReviewForm';

const UserReviewContainer = () => {
  const [payments, setPayments] = useState([]);
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserPaymentsAndReview();
        setPayments(response.data.payments || []);
        setReview(response.data.review || {});
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="form-section">
      <h3>별점 및 리뷰 작성</h3>
      <UserReviewForm payments={payments} initialReview={review} />
    </div>
  );
};

export default UserReviewContainer;
