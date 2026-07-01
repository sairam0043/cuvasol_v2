import React, { useState } from 'react';
import { Brain, RefreshCw } from 'lucide-react';

export const AIInterview: React.FC = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  const sampleQuestion = "What are the rules you must follow when using React hooks?";

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const len = userAnswer.trim().length;
      let score = 5;
      let review = '';
      let checklist = {
        topLevel: false,
        noConditional: false,
        onlyReact: false,
      };

      const lower = userAnswer.toLowerCase();
      
      // Analyze text
      if (lower.includes('top level') || lower.includes('top-level') || lower.includes('loop')) {
        checklist.topLevel = true;
        score += 2;
      }
      if (lower.includes('conditional') || lower.includes('if') || lower.includes('ternary')) {
        checklist.noConditional = true;
        score += 2;
      }
      if (lower.includes('component') || lower.includes('custom hook') || lower.includes('custom')) {
        checklist.onlyReact = true;
        score += 1;
      }

      if (len < 30) {
        score = Math.min(score, 4);
        review = "Your answer was very brief. To ace this question, explain that Hooks must be called only at the top level (not inside loops or conditions) and only from React function components or custom Hooks.";
      } else if (score < 8) {
        review = "Good effort! You mentioned some core constraints, but make sure to explicitly state the 'rules of hooks' (top-level execution, only calling from React functional scopes).";
      } else {
        score = 9;
        review = "Excellent response! You clearly outlined the primary requirements. You explained both the top-level execution rules and the React component constraints perfectly.";
      }

      setEvaluationResult({ score, review, checklist });
      setIsEvaluating(false);
    }, 1500);
  };

  const handleReset = () => {
    setUserAnswer('');
    setEvaluationResult(null);
  };

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-6 pt-8">
        <span className="inline-flex px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          AI Interview Preparation
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gradient-primary tracking-tight">
          Ace Your Technical Screening
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Unlock unlimited mock screenings. Simulate live audio/text assessments for React Developer, Node.js Engineer, and Product Management positions. Receive detailed scoring transcripts instantly.
        </p>
      </section>

      {/* Mini Simulator Interface */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl font-bold text-white font-heading tracking-tight leading-tight">Try the Practice Coach</h2>
          <p className="text-zinc-405 text-xs leading-relaxed">
            Write down your answer to the sample hook question below. Our local validation scripts will analyze your content keywords, outline grading factors, and calculate your competency scores.
          </p>
          
          <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl space-y-2.5">
            <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Active Question:</h4>
            <p className="text-zinc-200 text-xs font-heading font-medium">
              "{sampleQuestion}"
            </p>
          </div>
        </div>

        {/* Input/Output container */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 relative shadow-2xl">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
            <div className="flex space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Practice Sandbox Coach</span>
          </div>

          {!evaluationResult ? (
            <form onSubmit={handleEvaluate} className="space-y-4">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your response here... (e.g. Hooks should be called at the top level of your components, never inside if conditions...)"
                required
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-850 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-zinc-650 resize-none font-sans leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-xs font-semibold text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                      <span>Analyzing Content...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-4.5 w-4.5" />
                      <span>Submit For Grading</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center bg-indigo-950/20 border border-indigo-950/40 p-4 rounded-2xl">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Evaluation Verdict</h4>
                  <p className="text-[10px] text-indigo-350">Grade calculated based on keyword coverage.</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-heading text-white">{evaluationResult.score}/10</span>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Competency Score</p>
                </div>
              </div>

              <div className="space-y-2 font-sans">
                <h5 className="text-[11px] font-bold text-white uppercase tracking-wider">Coach Feedback Review:</h5>
                <p className="text-zinc-400 text-xs leading-relaxed">{evaluationResult.review}</p>
              </div>

              <div className="space-y-2 text-[10px] font-mono border-t border-zinc-900 pt-4">
                <h5 className="text-zinc-500 uppercase tracking-widest font-bold">Grading Checklist Coverage:</h5>
                <ul className="space-y-1.5 text-zinc-400">
                  <li className="flex items-center space-x-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${evaluationResult.checklist.topLevel ? 'bg-emerald-450' : 'bg-rose-500'}`} />
                    <span>Called only at the top level: {evaluationResult.checklist.topLevel ? '✅ Covered' : '❌ Missed'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${evaluationResult.checklist.noConditional ? 'bg-emerald-450' : 'bg-rose-500'}`} />
                    <span>No conditional execution (if/loops): {evaluationResult.checklist.noConditional ? '✅ Covered' : '❌ Missed'}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${evaluationResult.checklist.onlyReact ? 'bg-emerald-450' : 'bg-rose-500'}`} />
                    <span>Called only from React functions/custom hooks: {evaluationResult.checklist.onlyReact ? '✅ Covered' : '❌ Missed'}</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-350 text-xs font-semibold cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry Simulation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features List Section */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-2xl font-bold font-heading text-white text-center tracking-tight">Full Mock Screening Suite</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-zinc-900/10 rounded-2xl border border-zinc-900 space-y-3">
            <h4 className="text-sm font-semibold text-white font-heading">Real-Time Sentiment Scoring</h4>
            <p className="text-zinc-455 text-xs leading-relaxed">
              Analyzes speech tone, vocabulary choices, and speed index to evaluate executive presence and communication clarity.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/10 rounded-2xl border border-zinc-900 space-y-3">
            <h4 className="text-sm font-semibold text-white font-heading">Keyword and Theory Checks</h4>
            <p className="text-zinc-455 text-xs leading-relaxed">
              Compares responses against production definitions of garbage collection, rendering lifecycles, and network topologies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
