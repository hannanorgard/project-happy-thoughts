import React from 'react';
import { formatDistance } from 'date-fns';

const HappyThoughts = ({ loading, happyThoughts, fetchHappyThoughts }) => {
  if (loading) {
    return <h3 className="loading-text">Happy thoughts are loading..</h3>
  }

  const onNewLikeSubmit = (_id) => {
    fetch(
      `https://happy-thoughts-technigo.herokuapp.com/thoughts/${_id}/like`,
      { method: 'POST',
        headers: { 'Content-Type': 'application/json' } }
    )
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line no-underscore-dangle
        fetchHappyThoughts(data._id)
      })
  };

  return (
    <section className="thoughts-container">
      {happyThoughts.map((thought) => (
        // eslint-disable-next-line no-underscore-dangle
        <article className="thought-cards" key={thought._id}>
          <h4 className="thought-message">{thought.message}</h4>
          <div className="like-time-container">
            <section className="like-container">
              <button
                type="submit"
                className={thought.hearts === 0 ? 'no-like-btn' : 'like-btn'}
                // eslint-disable-next-line no-underscore-dangle
                onClick={() => onNewLikeSubmit(thought._id)}>
                <span className="emoji" role="img" aria-label="heart-emoji">❤️‍🔥</span>
              </button>
              <p className="like-counter"> {thought.hearts}</p>
            </section>
            <p className="time">
              {formatDistance(new Date(thought.createdAt), Date.now(), {
                addSuffix: true
              })}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};
export default HappyThoughts;