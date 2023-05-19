import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import FeedbackSection from './FeedbackSection/FeedbackSection';
import Notification from './Notification/Notification';

import css from './feedback.module.css';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = name => {
    setFeedbacks(prevState => {
      const value = prevState[name];
      return { ...prevState, [name]: value + 1 };
    });
  };

  const total = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  const countPositiveFeedbacksPercentage = propName => {
    if (!total) {
      return 0;
    }
    const feedbackValue = feedbacks[propName];
    const result = ((feedbackValue / total) * 100).toFixed(2);
    return Number(result);
  };

  const goodFeedbackPercentage = countPositiveFeedbacksPercentage('good');

  return (
    <div className={css.wrapper}>
      <FeedbackSection title="Please leave your feedback">
        <FeedbackOptions
          options={{
            good: 'good',
            neutral: 'neutral',
            bad: 'bad',
          }}
          onLeaveFeedback={onLeaveFeedback}
        />
      </FeedbackSection>
      <FeedbackSection title="Statistics">
        {total > 0 ? (
          <Statistics
            good={feedbacks.good}
            neutral={feedbacks.neutral}
            bad={feedbacks.bad}
            total={total}
            positiveFeedbackPercentage={goodFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </FeedbackSection>
    </div>
  );
};

export default Feedback;


