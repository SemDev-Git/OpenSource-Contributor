import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DragDropBoard = () => {
  const [columns, setColumns] = useState({
    todo: ["Task 1", "Task 2"],
    progress: ["Task 3"],
    complete: ["Task 4"],
  });

  const moveTask = (task, fromColumn, toColumn) => {
    if (fromColumn === toColumn) return;

    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };

      // Remove task from the original column
      newColumns[fromColumn] = newColumns[fromColumn].filter((t) => t !== task);

      // Add task to the target column
      newColumns[toColumn] = [...newColumns[toColumn], task];

      return newColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", justifyContent: "space-around", margin: "20px" }}>
        {Object.keys(columns).map((column) => (
          <Column
            key={column}
            title={column}
            tasks={columns[column]}
            onDrop={(task, fromColumn) => moveTask(task, fromColumn, column)}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const Column = ({ title, tasks, onDrop }) => {
  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item) => {
      onDrop(item.task, item.column);
    },
  });

  return (
    <div
      ref={dropRef}
      style={{
        width: "30%",
        minHeight: "200px",
        border: "none",
        borderRadius: "20px",
        padding: "10px",
        backgroundColor: "#62B6B7",
        color: "#fff",
      }}
    >
      <h3 style={{ textAlign: "center", fontSize: "35px"}}>
        {title.replace(/_/g, " ")}
      </h3>
      {tasks.map((task) => (
        <Task key={task} task={task} column={title} />
      ))}
    </div>
  );
};

const Task = ({ task, column }) => {
  const [, dragRef] = useDrag({
    type: "TASK",
    item: { task, column },
  });

  return (
    <button
      ref={dragRef}
      style={{
        display: "block",
        width: "90%",
        margin: "10px auto",
        padding: "10px",
        backgroundColor: "#439A97",
        color: "#fff",
        fontWeight: "900",
        border: "none",
        borderRadius: "25px",
        cursor: "grab",
      }}
    >
      {task}
    </button>
  );
};

export default DragDropBoard;