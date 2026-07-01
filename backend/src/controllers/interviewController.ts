import { Response, NextFunction } from 'express';
import { Interview } from '../models/Interview.js';
import { AuthRequest } from '../middleware/auth.js';
import { isDbConnected, mockInterviews } from '../services/mockDb.js';

// Pre-defined question sets for popular roles
const QUESTION_BANK: Record<string, string[]> = {
  'React Developer': [
    'Explain the concept of Virtual DOM in React and how the reconciliation process works.',
    'What are React hooks? What are the rules you must follow when using them?',
    'How do you handle state management in a large-scale React app? When do you choose Context API vs Redux/Zustand?',
    'Describe the performance optimization techniques available in React (e.g. useMemo, useCallback, React.memo).'
  ],
  'Node.js Developer': [
    'Explain the Node.js event loop. How does it handle asynchronous I/O operations?',
    'What is Express middleware, and how does error-handling middleware differ from regular middleware?',
    'How do you manage sessions and secure authentication in a Node.js REST API?',
    'What are streams in Node.js, and when would you use them over standard file system methods?'
  ],
  'Product Manager': [
    'How do you prioritize features for a product roadmap? What frameworks (e.g. RICE, MoSCoW) do you use?',
    'Describe how you would measure the success of a new user onboarding flow.',
    'How do you handle conflicting demands or priorities from engineering, marketing, and executives?',
    'Describe a product launch that failed. What went wrong and what did you learn?'
  ],
  'Data Scientist': [
    'What is the difference between supervised and unsupervised learning? Provide examples of each.',
    'Explain the bias-variance trade-off in machine learning. How do you handle overfitting?',
    'How do you handle missing or corrupted data in a large dataset before training a model?',
    'Explain how a Random Forest model works under the hood.'
  ]
};

const DEFAULT_TOPIC = 'React Developer';

// @desc    Start new AI interview
// @route   POST /api/v1/interviews/start
// @access  Private
export const startInterview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { topic } = req.body;
    const selectedTopic = topic && QUESTION_BANK[topic] ? topic : DEFAULT_TOPIC;
    const questionTexts = QUESTION_BANK[selectedTopic];

    const questions = questionTexts.map(q => ({
      question: q,
      userResponse: '',
      aiFeedback: '',
      score: 0
    }));

    if (!isDbConnected()) {
      const mockSession = {
        _id: 'int_' + Math.random().toString(36).substring(2, 9),
        userId: req.user.id,
        topic: selectedTopic,
        questions,
        score: 0,
        overallFeedback: '',
        status: 'in-progress',
        createdAt: new Date().toISOString()
      };
      mockInterviews.push(mockSession);
      return res.status(201).json({ success: true, data: mockSession });
    }

    const interview = await Interview.create({
      userId: req.user.id,
      topic: selectedTopic,
      questions,
      score: 0,
      overallFeedback: '',
      status: 'in-progress'
    });

    res.status(201).json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit answer to a question in the interview
// @route   POST /api/v1/interviews/:id/submit-answer
// @access  Private
export const submitAnswer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { questionIndex, answer } = req.body;
    let interview: any;

    if (!isDbConnected()) {
      interview = mockInterviews.find(i => i._id === req.params.id);
    } else {
      interview = await Interview.findById(req.params.id);
    }

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }

    if (interview.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Interview is already completed' });
    }

    const idx = parseInt(questionIndex);
    if (isNaN(idx) || idx < 0 || idx >= interview.questions.length) {
      return res.status(400).json({ success: false, message: 'Invalid question index' });
    }

    // Evaluate answer and generate mock smart feedback
    let score = 5;
    let feedback = '';

    const responseLen = answer ? answer.trim().length : 0;
    if (responseLen < 15) {
      score = 3;
      feedback = 'The response was too short. Please provide a more detailed explanation of the concept, including practical code or architectural context.';
    } else if (responseLen < 60) {
      score = 5;
      feedback = 'You gave a basic answer but missed key details. Consider expanding on how this functions, its core mechanics, and typical usage in production.';
    } else {
      score = 8;
      feedback = 'Solid response! You demonstrated good knowledge of the topic. To achieve a perfect score, provide explicit real-world examples, potential drawbacks, or compare it with alternatives.';
      
      const lower = answer.toLowerCase();
      if (lower.includes('render') || lower.includes('non-blocking') || lower.includes('metric') || lower.includes('dataset') || lower.includes('lifecycle')) {
        score += 1;
      }
      if (lower.includes('performance') || lower.includes('optimize') || lower.includes('architecture') || lower.includes('scale')) {
        score += 1;
      }
      score = Math.min(score, 10);
    }

    interview.questions[idx].userResponse = answer || '';
    interview.questions[idx].aiFeedback = feedback;
    interview.questions[idx].score = score;

    // Check if this was the last question
    const allAnswered = interview.questions.every((q: any, i: number) => i === idx ? !!answer : !!q.userResponse);
    
    if (allAnswered) {
      interview.status = 'completed';
      
      const totalScore = interview.questions.reduce((acc: number, q: any) => acc + (q.score || 0), 0);
      const avgScore = (totalScore / (interview.questions.length * 10)) * 100;
      interview.score = Math.round(avgScore);

      // Generate overall review summary
      if (interview.score >= 80) {
        interview.overallFeedback = `Excellent job! You demonstrated deep technical knowledge in ${interview.topic}. You are well-prepared for technical screenings. Focus on refining your system design answers to stand out.`;
      } else if (interview.score >= 60) {
        interview.overallFeedback = `Good performance. You have a solid grasp of core ${interview.topic} concepts. Focus on brushing up on advanced optimization, edge-cases, and explaining underlying mechanics in your next interview.`;
      } else {
        interview.overallFeedback = `You showed basic familiarity with the topic, but there are notable gaps in core theoretical understanding. We recommend reviewing the syllabus, working on practical challenges, and retrying.`;
      }
    }

    if (isDbConnected()) {
      await interview.save();
    }
    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

// @desc    Get interview session detail
// @route   GET /api/v1/interviews/:id
// @access  Private
export const getInterviewById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    let interview: any;

    if (!isDbConnected()) {
      interview = mockInterviews.find(i => i._id === req.params.id);
    } else {
      interview = await Interview.findById(req.params.id);
    }

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }
    
    // Safety check - user can only see their own interviews unless they are admin
    if (interview.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this interview report' });
    }

    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all user interviews
// @route   GET /api/v1/interviews
// @access  Private
export const getUserInterviews = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (!isDbConnected()) {
      const userInterviews = mockInterviews.filter(i => i.userId === req.user.id);
      return res.status(200).json({ success: true, count: userInterviews.length, data: userInterviews });
    }

    const interviews = await Interview.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: interviews.length, data: interviews });
  } catch (error) {
    next(error);
  }
};
