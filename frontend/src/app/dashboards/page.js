"use client";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Dashboards() {
  const [sentimentData, setSentimentData] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch sentiment analysis data from the server
    const fetchSentimentData = async () => {
      try {
        const response = await fetch('http://localhost:5000/sentiment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: query, limit: 10 })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch sentiment data');
        }
        const data = await response.json();
        setSentimentData(data);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    // Fetch customer feedback data from the server
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch('http://localhost:5000/feedback', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch feedback data');
        }
        const data = await response.json();
        setFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchSentimentData();
    fetchFeedbackData();
  }, []);

  useEffect(() => {
    if (sentimentData && feedbackData) {
      // Render sentiment analysis chart
      const ctx = chartRef.current;
      if (ctx) {
        if (ctx.chart) {
          ctx.chart.destroy(); // Destroy existing chart instance
        }
        ctx.chart = new Chart(ctx, {
          type: 'pie', // Change type to 'pie' for pie chart
          data: {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
              label: 'Sentiment Analysis',
              data: sentimentData.sentiment,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, [sentimentData, feedbackData]);

  return (
    <div>
      <h1>Sentiment Analysis and Customer Feedback Dashboard</h1>
      <div>
        {sentimentData && feedbackData && (
          <canvas ref={chartRef} width="100" height="100"></canvas>
        )}
      </div>
      <div>
        <h2>Customer Feedback</h2>
        {feedbackData && (
          <ul>
            {feedbackData.map((feedback, index) => (
              <li key={index}>{feedback}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboards;
