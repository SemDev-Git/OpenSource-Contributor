import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import './App.css'

const SwipeCards = () => {
  const [cards, setCards] = useState([]);

  // Fetch repositories from the backend API
  useEffect(() => {
    fetch("http://localhost:4000/api/repositories")
      .then(response => response.json())
      .then(data => {
        setCards(data);  // Set the data fetched from the backend
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      {cards.map((card) => {
        return (
          <Card key={card.id} cards={cards} setCards={setCards} {...card} />
        );
      })}
    </div>
  );
};

const Card = ({ id, avatarUrl, title, setCards, cards }) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  };

  return (
    <motion.div
      className="card"
      style={{
        x,
        opacity,
        rotate,
        zIndex: isFront ? 10 : 1,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <img
        src={avatarUrl}
        alt={title}
        className="avatar"
      />
      <h3>{title}</h3>
    </motion.div>
  );
};

export default SwipeCards;
