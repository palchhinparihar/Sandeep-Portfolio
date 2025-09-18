const AddTestimonial = ({ handleSubmit, formData, handleChange }) => {
  const isDisabled =
    !formData.personName.trim() ||
    !formData.companyName.trim() ||
    !formData.review.trim();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 text-left">
      <div className="w-full flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="personName"
          placeholder="Your Name"
          value={formData.personName}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
      </div>
      <textarea
        name="review"
        placeholder="Write your review..."
        value={formData.review}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
        rows="5"
      />

      <button
        type="submit"
        disabled={isDisabled}
        className={`${
          isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } text-white text-base lg:text-lg font-semibold py-3 px-6 rounded-lg transition flex items-center`}
      >
        Submit Testimonial
      </button>
    </form>
  );
};

export default AddTestimonial;