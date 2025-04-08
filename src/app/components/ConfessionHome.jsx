"use client";
import React from "react";
import { useState } from "react";
import CreateConfessionForm from "./CreateConfessionForm";
import ConfessionCard from "./ConfessionCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ConfessionHome({ confessionsList }) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const maxLength = 1000;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (text.length > maxLength) {
      setError(`Confession exceeds ${maxLength} characters`);
      return;
    }
    if (text.trim().length === 0) {
      setError(`Add something to Confession `);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/confession/v1/create-confession`,
        { text: text },
        {
          withCredentials: true,
        }
      );
      toast.success(`Post Added`, {
        position: "top-center",
        duration: 5000,
      });
      setText("");
      router.refresh();
    } catch (err) {
      if (err.status === 301) {
        toast.error("Logged Out Please Login Again!", {
          duration: 5000,
          position: "top-center",
        });
        router.replace("/login");
      } else {
        setError(err?.response?.data?.message || "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Create Confession Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <CreateConfessionForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            error={error}
            setError={setError}
            text={text}
            setText={setText}
            maxLength={maxLength}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* Confession Wall Header */}
        <h2 className="text-center font-bold text-white text-3xl md:text-4xl bg-white/10 py-4 rounded-lg backdrop-blur-sm border border-white/20">
          Confession Wall
        </h2>

        {/* Confessions List */}
        <div className="space-y-6">
          {confessionsList.length > 0 ? (
            confessionsList.map((confession) => (
              <ConfessionCard key={confession._id} confession={confession} />
            ))
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <p className="text-white/80 text-lg">
                No confessions available yet
              </p>
              <p className="text-white/60 mt-2">Be the first to share!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
