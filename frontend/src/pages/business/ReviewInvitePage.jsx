import React, { useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const ReviewInvitePage = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    customerEmail: "",
    title: "",
    message: "",
  });
  const [uniqueLink, setUniqueLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateUniqueLink = async () => {
    const tokenResponse = await axios.get("/invite-token", {
      email: formData.customerEmail,
    });
    const token = tokenResponse.data;

    const link = `${window.location.origin}/customer-review-form/${id}?token=${token}`;
    setUniqueLink(link);
    setCopied(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(uniqueLink);
    setCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Form data submitted:", formData);

    // send request to send-email route
    try {
      const response = await axios.post(
        `/companies/${id}/send-review-request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Email sent successfully");
      navigate(0);
    } catch (error) {
      setError("Error sending email");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mt-10 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Send Review Invite</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 bg-red-200 text-center"> {error}</p>
        )}
        <div>
          <label
            htmlFor="customerEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Customer Email
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter customer email"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the title"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your message"
            rows="7"
          />
        </div>
        <span className="text-sm text-gray-500 block mb-1">
          Generate unique review link to send to your customer
        </span>
        <button
          type="button"
          onClick={generateUniqueLink}
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Unique Link
        </button>

        {uniqueLink && (
          <div className="mt-4">
            <p className="text-sm text-gray-700">Generated Link:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={uniqueLink}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm mr-2"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-1 px-3 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        >
          {loading ? "Sending..." : "Send Invite"}
        </button>
      </form>
    </div>
  );
};
