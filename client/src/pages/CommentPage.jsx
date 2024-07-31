// CommentPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function CommentPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Comments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Sample Comment 1 */}
        <div className="bg-emerald-200 rounded-2xl shadow-xl p-8 mb-6">
          <p className="text-lg font-bold mb-4">Great comment!</p>
          <p className="text-sm text-gray-600">Posted by: Hrithik Jaiswal</p>
        </div>

        {/* Sample Comment 2 */}
        <div className="bg-emerald-200 rounded-2xl shadow-xl p-8 mb-6">
          <p className="text-lg font-bold mb-4">Interesting thoughts.</p>
          <p className="text-sm text-gray-600">Posted by: Hatesh Akbari</p>
        </div>
      </div>

      {/* Link to Create Comment */}
      <div className="mt-8">
        <Link
          to="/createcomment"
          className="btn bg-emerald-500 text-white py-2 px-4 rounded-full"
        >
          Create a Comment
        </Link>
      </div>
    </div>
  );
}

export default CommentPage;
