import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost",
// });

const VotePoll = () => {
  const [polls, setPolls] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = await axiosInstance.get("/votepoll");
        const { data } = await axios.get("/votepoll");
        setPolls(data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVote = async (index) => {
    try {
      const selectedOption = selectedOptions[index];
      if (selectedOption) {
        await axios.post("/vote", {
          pollId: polls[index]._id,
          selectedOption,
          optionId: polls[index].options.find(
            (option) => option.option === selectedOption
          )?._id,
        });

        setSelectedOptions({});
      } else {
        console.log("Please select an option before voting.");
      }
    } catch (error) {
      alert("You have already voted for this poll!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-4">
      <h2 className="text-5xl font-bold text-center mb-14">Vote on Polls</h2>
      {loading ? (
        <p className="text-gray-500 text-2xl text-center font-semibold">
          Loading polls...
        </p>
      ) : polls.length === 0 ? (
        <p className="text-red-300 text-2xl text-center font-semibold">
          No polls available.{" "}
          <Link
            to="/createpoll"
            className="text-red-600 hover:bg-emerald-200 hover:text-red-500 hover:duration-100  rounded-lg p-1"
          >
            Create a poll
          </Link>{" "}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {polls.map((poll, index) => (
            <div
              key={index}
              className="bg-emerald-200 shadow-lg rounded-xl p-8 pb-1 mb-6"
            >
              <h3 className="text-lg font-bold mb-4">{poll.question}</h3>
              <form>
                {poll.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-4 flex items-center">
                    <input
                      type="radio"
                      name={`poll_${index}`}
                      id={`poll_${index}_option_${optionIndex}`}
                      value={option.option}
                      checked={selectedOptions[index] === option.option}
                      onChange={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [index]: option.option,
                        })
                      }
                      className="hidden"
                    />

                    <label
                      htmlFor={`poll_${index}_option_${optionIndex}`}
                      className="cursor-pointer flex items-center space-x-2 text-md"
                    >
                      <div className="w-5 h-5 mr-2 border rounded-full border-emerald-500 flex items-center justify-center">
                        {selectedOptions[index] === option.option && (
                          <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                        )}
                      </div>
                      <span className="font-normal">{option.option}</span>{" "}
                    </label>
                  </div>
                ))}
                <div>
                  <button
                    type="button"
                    onClick={() => handleVote(index)}
                    className="bg-emerald-500 text-white p-4 rounded-md hover:bg-emerald-700 mb-3"
                  >
                    Vote
                  </button>
                  <span className="float-end mt-8 font-normal">
                    (By {poll.creator.username})
                  </span>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotePoll;
