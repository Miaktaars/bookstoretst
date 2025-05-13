"use client";
import { useState, useRef, useCallback } from "react";

export default function SellPage() {
  // Book Data State
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    condition: "",
    conditionDescription: "",
    priceEstimation: "",
  });

  // Seller Info State
  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Image Upload State
  const [images, setImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const fileInputRef = useRef(null);

  // Form Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef();

  // Condition Options
  const conditions = [
    { value: "New", description: "Never read, no damage" },
    { value: "Like New", description: "Almost no signs of use" },
    { value: "Good", description: "Minor wear but no tears" },
    { value: "Fair", description: "Visible wear but complete" },
    { value: "Poor", description: "Significant damage but readable" },
  ];

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSellerInfoChange = (e) => {
    const { name, value } = e.target;
    setSellerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      handleImageUpload({ target: { files: e.dataTransfer.files } });
    }
  }, []);

  const triggerFileInput = () => fileInputRef.current?.click();

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (previewIndex >= index) {
      setPreviewIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Append book data
      Object.entries(bookData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // Append seller info
      Object.entries(sellerInfo).forEach(([key, value]) => {
        if (value)
          formData.append(
            `seller${key.charAt(0).toUpperCase() + key.slice(1)}`,
            value
          );
      });

      // Append images
      images.forEach((image) => {
        formData.append("images", image.file);
      });

      const response = await fetch("/api/listings", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit listing");
      }

      // Reset form on success
      setSubmitSuccess(true);
      formRef.current?.reset();
      setBookData({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        condition: "",
        conditionDescription: "",
        priceEstimation: "",
      });
      setSellerInfo({
        name: "",
        email: "",
        phone: "",
      });
      setImages([]);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sell Your Book</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Book Details */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Book Information</h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold ">Title*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  className="input input-bordered w-full border-2 rounded-xl border-black/70 px-3"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Author*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  className="input input-bordered w-full border-2 rounded-xl border-black/70 px-3"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Genre</span>
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={bookData.genre}
                    onChange={handleChange}
                    className="input input-bordered w-full border-2 rounded-xl border-black/70 px-3"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">ISBN</span>
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={bookData.isbn}
                    onChange={handleChange}
                    className="input input-bordered w-full border-2 rounded-xl border-black/70 px-3"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Condition*</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {conditions.map((cond) => (
                    <button
                      key={cond.value}
                      type="button"
                      onClick={() =>
                        setBookData((prev) => ({
                          ...prev,
                          condition: cond.value,
                          conditionDescription: cond.description,
                        }))
                      }
                      className={`p-2  text-center transition-all  border-2 rounded-xl border-black/70 px-3${
                        bookData.condition === cond.value
                          ? "border-4 border-orange-500 bg-orange-100"
                          : "border border-gray-300 hover:bg-gray-100 "
                      }`}
                    >
                      <p className="font-medium text-sm ">{cond.value}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Condition Description
                  </span>
                </label>
                <textarea
                  name="conditionDescription"
                  value={bookData.conditionDescription}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full  border-2 rounded-xl border-black/70 px-3"
                  placeholder="Describe any damages, markings, etc."
                  rows={3}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Price *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    $
                  </span>
                  <input
                    type="number"
                    name="priceEstimation"
                    value={bookData.priceEstimation}
                    onChange={handleChange}
                    className="input input-bordered w-full pl-8 border-2 rounded-xl border-black/70 px-3"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Image Upload */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Book Photos</h2>

            {images.length === 0 ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg h-80 flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-orange-500 hover:bg-orange-50"
                onClick={triggerFileInput}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-700">
                  Upload Images
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Drag & drop images here or click to browse
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Main Preview Image */}
                <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={images[previewIndex]?.preview}
                    className="w-full h-full object-contain"
                    alt={`Preview ${previewIndex + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(previewIndex)}
                    className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <button
                        type="button"
                        onClick={() => setPreviewIndex(index)}
                        className={`w-16 h-16 rounded overflow-hidden border-2 ${
                          index === previewIndex
                            ? "border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={image.preview}
                          className="w-full h-full object-cover"
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seller Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Your Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name (Optional)</span>
              </label>
              <input
                type="text"
                name="name"
                value={sellerInfo.name}
                onChange={handleSellerInfoChange}
                className="input input-bordered"
                placeholder="How should we call you?"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="email"
                name="email"
                value={sellerInfo.email}
                onChange={handleSellerInfoChange}
                className="input input-bordered"
                required
                placeholder="For contact purposes"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={sellerInfo.phone}
                onChange={handleSellerInfoChange}
                className="input input-bordered"
                placeholder="Optional"
              />
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {submitError && (
          <div className="alert alert-error mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{submitError}</span>
          </div>
        )}

        {submitSuccess && (
          <div className="alert alert-success mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your book listing has been submitted successfully!</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit Listing"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
