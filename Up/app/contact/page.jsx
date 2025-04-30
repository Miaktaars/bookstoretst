"use client";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="bg-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 -mt-15">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">Contact Us</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We'd love to hear from you! Whether you have questions about our
          books, need help with an order, or just want to share your reading
          recommendations, our team is here to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-orange-500 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Our Bookstore</h3>
                  <p className="text-gray-300">123 Bookworm Lane</p>
                  <p className="text-gray-300">Literary District</p>
                  <p className="text-gray-300">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-500 p-3 rounded-full mr-4">
                  <FaPhone className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-300 text-sm mt-1">
                    Mon-Fri: 9am-6pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-500 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                  <p className="text-gray-300">info@bookhaven.com</p>
                  <p className="text-gray-300">support@bookhaven.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-500 p-3 rounded-full mr-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Opening Hours</h3>
                  <p className="text-gray-300">
                    Monday - Friday: 9:00 AM - 8:00 PM
                  </p>
                  <p className="text-gray-300">Saturday: 10:00 AM - 9:00 PM</p>
                  <p className="text-gray-300">Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">
              Connect With Us
            </h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-orange-500 p-4 rounded-full transition-colors"
              >
                <FaFacebook className="text-white text-xl" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-orange-500 p-4 rounded-full transition-colors"
              >
                <FaTwitter className="text-white text-xl" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-orange-500 p-4 rounded-full transition-colors"
              >
                <FaInstagram className="text-white text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="space-y-8">
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                >
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Book Recommendations</option>
                  <option>Event Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Google Map Embed */}
          <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">Find Us</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132329!2d-73.98784492423945!3d40.74844097138989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sThe%20Strand%20Book%20Store!5e0!3m2!1sen!2sus!4v1712345678901"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-gray-300 mt-4 text-sm">
              <FaMapMarkerAlt className="inline mr-2 text-orange-500" />
              The Strand Book Store - 828 Broadway, New York, NY 10003 (Sample
              Location)
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="max-w-7xl mx-auto mt-16 bg-gray-900/50 p-8 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">
          More Ways to Connect
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Book Clubs</h3>
            <p className="text-gray-300">
              Join one of our weekly book clubs! Meet fellow readers and discuss
              your favorite books.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Author Events</h3>
            <p className="text-gray-300">
              Check our calendar for upcoming author readings, signings, and
              literary discussions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">School Programs</h3>
            <p className="text-gray-300">
              We offer special programs for schools and educators. Contact us
              for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
