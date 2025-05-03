"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function RequestBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    contactEmail: "",
    contactPhone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/request-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          title: "",
          author: "",
          description: "",
          isbn: "",
          contactEmail: "",
          contactPhone: "",
          notes: "",
        });
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 -mt-10">
      <Head>
        <title>Request a Book | Our Bookstore</title>
      </Head>

      <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-8 border border-gray-700/50">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Request a Book</h1>
          <p className="mt-2 text-gray-300">
            Can't find what you're looking for? Let us know and we'll try to get
            it for you!
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-700 text-green-100 rounded">
            <p>
              Your request has been sent successfully! We'll contact you as soon
              as we get the book.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Book Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-300"
            >
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label
              htmlFor="isbn"
              className="block text-sm font-medium text-gray-300"
            >
              ISBN (if known)
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Enter ISBN number"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Describe the book you're looking for"
            />
          </div>

          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-300"
            >
              Your Email *
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="contactPhone"
              className="block text-sm font-medium text-gray-300"
            >
              Your Phone Number
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="(123) 456-7890"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-300"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Any additional information"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
