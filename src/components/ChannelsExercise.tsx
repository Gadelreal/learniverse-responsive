
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Card } from "./ui/card";

const STORAGE_KEY = 'ilunion_channels_exercise_answers';

const messages = [
  "You will never be given a dream without also giving yourself the power to make it come true.",
  "You are the protagonists because you are the essence of this organisation, and you are the ones who make people change and look at the world with different eyes.",
  "ILUNION Hotels presents its new claim: 'Where sleeping is an awakening'.",
  "We are much more than hotels. We are leaders in accessibility and social inclusion. #WhereSleepingIsanAwakening",
  "Did you know that when you sleep in an ILUNION hotel, many things that were dormant awaken in you?",
  "As the most accessible and inclusive hotel chain in the world, ILUNION Hotels has just reopened its holiday establishments. A place where you will find a unique model in the world.",
  "Welcome to a different world",
  "Awaken your power to take care of our home and those who live in it.",
  "Awaken your power to shape diversity into a more inclusive and supportive world."
];

const channelOptions = [
  "Facebook",
  "Spotlight",
  "Press",
  "Instagram",
  "Radio",
  "Television",
  "Hotel",
  "Applies to all channels"
];

const ChannelsExercise = () => {
  const [answers, setAnswers] = useState<string[]>(Array(messages.length).fill(''));
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setShowFeedback(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some(answer => !answer)) {
      toast.error("Please select a channel for each message before submitting.");
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    setShowFeedback(true);
    toast.success("Your answers have been saved successfully!");
  };

  const handleReset = () => {
    setAnswers(Array(messages.length).fill(''));
    setShowFeedback(false);
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Your answers have been reset.");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-white shadow-sm">
      <div className="mb-12">
        <h2 className="font-playfair text-4xl font-bold mb-8 text-gray-900">
          Uses Its Channels
        </h2>
        
        <p className="font-inter text-gray-600 mb-8 text-lg">
          Now that you are familiar with the structure of ILUNION Hotels' communication channels, we invite you to complete the following activity.
        </p>
        
        <p className="font-inter text-gray-600 mb-12">
          We are providing different messages that the company has disseminated via its different channels, and your task is to analyze these messages and match them with the right channels through which they were published.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-start gap-6 py-6 border-t border-gray-100 last:border-b">
            <p className="flex-grow font-inter text-gray-600 text-sm leading-relaxed">
              {message}
            </p>
            <select
              value={answers[index]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="w-full md:w-48 p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-600 font-inter"
            >
              <option value="">Select a channel</option>
              {channelOptions.map((channel) => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex justify-end gap-4 mt-8 pt-6">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-200 rounded-md font-inter text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md font-inter text-sm hover:bg-primary-hover transition-colors"
          >
            Submit
          </button>
        </div>
      </form>

      {showFeedback && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="font-inter text-sm text-gray-600 leading-relaxed">
            Thank you for reviewing all the messages and matching them with the different channels in ILUNION Hotels' structure. 
            Remember, while these messages were tailored for specific channels, there are no wrong answers. Many of these messages can also be adapted and reused across different platforms if they align with the communication strategy guidelines. 
            By following these guidelines, consistency and coherence will be ensured in any brand's messaging, enhancing its impact and reach.
          </p>
        </div>
      )}
    </Card>
  );
};

export default ChannelsExercise;
