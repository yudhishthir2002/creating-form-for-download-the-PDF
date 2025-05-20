import React, { useState } from 'react';

const PDF_URL = './../../public/yudhishthir-Grand-Total.pdf'; // URL of the PDF file

const DownloadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.contact.trim())
      newErrors.contact = 'Contact number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const downloadThePDF = (url) => {
    fetch(url)
      .then((response) => {
        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }
        return response.blob(); // Return the blob
      })
      .then((blob) => {
        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob); // No need for new Blob([blob])
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'YudhishthirSharma.pdf'; // Set a consistent download name
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl); // Clean up the blob URL
        console.log('PDF download triggered');
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
        alert(
          'Failed to download PDF. Please check if the file exists or try again later.'
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    downloadThePDF(PDF_URL);
    console.log('Form submitted:', formData);
    // Optionally reset form
    setFormData({ name: '', email: '', contact: '', message: '' });
    setErrors({});
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Get Your Free PDF
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Name <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email <span className="text-red-500"> *</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact Number <span className="text-red-500"> *</span>
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          {errors.contact && (
            <p className="text-red-600 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message <span className="text-red-500"> *</span>
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 resize-none"
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Submit & Download PDF
        </button>
      </form>
    </div>
  );
};

export default DownloadForm;
