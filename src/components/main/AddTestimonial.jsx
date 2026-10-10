const AddTestimonial = ({
  handleSubmit,
  formData,
  handleChange,
  isSubmitting = false,
}) => {
  const isDisabled =
    isSubmitting ||
    !formData.name.trim() ||
    !formData.company.trim() ||
    !formData.review.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-5 text-left"
    >
      <div className="w-full flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          title="Please enter your name"
          required
          maxLength={100}
          className="w-full p-3 border rounded"
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          title="Please enter your company name"
          required
          maxLength={150}
          className="w-full p-3 border rounded"
          disabled={isSubmitting}
        />
      </div>

      <textarea
        name="review"
        placeholder="Write your review..."
        value={formData.review}
        onChange={handleChange}
        title="Please enter your review"
        required
        maxLength={2000}
        className="w-full p-3 border rounded"
        rows={5}
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isDisabled}
        title={
          isDisabled
            ? "Please fill in all fields"
            : "Submit your testimonial"
        }
        className={`${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        } text-white text-base lg:text-lg font-semibold py-3 px-6 rounded-lg transition flex items-center`}
      >
        {isSubmitting ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
};

export default AddTestimonial;