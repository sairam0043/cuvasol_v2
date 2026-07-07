import React from 'react';
import { Accordion } from '../components/Accordion.js';
import { HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What is Cuvasol?',
      answer: 'Cuvasol blends a human-centered philosophy with artificial intelligence to turn aspirations into real job opportunities. Through experiential learning and interview preparation, Cuvasol helps students and job seekers build confidence, improve communication skills, and master the art of interviewing. Virtual interviews were present prior to the pandemic, but they were focused in areas like hiring. Due to Covid-19 they have made inroads into other verticals like education. Cuvasol is the world\'s only platform that provides immediate interview rating and feedback by a combination of human and artificial intelligence. Once you have assessed your preparedness by utilizing our free app on the App Store and Google Play, our world class admission agencies can offer a wide range of expert service from career path selection, course selection, college selection and admission process in leading educational institutions in India and abroad.'
    },
    {
      question: 'What is Interview Rating?',
      answer: 'Each video session pertaining to a question asked during the interview will run through an AI engine that will evaluate the session based on content, emotion, posture and verbal parameters. The engine will output a rating value on a scale of 1-5 (1 being poor, and 5 being excellent).'
    },
    {
      question: 'Do you provide support?',
      answer: 'We provide email support. Students wishing to gain admission to colleges in countries like US, Canada, Australia or United Kingdom are able to directly engage with our partner world class admission agencies.'
    },
    {
      question: 'Can an interview rating change?',
      answer: 'We understand that AI is not perfect and there are still many years before we can see a Terminator like Arnold!. In the meantime, humans who run the company (yes we are not robots!) will reprocess the video sessions and modify the rating if required.'
    },
    {
      question: 'What are the differences in the plans?',
      answer: 'Students can access up to 25 questions and record 30 video sessions. They can receive score and progress reports, and avail of interview advisory service from world class admission agencies.'
    },
    {
      question: 'What is Progress report?',
      answer: 'Progress report compares the student\'s performance against other students for the same interview and question.'
    },
    {
      question: 'What is Interview Score report?',
      answer: 'Interview Score is calculated by using content, emotion, posture and verbal parameters of each video session.'
    },
    {
      question: 'What is Deep Learning report?',
      answer: 'Once you have registered at least 1 rating on your video, it\'s possible to get insight into that score by triggering a "Deep Learning Report". This report provides granular details about each aspect of your score so that you can focus on those particular areas and improve your score.'
    },
    {
      question: 'What kind of plans do you have?',
      answer: 'We have 2 categories. One is a student plan for anyone wishing to improve their verbal, speaking, body language skills. The other two are company plans that will allow human resources in university, college or company to recruit or train employees.'
    },
    {
      question: 'How can I add hiring managers?',
      answer: 'In myaccount, you will find a way to add and send invites to hiring managers. Once they click on the link, they will be able to sign up.'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      {/* Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
          Resources
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-gradient-primary tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
          Find answers to common questions about Cuvasol’s interview prep, training programs, and platform features.
        </p>
      </section>

      {/* Accordion container */}
      <section className="pt-6 max-w-4xl mx-auto">
        <Accordion items={faqs} />
      </section>

      {/* Quick Help Card */}
      <section className="max-w-xl mx-auto bg-zinc-950 border border-zinc-900 rounded-3xl p-6 text-center space-y-3 relative overflow-hidden">
        <div className="p-2.5 bg-indigo-950/20 text-indigo-400 border border-indigo-500/15 rounded-xl w-fit mx-auto">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-semibold text-white font-heading">Still have questions?</h4>
        <p className="text-zinc-550 text-xs">Our placement coordinators are ready to support. Email us directly at info@cuvasol.com.</p>
      </section>
    </div>
  );
};
export default FAQ;
