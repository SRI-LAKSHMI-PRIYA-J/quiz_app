document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Element References ---
  const mainPage = document.getElementById("mainPage");
  const subCategoryPage = document.getElementById("subCategoryPage");
  const quizPage = document.getElementById("quizPage");
  const resultPage = document.getElementById("resultPage");
  const reviewPage = document.getElementById("reviewPage");

  const subCategoryButtonsDiv = document.getElementById("subCategoryButtons");
  // Back arrow element on the Subcategory page
  const backArrow = document.getElementById("backArrow");

  const questionTextEl = document.getElementById("questionText");
  const optionsListEl = document.getElementById("optionsList");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");

  const scoreDisplay = document.getElementById("scoreDisplay");
  const restartBtn = document.getElementById("restartBtn");
  const leaveBtn = document.getElementById("leaveBtn");
  const checkAnswersBtn = document.getElementById("checkAnswersBtn");

  const reviewContainer = document.getElementById("reviewContainer");
  const backToResultBtn = document.getElementById("backToResultBtn");

  // --- Global State Variables ---
  let selectedCategory = "";
  let selectedSubcategory = "";
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];
  let userAnswers = [];
  let isRestart = false; // Flag to determine if questions should be shuffled on restart

  // --- Quiz Data Arrays (10 Questions Each) ---

  // Web Development Quiz Data
  const webDevelopmentQuizData = [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "HyperText Machine Language"
      ],
      answer: "HyperText Markup Language"
    },
    {
      question: "Which HTML tag is used for the largest heading?",
      options: ["<h1>", "<h2>", "<h3>", "<h4>"],
      answer: "<h1>"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which property is used to change the background color in CSS?",
      options: ["color", "background-color", "bgcolor", "font-color"],
      answer: "background-color"
    },
    {
      question: "What does JavaScript primarily add to a website?",
      options: ["Structure", "Styling", "Interactivity", "Content"],
      answer: "Interactivity"
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      options: ["style", "class", "font", "styles"],
      answer: "style"
    },
    {
      question: "Which symbol is used to denote an ID selector in CSS?",
      options: [".", "#", "*", "@"],
      answer: "#"
    },
    {
      question: "Which HTML element is used for inserting a line break?",
      options: ["<br>", "<lb>", "<break>", "<hr>"],
      answer: "<br>"
    },
    {
      question: "What does URL stand for?",
      options: [
        "Uniform Resource Locator",
        "Universal Resource Link",
        "Uniform Resource Link",
        "Universal Resource Locator"
      ],
      answer: "Uniform Resource Locator"
    },
    {
      question: "Which of these is a JavaScript framework?",
      options: ["React", "Laravel", "Django", "Flask"],
      answer: "React"
    }
  ];

  // AI Quiz Data
  const aiQuizData = [
    {
      question: "What does AI stand for?",
      options: [
        "Artificial Intelligence",
        "Automated Intelligence",
        "Advanced Intelligence",
        "Active Intelligence"
      ],
      answer: "Artificial Intelligence"
    },
    {
      question: "Which language is most commonly used in AI development?",
      options: ["Python", "Java", "C++", "Ruby"],
      answer: "Python"
    },
    {
      question: "What is Machine Learning?",
      options: [
        "A subset of AI that allows systems to learn from data",
        "A programming language",
        "A type of computer hardware",
        "A web development technique"
      ],
      answer: "A subset of AI that allows systems to learn from data"
    },
    {
      question: "What does NLP stand for?",
      options: [
        "Natural Language Processing",
        "Neural Language Processing",
        "New Language Processing",
        "None"
      ],
      answer: "Natural Language Processing"
    },
    {
      question: "Which popular framework is used for deep learning?",
      options: ["TensorFlow", "Bootstrap", "React", "Angular"],
      answer: "TensorFlow"
    },
    {
      question: "What is a neural network?",
      options: [
        "A computer model inspired by the human brain",
        "A social network",
        "A type of computer virus",
        "A network of servers"
      ],
      answer: "A computer model inspired by the human brain"
    },
    {
      question: "Which company developed Watson AI?",
      options: ["IBM", "Google", "Microsoft", "Apple"],
      answer: "IBM"
    },
    {
      question: "What is reinforcement learning?",
      options: [
        "Learning by trial and error",
        "Learning by memorization",
        "Learning by watching videos",
        "Learning by reading"
      ],
      answer: "Learning by trial and error"
    },
    {
      question: "Which hardware component accelerates AI computations?",
      options: ["GPU", "CPU", "RAM", "SSD"],
      answer: "GPU"
    },
    {
      question: "What is one common application of AI?",
      options: ["Chatbots", "Word processing", "Spreadsheet calculations", "Email services"],
      answer: "Chatbots"
    }
  ];

  // Data Science Quiz Data
  const dataScienceQuizData = [
    {
      question: "What is a common language for data analysis?",
      options: ["Python", "HTML", "CSS", "JavaScript"],
      answer: "Python"
    },
    {
      question: "What does CSV stand for?",
      options: [
        "Comma Separated Values",
        "Comma Separated Variables",
        "Character Separated Values",
        "Computer Separated Values"
      ],
      answer: "Comma Separated Values"
    },
    {
      question: "Which Python library is used for data manipulation?",
      options: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
      answer: "Pandas"
    },
    {
      question: "Which library is popular for numerical computations in Python?",
      options: ["NumPy", "Pandas", "TensorFlow", "Keras"],
      answer: "NumPy"
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Sequential Query Language",
        "Standard Query Language"
      ],
      answer: "Structured Query Language"
    },
    {
      question: "Which library is used for data visualization in Python?",
      options: ["Matplotlib", "React", "Angular", "Vue"],
      answer: "Matplotlib"
    },
    {
      question: "What is data cleaning?",
      options: [
        "The process of fixing or removing incorrect data",
        "The process of creating new data",
        "The process of storing data",
        "The process of visualizing data"
      ],
      answer: "The process of fixing or removing incorrect data"
    },
    {
      question: "Which tool is used for big data processing?",
      options: ["Apache Hadoop", "Adobe Photoshop", "Microsoft Word", "Git"],
      answer: "Apache Hadoop"
    },
    {
      question: "What does ETL stand for?",
      options: [
        "Extract, Transform, Load",
        "Extract, Translate, Load",
        "Extract, Transfer, Load",
        "Extract, Transform, Leverage"
      ],
      answer: "Extract, Transform, Load"
    },
    {
      question: "Which company is known for its data analytics services?",
      options: ["IBM", "Nike", "Coca-Cola", "McDonald's"],
      answer: "IBM"
    }
  ];

  // Cybersecurity Quiz Data
  const cybersecurityQuizData = [
    {
      question: "What does VPN stand for?",
      options: [
        "Virtual Private Network",
        "Variable Public Network",
        "Virtual Public Network",
        "Verified Private Network"
      ],
      answer: "Virtual Private Network"
    },
    {
      question: "Which of the following is a form of malware?",
      options: ["Virus", "Antivirus", "Firewall", "Router"],
      answer: "Virus"
    },
    {
      question: "What is phishing?",
      options: [
        "A scam to steal personal information",
        "A type of programming",
        "A network protocol",
        "A computer hardware component"
      ],
      answer: "A scam to steal personal information"
    },
    {
      question: "What does SSL stand for?",
      options: [
        "Secure Sockets Layer",
        "Safe System Layer",
        "Secure System Login",
        "Secure Socket Login"
      ],
      answer: "Secure Sockets Layer"
    },
    {
      question: "Which tool is commonly used to protect a computer from viruses?",
      options: ["Antivirus software", "Word processor", "Spreadsheet", "Presentation software"],
      answer: "Antivirus software"
    },
    {
      question: "What is a firewall?",
      options: [
        "A security system that monitors network traffic",
        "A type of virus",
        "A computer program for editing photos",
        "A data backup system"
      ],
      answer: "A security system that monitors network traffic"
    },
    {
      question: "What is encryption?",
      options: [
        "The process of converting information into code",
        "The process of deleting information",
        "The process of copying data",
        "The process of compressing data"
      ],
      answer: "The process of converting information into code"
    },
    {
      question: "What is the goal of cybersecurity?",
      options: [
        "Protecting computer systems and networks",
        "Designing websites",
        "Developing software",
        "Improving internet speed"
      ],
      answer: "Protecting computer systems and networks"
    },
    {
      question: "What is two-factor authentication?",
      options: [
        "A security process requiring two forms of verification",
        "A programming method",
        "A type of encryption",
        "A network protocol"
      ],
      answer: "A security process requiring two forms of verification"
    },
    {
      question: "Which of the following is a common cybersecurity threat?",
      options: ["Ransomware", "Bluetooth", "Wi-Fi", "USB"],
      answer: "Ransomware"
    }
  ];

  // Sports Quiz Data
  const sportsQuizData = [
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["France", "Brazil", "Germany", "Argentina"],
      answer: "France"
    },
    {
      question: "How many players are on a soccer team on the field?",
      options: ["9", "10", "11", "12"],
      answer: "11"
    },
    {
      question: "In which sport is the term 'home run' used?",
      options: ["Baseball", "Basketball", "Soccer", "Tennis"],
      answer: "Baseball"
    },
    {
      question: "Who is known as 'King James' in basketball?",
      options: ["LeBron James", "Michael Jordan", "Kobe Bryant", "Magic Johnson"],
      answer: "LeBron James"
    },
    {
      question: "In which sport is a shuttlecock used?",
      options: ["Badminton", "Cricket", "Hockey", "Rugby"],
      answer: "Badminton"
    },
    {
      question: "How many points is a touchdown worth in American football?",
      options: ["3", "6", "7", "8"],
      answer: "6"
    },
    {
      question: "Which sport uses a bow and arrow?",
      options: ["Archery", "Fencing", "Skiing", "Cycling"],
      answer: "Archery"
    },
    {
      question: "In tennis, what is a score of 0 called?",
      options: ["Love", "Zero", "Nil", "Naught"],
      answer: "Love"
    },
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      options: ["Brazil", "China", "UK", "Russia"],
      answer: "Brazil"
    },
    {
      question: "What sport is known as 'the sport of kings'?",
      options: ["Horse racing", "Golf", "Cricket", "Soccer"],
      answer: "Horse racing"
    }
  ];

  // Maths Quiz Data
  const mathsQuizData = [
    {
      question: "What is 5 + 7?",
      options: ["10", "11", "12", "13"],
      answer: "12"
    },
    {
      question: "What is 15 - 8?",
      options: ["6", "7", "8", "9"],
      answer: "7"
    },
    {
      question: "What is 3 x 4?",
      options: ["12", "9", "14", "10"],
      answer: "12"
    },
    {
      question: "What is 16 ÷ 4?",
      options: ["2", "3", "4", "5"],
      answer: "4"
    },
    {
      question: "What is the square of 5?",
      options: ["20", "25", "30", "35"],
      answer: "25"
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      answer: "8"
    },
    {
      question: "What is 10% of 200?",
      options: ["10", "20", "30", "40"],
      answer: "20"
    },
    {
      question: "What is the approximate value of π (pi)?",
      options: ["2.14", "3.14", "4.14", "5.14"],
      answer: "3.14"
    },
    {
      question: "What is 9 + 6?",
      options: ["13", "14", "15", "16"],
      answer: "15"
    },
    {
      question: "What is the result of 7 x 8?",
      options: ["54", "56", "58", "60"],
      answer: "56"
    }
  ];

  // Science Quiz Data
  const scienceQuizData = [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
      answer: "Carbon Dioxide"
    },
    {
      question: "What is the center of an atom called?",
      options: ["Electron", "Proton", "Neutron", "Nucleus"],
      answer: "Nucleus"
    },
    {
      question: "What force pulls objects toward the Earth?",
      options: ["Magnetism", "Gravity", "Friction", "Inertia"],
      answer: "Gravity"
    },
    {
      question: "Which organ pumps blood throughout the body?",
      options: ["Lungs", "Brain", "Heart", "Kidneys"],
      answer: "Heart"
    },
    {
      question: "What is H2O commonly known as?",
      options: ["Salt", "Water", "Hydrogen Peroxide", "Oxygen"],
      answer: "Water"
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
      answer: "Nitrogen"
    },
    {
      question: "What is the boiling point of water at sea level (°C)?",
      options: ["90°C", "100°C", "110°C", "120°C"],
      answer: "100°C"
    },
    {
      question: "What do you call the change from solid to liquid?",
      options: ["Evaporation", "Melting", "Condensation", "Sublimation"],
      answer: "Melting"
    },
    {
      question: "What type of energy is stored in food?",
      options: ["Kinetic", "Potential", "Chemical", "Thermal"],
      answer: "Chemical"
    }
  ];

  // Literature Quiz Data
  const literatureQuizData = [
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "Mark Twain",
        "Jane Austen"
      ],
      answer: "William Shakespeare"
    },
    {
      question: "Who is the author of '1984'?",
      options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.K. Rowling"],
      answer: "George Orwell"
    },
    {
      question: "Which novel begins with 'Call me Ishmael'?",
      options: [
        "Moby Dick",
        "Great Expectations",
        "To Kill a Mockingbird",
        "The Great Gatsby"
      ],
      answer: "Moby Dick"
    },
    {
      question: "Who wrote 'Pride and Prejudice'?",
      options: ["Jane Austen", "Emily Bronte", "Virginia Woolf", "Charlotte Bronte"],
      answer: "Jane Austen"
    },
    {
      question: "What is the first book of the Bible?",
      options: ["Genesis", "Exodus", "Leviticus", "Numbers"],
      answer: "Genesis"
    },
    {
      question: "Who wrote 'The Hobbit'?",
      options: [
        "J.R.R. Tolkien",
        "C.S. Lewis",
        "J.K. Rowling",
        "George R.R. Martin"
      ],
      answer: "J.R.R. Tolkien"
    },
    {
      question: "Which poet wrote 'The Raven'?",
      options: [
        "Edgar Allan Poe",
        "Robert Frost",
        "William Wordsworth",
        "Emily Dickinson"
      ],
      answer: "Edgar Allan Poe"
    },
    {
      question: "Who is the author of 'The Catcher in the Rye'?",
      options: ["J.D. Salinger", "F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain"],
      answer: "J.D. Salinger"
    },
    {
      question: "Who wrote 'Crime and Punishment'?",
      options: [
        "Fyodor Dostoevsky",
        "Leo Tolstoy",
        "Anton Chekhov",
        "Ivan Turgenev"
      ],
      answer: "Fyodor Dostoevsky"
    },
    {
      question: "Who is known as the 'Father of English Literature'?",
      options: [
        "Geoffrey Chaucer",
        "William Shakespeare",
        "John Milton",
        "Edmund Spenser"
      ],
      answer: "Geoffrey Chaucer"
    }
  ];

  // --- Unified Quiz Data Object ---
  // For the general category, we now use: sports, science, maths, and literatures.
  // For the technical category, we use: webDevelopment, ai, dataScience, and cybersecurity.
  const allQuizData = {
    sports: sportsQuizData,
    science: scienceQuizData,
    maths: mathsQuizData,
    literatures: literatureQuizData,
    webDevelopment: webDevelopmentQuizData,
    ai: aiQuizData,
    dataScience: dataScienceQuizData,
    cybersecurity: cybersecurityQuizData
  };

  // --- Helper Function to Show a Specific Page ---
  function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
  }

  // --- Simple Shuffle Function ---
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // --- MAIN PAGE: Category Selection ---
  document.querySelectorAll("#mainPage .btn").forEach(button => {
    button.addEventListener("click", function () {
      selectedCategory = this.getAttribute("data-category"); // "general" or "technical"
      // Populate subcategory options based on selected category
      subCategoryButtonsDiv.innerHTML = "";
      if (selectedCategory === "general") {
        // For general, subcategories: sports, science, maths, literatures
        const subcats = [
          { key: "sports", label: "Sports" },
          { key: "science", label: "Science" },
          { key: "maths", label: "Maths" },
          { key: "literatures", label: "Literature" }
        ];
        subcats.forEach(sc => {
          const btn = document.createElement("button");
          btn.classList.add("btn");
          btn.innerText = sc.label;
          btn.setAttribute("data-subcategory", sc.key);
          subCategoryButtonsDiv.appendChild(btn);
          btn.addEventListener("click", () => {
            selectedSubcategory = sc.key;
            isRestart = false; // New selection: ordered questions
            startQuiz();
          });
        });
      } else if (selectedCategory === "technical") {
        // For technical, subcategories: webDevelopment, ai, dataScience, cybersecurity
        const subcats = [
          { key: "webDevelopment", label: "Web Development" },
          { key: "ai", label: "AI" },
          { key: "dataScience", label: "Data Science" },
          { key: "cybersecurity", label: "Cybersecurity" }
        ];
        subcats.forEach(sc => {
          const btn = document.createElement("button");
          btn.classList.add("btn");
          btn.innerText = sc.label;
          btn.setAttribute("data-subcategory", sc.key);
          subCategoryButtonsDiv.appendChild(btn);
          btn.addEventListener("click", () => {
            selectedSubcategory = sc.key;
            isRestart = false;
            startQuiz();
          });
        });
      }
      showPage("subCategoryPage");
    });
  });

  // --- Subcategory Page: Back Arrow Event Listener ---
  if (backArrow) {
    backArrow.addEventListener("click", () => {
      showPage("mainPage");
    });
  }

  // --- START QUIZ: Initialize Variables, Get Questions, and Set Order/Shuffle ---
  function startQuiz() {
    // Use the appropriate quiz data based on selected subcategory
    if (!isRestart) {
      // On first attempt: use ordered questions
      questions = allQuizData[selectedSubcategory].slice(0, 10);
    } else {
      // On restart: shuffle questions
      questions = shuffle(allQuizData[selectedSubcategory].slice(0, 10));
    }
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(10).fill(null);
    loadQuestion();
    showPage("quizPage");
  }

  // --- LOAD QUESTION: Display the Current Question and Its Options ---
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    // Display question number along with the question text
    questionTextEl.innerText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsListEl.innerHTML = "";
    currentQuestion.options.forEach(option => {
      const li = document.createElement("li");
      li.innerText = option;
      // Highlight if already selected
      if (userAnswers[currentQuestionIndex] === option) {
        li.classList.add("selected");
      }
      li.addEventListener("click", () => {
        userAnswers[currentQuestionIndex] = option;
        // Remove selection from all options and mark the clicked one
        Array.from(optionsListEl.children).forEach(child => child.classList.remove("selected"));
        li.classList.add("selected");
      });
      optionsListEl.appendChild(li);
    });
    // Update progress bar (0% for first question, 100% for last question)
    const progressPercent = (currentQuestionIndex / (questions.length - 1)) * 100;
    progressBar.style.width = progressPercent + "%";
    // Disable Previous button on the first question
    prevBtn.disabled = currentQuestionIndex === 0;
    // Change Next button text to "Submit" on the final question
    nextBtn.innerText = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
  }

  // --- Navigation Buttons ---
  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    // Ensure an answer is selected before proceeding
    if (!userAnswers[currentQuestionIndex]) {
      alert("Please select an answer before proceeding.");
      return;
    }
    // If not the last question, move forward
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      // On the last question, submit the quiz
      calculateScore();
      showPage("resultPage");
    }
  });

  // --- Calculate Score ---
  // --- Calculate Score ---
function calculateScore() {
  score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });
  scoreDisplay.innerText = score;
  
  // Determine feedback message based on score
  let feedbackMsg = "";
  if (score === 10) {
    feedbackMsg = "🎉 Congratulations, you got the high score! 🎉";
  } else if (score > 7) {
    feedbackMsg = "👍 Well done!";
  } else if (score >= 5) {
    feedbackMsg = "👌 Nice try!";
  } else {
    feedbackMsg = "😕 Please try again!";
  }
  
  // Display the feedback message
  const feedbackElement = document.getElementById("feedbackMsg");
  if (feedbackElement) {
    feedbackElement.innerText = feedbackMsg;
  }
}


  // --- Result Page Buttons ---
  restartBtn.addEventListener("click", () => {
    isRestart = true; // Set flag to shuffle questions on restart
    startQuiz();
  });

  leaveBtn.addEventListener("click", () => {
    showPage("mainPage");
  });

  checkAnswersBtn.addEventListener("click", () => {
    reviewContainer.innerHTML = "";
    questions.forEach((q, index) => {
      const div = document.createElement("div");
      div.classList.add("review-item");
      const userAns = userAnswers[index] || "No Answer";
      div.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}<br>
        <strong>Your Answer:</strong> ${userAns} ${
          userAns === q.answer
            ? '<span class="correct-answer">(Correct)</span>'
            : '<span class="incorrect-answer">(Incorrect)</span>'
        }<br>
        <strong>Correct Answer:</strong> ${q.answer}`;
      reviewContainer.appendChild(div);
    });
    showPage("reviewPage");
  });

  // Back from review page to result page
  backToResultBtn.addEventListener("click", () => {
    showPage("resultPage");
  });
});
