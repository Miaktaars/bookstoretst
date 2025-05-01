"use client";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function AuthModal({ type: initialType, onClose }) {
  const [view, setView] = useState(initialType);
  const modalRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 backdrop-blur-md bg-white/10 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`w-[800px] ${
            view === "signup" ? "h-[600px]" : "h-[500px]"
          } bg-black rounded-xl shadow-xl flex overflow-hidden`}
        >
          <div className="w-1/2 hidden md:block">
            <img
              src="/log_bg_img.png"
              alt="Auth background"
              className="w-full h-full object-cover rounded-l-xl"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center px-10 text-white">
            {view === "login" ? (
              <LoginForm
                onClose={onClose}
                switchToSignup={() => setView("signup")}
              />
            ) : (
              <SignupForm
                onClose={onClose}
                switchToLogin={() => setView("login")}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
