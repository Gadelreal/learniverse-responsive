
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

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
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
        How ILUNION Hotels Uses Its Channels
      </h2>
      
      <p className="font-inter text-gray-600 mb-12 text-lg">
        Now that you are familiar with the structure of ILUNION Hotels' communication channels, we invite you to complete the following activity.
      </p>
      
      <p className="font-inter text-gray-600 mb-8">
        We are providing different messages that the company has disseminated via its different channels, and your task is to analyze these messages and match them with the right channels through which they were published.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-gray-50 rounded-lg">
            <p className="flex-grow font-inter text-secondary-foreground">
              {message}
            </p>
            <select
              value={answers[index]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="w-full md:w-64 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
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

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-200 rounded-md font-inter text-secondary-foreground hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md font-inter hover:bg-primary-hover transition-colors"
          >
            Submit
          </button>
        </div>
      </form>

      {showFeedback && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg animate-fade-up">
          <p className="font-inter text-gray-600 leading-relaxed">
            Thank you for reviewing all the messages and matching them with the different channels in ILUNION Hotels' structure. 
            Remember, while these messages were tailored for specific channels, there are no wrong answers. Many of these messages can also be adapted and reused across different platforms if they align with the communication strategy guidelines. 
            By following these guidelines, consistency and coherence will be ensured in any brand's messaging, enhancing its impact and reach.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChannelsExercise;
