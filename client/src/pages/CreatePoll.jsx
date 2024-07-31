import axios from "axios";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const CreatePoll = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      question: "",
      options: [
        { option: "", votes: 0 },
        { option: "", votes: 0 },
        { option: "", votes: 0 },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const handleCreatePoll = async (data) => {
    try {
      await axios.post("/createpoll", data);
      alert("Success");
      reset({
        question: "",
        options: [
          { option: "", votes: 0 },
          { option: "", votes: 0 },
          { option: "", votes: 0 },
        ],
      });
    } catch (e) {
      alert("Failed to insert");
    }
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-center mt-2 mb-6 ">
        Create a Poll
      </h2>

      <div className="max-w-md mx-auto mt-8 p-6 bg-emerald-200 shadow-xl rounded-xl">
        <form onSubmit={handleSubmit(handleCreatePoll)}>
          <label className="block mb-4">
            <span className="text-gray-700">Question:</span>
            <input
              type="text"
              {...register("question", { required: true })}
              className={`mt-1 p-2 w-full border rounded-md bg-white border-black ${
                errors.question ? "border-red-500" : ""
              }`}
            />
            {errors.question && (
              <p className="text-red-500 text-sm">Question is required</p>
            )}
          </label>

          <label className="block mb-2">Options:</label>
          {fields.map((option, index) => (
            <div key={option.id} className="mb-2 flex items-center">
              <span className="rounded-full p-2 flex-shrink-0 bg-emerald-500 text-white mr-2">
                {index + 1}
              </span>
              <input
                type="text"
                {...register(`options.${index}.option`, { required: true })}
                className={`mt-1 p-2 flex-grow border rounded-md border-black ${
                  errors?.options?.[index]?.option ? "border-red-500" : ""
                }`}
              />
              {errors?.options?.[index]?.option && (
                <p className="text-red-500 text-sm">Option is required</p>
              )}
              {fields.length > 2 && index >= 2 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 focus:outline-none ml-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {fields.length < 5 && (
            <button
              type="button"
              onClick={() => append({ option: "", votes: 0 })}
              className="text-black focus:outline-none"
            >
              + Add Option
            </button>
          )}

          <div className="flex justify-end items-center mt-4">
            <button
              type="submit"
              className="bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-700 focus:outline-none"
            >
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
