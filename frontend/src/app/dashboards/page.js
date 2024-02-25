"use client";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library

function Dashboards() {
  const [sentimentData, setSentimentData] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const chartRefSentiment = useRef(null);
  const chartRefFeedback = useRef(null);

  useEffect(() => {
    // Fetch sentiment analysis data from the server
    const fetchSentimentData = async () => {
      try {
        const response = await fetch('http://localhost:5000/sentiment', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
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
    if (feedbackData) {
      const ctx = chartRefFeedback.current;
      if (ctx) {
        const labels = Object.keys(feedbackData[1]);
        const dataValues = Object.values(feedbackData[1]);
        if (ctx.chart) {
          ctx.chart.destroy();
        }
        ctx.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Customer Feedback',
              data: dataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
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
    if (sentimentData) {
      const ctx = chartRefSentiment.current;
      if (ctx) {
        const labels = Object.keys(sentimentData[1]);
        const dataValues = Object.values(sentimentData[1]);
        if (ctx.chart) {
          ctx.chart.destroy();
        }
        ctx.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Customer Feedback',
              data: dataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
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
<div className="flex justify-center my-10">
  <div className="card w-96 mx-10">
    <h1 className="card-header">Customer Feedback</h1>
    <div className="card-body">
      <canvas ref={chartRefFeedback}></canvas>
    </div>
  </div>
  <div className="card w-96 mx-10">
    <h1 className="card-header">Sentiment Analysis</h1>
    <div className="card-body">
      <canvas ref={chartRefSentiment}></canvas>
    </div>
  </div>
</div>
  );
}

export default Dashboards;
