import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CreatedPollsByUser.css";

function LoadingIndicator() {
  return (
    <div className="flex  justify-center h-full">
      <p className="text-gray-500 text-2xl text-center font-semibold">
        Loading polls...
      </p>
    </div>
  );
}

function VotedPollsByUser() {
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/votedpoll").then((response) => {
      setPolls(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container mx-auto p-6 h-full overflow-y-auto">
      {isLoading ? (
        <LoadingIndicator />
      ) : polls.length === 0 ? (
        <p className="text-red-300 text-2xl text-center font-semibold mb-8">
          No polls available.{" "}
          <Link
            to="/createpoll"
            className="text-red-600 hover:bg-emerald-200 hover:text-red-500 hover:duration-100 rounded-lg p-1"
          >
            Create a poll
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {polls.map((poll, index) => (
            <div
              key={index}
              className="bg-emerald-200 rounded-2xl shadow-xl p-8 mb-6 relative"
            >
              <h3 className="text-lg font-bold mb-4">{poll.poll.question}</h3>
              <ul className="list-disc pl-6">
                {poll.poll.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="mb-2 relative">
                    <div className="flex items-center border rounded-full border-black/10">
                      {poll.option === option._id ? (
                        <div className="absolute bg-emerald-400 rounded-full h-full w-full" />
                      ) : (
                        <div className="absolute bg-emerald-100 rounded-full h-full w-full" />
                      )}
                      <span className="mr-2 pl-2 font-semibold pb-1 z-10">
                        {option.option}
                      </span>
                      <div className="relative ml-auto z-10 flex items-center">
                        <span
                          className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full  text-black ml-auto"
                          style={{ marginRight: "5px" }}
                        >
                          {option.percentage % 1 === 0
                            ? `${option.percentage}%`
                            : `${option.percentage.toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <span className="font-normal float-end mt-2 text-sm">
                ~{poll.poll.creator.username}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VotedPollsByUser;
