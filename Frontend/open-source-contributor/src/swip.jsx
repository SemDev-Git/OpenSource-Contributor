import React from "react";
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
      style={{
        width: "250px",
        height: "200px",
        padding: "18px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#62B6B7",
        display: "flex",
        fontFamily: "Poppins", 
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        textAlign: "center",
        userSelect: "none",
        color: "#CBEDD5",
        fontWeight: "600",
      }}
    >
      {children}
    </div>
  );
};

const SwipeableCards = () => {
  const handleSwipeLeft = () => {
    alert("Swiped Left!");
  };

  const handleSwipeRight = () => {
    alert("Swiped Right!");
  };

  return (
    <div>
      <SwipeableCard onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
        Swipe Me!
      </SwipeableCard>
    </div>
  );
};

export default SwipeableCards;
