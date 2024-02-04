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
    <div className="flex justify-center items-center flex-col  ">
      <h1 className="text-xl lg:text-3xl mt-16 mb-4 font-custom  text-black w-screen text-center cursor-default ">
        What is this?
      </h1>
      <button
        className="flex justify-center items-center flex-col min-h-max mb-9  p-3 rounded-3xl min-w-max bg-gray-300 hover:bg-gray-600  cursor-pointer focus:bg-gray-600"
        onClick={toggleExpand}
      >
        <Image
          src="/arrow.png"
          className="animate-bounce hover:cursor-pointer "
          width={27}
          height={27}
          onClick={toggleExpand}
        ></Image>
      </button>
      {isExpanded && (
        <animated.div
          style={springProps}
          className="w-64 lg:w-1/2 text-base lg:text-xl"
        >
          <p className="font-medium">
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
