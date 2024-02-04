"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";

const ExpandableInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const springProps = useSpring({
    height: isExpanded ? "auto" : 0,
    opacity: isExpanded ? 1 : 0,
    config: { duration: 900 },
  });

  return (
    <div className="flex justify-center items-center flex-col hover:cursor-pointer ">
      <h1
        className="text-2xl mt-16 mb-2 font-custom text-black "
        onClick={toggleExpand}
      >
        What is this?
      </h1>
      <button
        className="flex justify-center items-center flex-col bg-gray-300 hover:bg-gray-600 min-h-max mb-5  p-3 rounded-3xl min-w-max"
        onClick={toggleExpand}
      >
        <Image
          src="/arrow.png"
          className="animate-bounce  "
          width={32}
          height={32}
          onClick={toggleExpand}
        ></Image>
      </button>
      {isExpanded && (
        <animated.div style={springProps} className="w-1/2 text-lg">
          <p className="">
            The Task List app is an intuitive tool designed to efficiently
            manage your to-do items. It allows users to create, edit, and delete
            task lists, as well as add, update, and remove individual tasks
            within those lists. Whether you're organizing your daily chores,
            work assignments, or personal goals, this app provides a
            user-friendly interface to streamline your task management process.
          </p>
        </animated.div>
      )}
    </div>
  );
};

export default ExpandableInfo;
