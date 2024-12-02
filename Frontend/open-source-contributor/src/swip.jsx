import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const SwipeableCard = ({ onSwipeLeft, onSwipeRight, children }) => {
  // Handlers for swipe actions
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft(),
    onSwipedRight: () => onSwipeRight(),
    preventDefaultTouchmoveEvent: true, // Prevent scrolling during swipe
    trackMouse: true, // Allow swipe via mouse for testing on desktops
  });

  return (
    <div
      {...swipeHandlers}
    >
      {children}
    </div>
  );
};

const SwipeableCards = ({ onNavigate }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]); // Track visible cards

  // Fetch the project data from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://opensource-contributor.onrender.com/api/projects');  // Replace with the correct API URL
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data); // Assuming the API returns an array of projects
        setLoading(false);
        setVisibleCards(data.map((_, index) => index)); // Initialize visible cards
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSwipeLeft = (index) => {
    // Remove the card at the given index
    setVisibleCards(visibleCards.filter((cardIndex) => cardIndex !== index));
  };

  const handleSwipeRight = () => {
    alert("Swiped Right!");
  };

  // Render loading or error message if applicable
  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="cards-line">
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        visibleCards.map((index) => (
          <SwipeableCard
            key={index}
            onSwipeLeft={() => handleSwipeLeft(index)}  // Pass the index for the card
            onSwipeRight={handleSwipeRight}
          >
            <div className="card">
              <h3>{projects[index].title}</h3>
              <p>{projects[index].description}</p>
            </div>
          </SwipeableCard>
        ))
      )}
    </div>
  );
};

export default SwipeableCards;