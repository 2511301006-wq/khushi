/* ============================================================
   GOOGLE ANTIGRAVITY QUIZ - MAIN JAVASCRIPT
   ============================================================
   Handles quiz logic, scoring, localStorage, navigation,
   and dynamic background/animation generation.
   ============================================================ */

// ===================== QUESTION BANKS =====================
// Each subject has 5 multiple-choice questions.
// Format: { question, options (array of 4), answer (index 0-3) }

const QUESTIONS = {

  science: [
    {
      question: "What is the speed of light in vacuum (approximately)?",
      options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
      answer: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Jupiter", "Mars", "Saturn"],
      answer: 2
    },
    {
      question: "What is the chemical symbol for Gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      answer: 2
    },
    {
      question: "DNA stands for:",
      options: [
        "Deoxyribonucleic Acid",
        "Dinitrogen Acid",
        "Deoxyribose Nucleic Atom",
        "Dynamic Nuclear Acid"
      ],
      answer: 0
    },
    {
      question: "What force keeps planets in orbit around the Sun?",
      options: ["Electromagnetic force", "Nuclear force", "Gravitational force", "Friction"],
      answer: 2
    }
  ],

  math: [
    {
      question: "What is the value of π (pi) rounded to two decimal places?",
      options: ["3.41", "3.14", "3.16", "2.14"],
      answer: 1
    },
    {
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2x²"],
      answer: 1
    },
    {
      question: "What is the square root of 144?",
      options: ["14", "11", "13", "12"],
      answer: 3
    },
    {
      question: "In a right triangle, what does the Pythagorean theorem state?",
      options: [
        "a + b = c",
        "a² + b² = c²",
        "a² - b² = c²",
        "a × b = c²"
      ],
      answer: 1
    },
    {
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      answer: 2
    }
  ],

  history: [
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      answer: 2
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
      answer: 1
    },
    {
      question: "The ancient city of Rome was built on how many hills?",
      options: ["5", "6", "7", "8"],
      answer: 2
    },
    {
      question: "Which civilization built the Machu Picchu complex?",
      options: ["Aztec", "Maya", "Inca", "Olmec"],
      answer: 2
    },
    {
      question: "The French Revolution began in which year?",
      options: ["1776", "1789", "1804", "1815"],
      answer: 1
    }
  ],

  geography: [
    {
      question: "What is the largest continent by area?",
      options: ["Africa", "North America", "Asia", "Europe"],
      answer: 2
    },
    {
      question: "Which river is the longest in the world?",
      options: ["Amazon", "Yangtze", "Mississippi", "Nile"],
      answer: 3
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: 2
    },
    {
      question: "Mount Everest is located in which mountain range?",
      options: ["Andes", "Alps", "Rockies", "Himalayas"],
      answer: 3
    },
    {
      question: "Which country has the most natural lakes?",
      options: ["United States", "Canada", "Russia", "Brazil"],
      answer: 1
    }
  ],

  cs: [
    {
      question: "What does 'HTML' stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      answer: 0
    },
    {
      question: "Which data structure uses FIFO (First In, First Out)?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: 1
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      answer: 2
    },
    {
      question: "Which programming language was created by Guido van Rossum?",
      options: ["Java", "C++", "Ruby", "Python"],
      answer: 3
    },
    {
      question: "What does 'CSS' stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets"
      ],
      answer: 1
    }
  ]
};

// Subject display names and colors
const SUBJECT_META = {
  science:   { name: "Science",          icon: "🔬", color: "#4285f4" },
  math:      { name: "Mathematics",      icon: "📐", color: "#a142f4" },
  history:   { name: "History",           icon: "📜", color: "#fbbc05" },
  geography: { name: "Geography",        icon: "🌍", color: "#34a853" },
  cs:        { name: "Computer Science",  icon: "💻", color: "#00bcd4" }
};

// ===================== QUIZ ENGINE =====================

/**
 * QuizEngine manages the state for one quiz subject at a time.
 * It reads & writes progress to localStorage.
 */
class QuizEngine {
  constructor(subject) {
    this.subject = subject;
    this.questions = QUESTIONS[subject] || [];
    this.currentIndex = 0;
    this.answers = new Array(this.questions.length).fill(null);
    this.score = 0;
    this.isComplete = false;

    // Load any saved progress for this subject
    this.loadProgress();
  }

  /** Get the current question object */
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  /** Select an answer for the current question */
  selectAnswer(optionIndex) {
    this.answers[this.currentIndex] = optionIndex;
    this.saveProgress();
  }

  /** Move to next question. Returns false if already at last question. */
  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  /** Move to previous question. Returns false if already at first question. */
  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  /** Calculate and store the final score */
  calculateScore() {
    this.score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.answers[i] === this.questions[i].answer) {
        this.score++;
      }
    }
    this.isComplete = true;
    this.saveProgress();
    return this.score;
  }

  /** Save progress to localStorage */
  saveProgress() {
    const data = {
      currentIndex: this.currentIndex,
      answers: this.answers,
      score: this.score,
      isComplete: this.isComplete
    };
    localStorage.setItem(`quiz_${this.subject}`, JSON.stringify(data));
  }

  /** Load progress from localStorage */
  loadProgress() {
    const saved = localStorage.getItem(`quiz_${this.subject}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.currentIndex = data.currentIndex || 0;
        this.answers = data.answers || new Array(this.questions.length).fill(null);
        this.score = data.score || 0;
        this.isComplete = data.isComplete || false;
      } catch (e) {
        // If corrupted, start fresh
        console.warn(`Could not load progress for ${this.subject}:`, e);
      }
    }
  }

  /** Reset this subject's progress */
  reset() {
    this.currentIndex = 0;
    this.answers = new Array(this.questions.length).fill(null);
    this.score = 0;
    this.isComplete = false;
    localStorage.removeItem(`quiz_${this.subject}`);
  }
}

// ===================== GLOBAL HELPERS =====================

/**
 * Get scores for all subjects from localStorage.
 * Returns an object like { science: { score, total, complete }, ... }
 */
function getAllScores() {
  const scores = {};
  for (const subject of Object.keys(QUESTIONS)) {
    const saved = localStorage.getItem(`quiz_${subject}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        scores[subject] = {
          score: data.score || 0,
          total: QUESTIONS[subject].length,
          complete: data.isComplete || false
        };
      } catch (e) {
        scores[subject] = { score: 0, total: QUESTIONS[subject].length, complete: false };
      }
    } else {
      scores[subject] = { score: 0, total: QUESTIONS[subject].length, complete: false };
    }
  }
  return scores;
}

/** Calculate total score across all subjects */
function getTotalScore() {
  const scores = getAllScores();
  let total = 0, max = 0;
  for (const s of Object.values(scores)) {
    total += s.score;
    max += s.total;
  }
  return { score: total, max };
}

/** Clear all quiz data from localStorage */
function resetAllQuizzes() {
  for (const subject of Object.keys(QUESTIONS)) {
    localStorage.removeItem(`quiz_${subject}`);
  }
}

/** Navigate with a transition effect */
function navigateTo(url) {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

// ===================== QUIZ UI RENDERER =====================

/**
 * Renders quiz UI for a given subject page.
 * Expects these elements in the HTML:
 *   #question-number, #question-text, #options-container,
 *   #progress-bar, #progress-text, #btn-prev, #btn-next
 */
function initQuizPage(subject) {
  const engine = new QuizEngine(subject);

  // If quiz already complete, redirect to results
  if (engine.isComplete) {
    // Allow retake by resetting
    engine.reset();
  }

  const questionNumber = document.getElementById('question-number');
  const questionText   = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const progressBar    = document.getElementById('progress-bar');
  const progressText   = document.getElementById('progress-text');
  const prevBtn        = document.getElementById('btn-prev');
  const nextBtn        = document.getElementById('btn-next');

  const letters = ['A', 'B', 'C', 'D'];

  function renderQuestion() {
    const q = engine.getCurrentQuestion();
    const idx = engine.currentIndex;
    const total = engine.questions.length;

    // Update progress
    const percent = ((idx + 1) / total) * 100;
    if (progressBar) progressBar.style.width = percent + '%';
    if (progressText) progressText.textContent = `${idx + 1} / ${total}`;

    // Question info
    if (questionNumber) questionNumber.textContent = `Question ${idx + 1} of ${total}`;
    if (questionText) questionText.textContent = q.question;

    // Options
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (engine.answers[idx] === i) btn.classList.add('selected');

        btn.innerHTML = `
          <span class="option-letter">${letters[i]}</span>
          <span class="option-text">${opt}</span>
        `;

        btn.addEventListener('click', () => {
          engine.selectAnswer(i);
          renderQuestion(); // Re-render to show selection
        });

        optionsContainer.appendChild(btn);
      });
    }

    // Navigation buttons
    if (prevBtn) {
      prevBtn.style.visibility = idx === 0 ? 'hidden' : 'visible';
    }

    if (nextBtn) {
      if (idx === total - 1) {
        nextBtn.textContent = 'Finish Quiz →';
        nextBtn.className = 'btn btn-success';
      } else {
        nextBtn.textContent = 'Next →';
        nextBtn.className = 'btn btn-primary';
      }
    }
  }

  // Button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (engine.prevQuestion()) renderQuestion();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Require an answer before proceeding
      if (engine.answers[engine.currentIndex] === null) {
        nextBtn.classList.add('shake');
        setTimeout(() => nextBtn.classList.remove('shake'), 500);
        return;
      }

      if (engine.currentIndex === engine.questions.length - 1) {
        // Last question — calculate score and go to results
        engine.calculateScore();
        navigateTo('results.html');
      } else {
        engine.nextQuestion();
        renderQuestion();
      }
    });
  }

  // Initial render
  renderQuestion();
}

// ===================== BACKGROUND GENERATORS =====================

/** Generate twinkling stars for Science page */
function generateStars(count = 100) {
  const container = document.querySelector('.stars') || document.body;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
    star.style.setProperty('--delay', (Math.random() * 3) + 's');
    star.style.width = (1 + Math.random() * 2) + 'px';
    star.style.height = star.style.width;
    container.appendChild(star);
  }
}

/** Generate floating geometric shapes for Math page */
function generateGeoShapes(count = 15) {
  const shapes = ['triangle', 'circle', 'square'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    el.className = `geo-shape ${shape}`;
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.animation = `geoFloat ${5 + Math.random() * 8}s ease-in-out infinite`;
    el.style.animationDelay = (Math.random() * 4) + 's';
    document.body.appendChild(el);
  }
}

/** Generate neon scan lines for CS page */
function generateNeonLines(count = 6) {
  for (let i = 0; i < count; i++) {
    const line = document.createElement('div');
    line.className = 'neon-line';
    line.style.top = (15 + Math.random() * 70) + '%';
    line.style.left = '0';
    line.style.width = (30 + Math.random() * 70) + '%';
    line.style.animationDelay = (Math.random() * 3) + 's';
    line.style.animationDuration = (3 + Math.random() * 4) + 's';
    document.body.appendChild(line);
  }
}

// ===================== RESULTS PAGE =====================

/** Render the results page with subject-wise scores */
function initResultsPage() {
  const scores = getAllScores();
  const grid = document.getElementById('results-grid');
  const totalEl = document.getElementById('total-score');
  const totalMaxEl = document.getElementById('total-max');
  const scoreCircle = document.getElementById('score-circle');
  const messageEl = document.getElementById('result-message');

  if (grid) {
    grid.innerHTML = '';
    for (const [subject, data] of Object.entries(scores)) {
      const meta = SUBJECT_META[subject];
      const percent = data.total > 0 ? (data.score / data.total) * 100 : 0;

      const card = document.createElement('div');
      card.className = `result-card ${subject}`;
      card.innerHTML = `
        <span class="subject-icon">${meta.icon}</span>
        <div class="subject-name">${meta.name}</div>
        <div class="score-value">${data.complete ? data.score + '/' + data.total : '—'}</div>
        <div class="score-bar">
          <div class="score-bar-fill" style="width: 0%"></div>
        </div>
      `;

      // Float animation variations
      card.style.animationDelay = (Math.random() * 2) + 's';
      grid.appendChild(card);

      // Animate the bar fill
      setTimeout(() => {
        card.querySelector('.score-bar-fill').style.width = (data.complete ? percent : 0) + '%';
      }, 500);
    }
  }

  // Total score
  const total = getTotalScore();
  if (totalEl) totalEl.textContent = total.score;
  if (totalMaxEl) totalMaxEl.textContent = total.max;

  // Score circle
  if (scoreCircle) {
    const percent = total.max > 0 ? (total.score / total.max) * 100 : 0;
    setTimeout(() => {
      scoreCircle.style.setProperty('--score-percent', percent + '%');
    }, 300);
  }

  // Message based on score
  if (messageEl) {
    const percent = total.max > 0 ? (total.score / total.max) * 100 : 0;
    if (percent >= 80) {
      messageEl.textContent = "🎉 Outstanding! You're a quiz master!";
    } else if (percent >= 60) {
      messageEl.textContent = "👏 Great job! Keep learning!";
    } else if (percent >= 40) {
      messageEl.textContent = "📚 Good effort! Room for improvement!";
    } else {
      messageEl.textContent = "💪 Don't give up! Try again!";
    }
  }
}

/** Render the final summary page */
function initSummaryPage() {
  const scores = getAllScores();
  const total = getTotalScore();
  const percent = total.max > 0 ? (total.score / total.max) * 100 : 0;

  const totalEl = document.getElementById('summary-total');
  const maxEl = document.getElementById('summary-max');
  const percentEl = document.getElementById('summary-percent');
  const gradeEl = document.getElementById('summary-grade');
  const breakdownEl = document.getElementById('summary-breakdown');
  const scoreCircle = document.getElementById('summary-circle');

  if (totalEl) totalEl.textContent = total.score;
  if (maxEl) maxEl.textContent = total.max;
  if (percentEl) percentEl.textContent = Math.round(percent) + '%';

  // Grade
  if (gradeEl) {
    let grade = 'F';
    if (percent >= 90) grade = 'A+';
    else if (percent >= 80) grade = 'A';
    else if (percent >= 70) grade = 'B';
    else if (percent >= 60) grade = 'C';
    else if (percent >= 50) grade = 'D';
    gradeEl.textContent = grade;
  }

  // Circle
  if (scoreCircle) {
    setTimeout(() => {
      scoreCircle.style.setProperty('--score-percent', percent + '%');
    }, 300);
  }

  // Breakdown
  if (breakdownEl) {
    breakdownEl.innerHTML = '';
    for (const [subject, data] of Object.entries(scores)) {
      const meta = SUBJECT_META[subject];
      const p = data.total > 0 ? Math.round((data.score / data.total) * 100) : 0;
      const row = document.createElement('div');
      row.className = 'breakdown-row';
      row.innerHTML = `
        <span class="breakdown-icon">${meta.icon}</span>
        <span class="breakdown-name">${meta.name}</span>
        <span class="breakdown-score">${data.complete ? data.score + '/' + data.total : 'Not taken'}</span>
        <span class="breakdown-percent" style="color: ${meta.color}">${data.complete ? p + '%' : '—'}</span>
      `;
      breakdownEl.appendChild(row);
    }
  }
}

// ===================== SUBJECT SELECTION PAGE =====================

/** Update subject cards to show completion status */
function initSubjectSelection() {
  const scores = getAllScores();
  const cards = document.querySelectorAll('.subject-card');

  cards.forEach(card => {
    const subject = card.dataset.subject;
    if (subject && scores[subject]) {
      const badge = card.querySelector('.status-badge');
      if (badge) {
        if (scores[subject].complete) {
          badge.textContent = `✓ Done (${scores[subject].score}/${scores[subject].total})`;
          badge.className = 'status-badge completed';
        } else {
          badge.textContent = 'Not started';
          badge.className = 'status-badge not-started';
        }
      }
    }
  });
}

// ===================== LANDING PAGE EFFECTS =====================

/** Animate letters individually on the landing page logo */
function initLogoAnimation() {
  const logo = document.querySelector('.antigravity-logo');
  if (!logo) return;

  const text = logo.dataset.text || 'AntiGravity';
  logo.innerHTML = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = (i * 0.08) + 's';
    logo.appendChild(span);
  });
}

/** Create floating background elements for landing page */
function initFloatingElements() {
  const container = document.querySelector('.floating-elements');
  if (!container) return;

  // Already has static elements from HTML — add ~20 more small ones
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.className = 'floating-el';
    const size = 10 + Math.random() * 40;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : (Math.random() * 20) + 'px';

    const colors = ['#4285f4', '#ea4335', '#fbbc05', '#34a853', '#a142f4', '#00bcd4'];
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.opacity = 0.05 + Math.random() * 0.1;

    const duration = 6 + Math.random() * 10;
    el.style.animation = `drift ${duration}s ease-in-out infinite`;
    el.style.animationDelay = (Math.random() * 5) + 's';

    container.appendChild(el);
  }
}

// ===================== INIT ON DOM READY =====================
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in body
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.3s ease';

  // Determine which page we're on based on body classes or data attribute
  const page = document.body.dataset.page;

  switch (page) {
    case 'landing':
      initLogoAnimation();
      initFloatingElements();
      break;

    case 'instructions':
      // No special init needed — CSS handles animations
      break;

    case 'subjects':
      initSubjectSelection();
      break;

    case 'science':
      generateStars(120);
      initQuizPage('science');
      break;

    case 'math':
      generateGeoShapes(18);
      initQuizPage('math');
      break;

    case 'history':
      initQuizPage('history');
      break;

    case 'geography':
      initQuizPage('geography');
      break;

    case 'cs':
      generateNeonLines(8);
      initQuizPage('cs');
      break;

    case 'results':
      initResultsPage();
      break;

    case 'summary':
      initSummaryPage();
      initFloatingElements();
      break;
  }
});
