/* ================================================================
   FrontendCraft — Task 3
   script.js  |  Clean · Commented · Fully Functional

   SECTIONS:
   1.  Navbar — scroll behaviour + hamburger
   2.  Active nav link on scroll
   3.  Scroll reveal (IntersectionObserver)
   4.  Carousel — auto-slide, prev/next, dots, pause on hover
   5.  Quiz — questions, scoring, animated SVG ring
   6.  Weather — OpenWeatherMap API fetch
   7.  DOM ready

   WEATHER API SETUP
   -----------------
   1. Visit https://openweathermap.org/api and sign up (free).
   2. Generate an API key from "My API Keys".
   3. Paste it below replacing 'YOUR_OPENWEATHERMAP_API_KEY'.
   The free tier supports 60 calls / minute — more than enough.
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   WEATHER API KEY  ← Replace this with your key
   ---------------------------------------------------------------- */
const WEATHER_API_KEY = '3cf9a157c07e9d371e883f55a40cd1cb';
const WEATHER_BASE    = 'https://api.openweathermap.org/data/2.5/weather';


/* ================================================================
   1. NAVBAR
   ================================================================ */
(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  /* Darken navbar on scroll */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* Toggle mobile menu */
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  /* Close menu when a link is clicked */
  mobileMenu.querySelectorAll('.mobile-link').forEach(link =>
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    })
  );
})();


/* ================================================================
   2. ACTIVE NAV LINK ON SCROLL
   ================================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  function update() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 90) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ================================================================
   3. SCROLL REVEAL
   ================================================================ */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ================================================================
   4. CAROUSEL
   ================================================================ */
(function initCarousel() {
  const slides      = document.querySelectorAll('.slide');
  const dotsWrap    = document.getElementById('carouselDots');
  const prevBtn     = document.getElementById('prevSlide');
  const nextBtn     = document.getElementById('nextSlide');
  const pauseBtn    = document.getElementById('pauseBtn');
  const slideStatus = document.getElementById('slideStatus');
  const stage       = document.getElementById('carouselStage');

  const TOTAL      = slides.length;
  let   current    = 0;
  let   autoTimer  = null;
  let   isPlaying  = true;
  let   touchStartX = 0;

  if (!TOTAL) return;

  /* Build dot indicators */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'c-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsWrap.appendChild(dot);
  });

  /* Navigate to a specific slide */
  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + TOTAL) % TOTAL;
    slides[current].classList.add('active');

    document.querySelectorAll('.c-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    slideStatus.textContent = `${current + 1} / ${TOTAL}`;
  }

  /* Auto-play */
  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 4000); }
  function stopAuto()  { clearInterval(autoTimer); }
  function resetAuto() { if (isPlaying) { stopAuto(); startAuto(); } }

  /* Button controls */
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  /* Pause / Resume */
  pauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    isPlaying ? startAuto() : stopAuto();
    pauseBtn.textContent = isPlaying ? '⏸ Pause' : '▶ Resume';
  });

  /* Pause on hover */
  stage.addEventListener('mouseenter', stopAuto);
  stage.addEventListener('mouseleave', () => { if (isPlaying) startAuto(); });

  /* Touch / swipe */
  stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
  }, { passive: true });

  /* Keyboard navigation */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
  });

  /* Init */
  goTo(0);
  startAuto();
})();


/* ================================================================
   5. QUIZ — Subject selector, 10 questions each, 20s timer
   ================================================================ */
(function initQuiz() {

  const QUESTION_BANK = {
    java: [
      { q: 'Which keyword is used to create a subclass in Java?', opts: ['super','this','extends','implements'], ans: 2 },
      { q: 'What is the default value of an int variable in Java?', opts: ['null','1','undefined','0'], ans: 3 },
      { q: 'Which of the following is NOT a Java access modifier?', opts: ['public','protected','friend','private'], ans: 2 },
      { q: 'What does JVM stand for?', opts: ['Java Variable Machine','Java Virtual Machine','Java Verified Module','Java Value Manager'], ans: 1 },
      { q: 'Which collection class allows duplicate elements?', opts: ['HashSet','TreeSet','ArrayList','LinkedHashSet'], ans: 2 },
      { q: 'What is the size of int in Java (in bits)?', opts: ['16','32','64','8'], ans: 1 },
      { q: 'Which method is the entry point of a Java application?', opts: ['start()','init()','run()','main()'], ans: 3 },
      { q: 'What does the "final" keyword do when applied to a class?', opts: ['Makes it abstract','Prevents inheritance','Allows overriding','Makes it singleton'], ans: 1 },
      { q: 'Which Java package is imported by default?', opts: ['java.io','java.util','java.lang','java.net'], ans: 2 },
      { q: 'What is autoboxing in Java?', opts: ['Converting object to primitive','Converting primitive to its wrapper class','Garbage collection','Method overloading'], ans: 1 }
    ],
    python: [
      { q: 'Which symbol is used for single-line comments in Python?', opts: ['//','/*','#','--'], ans: 2 },
      { q: 'What data type is the result of 5 / 2 in Python 3?', opts: ['int','float','double','complex'], ans: 1 },
      { q: 'Which keyword defines an anonymous function in Python?', opts: ['def','func','lambda','anon'], ans: 2 },
      { q: 'What is the output of len("Hello")?', opts: ['4','5','6','Error'], ans: 1 },
      { q: 'Which of the following is an immutable data type?', opts: ['list','dict','set','tuple'], ans: 3 },
      { q: 'What does PEP 8 refer to?', opts: ['Python Extension Package 8','Python Enhancement Proposal 8','Python Execution Protocol 8','Python Error Prevention 8'], ans: 1 },
      { q: 'What keyword is used to handle exceptions in Python?', opts: ['catch','handle','except','error'], ans: 2 },
      { q: 'Which method removes and returns the last element of a list?', opts: ['remove()','delete()','pop()','discard()'], ans: 2 },
      { q: 'What is a Python decorator?', opts: ['A CSS-like styling tool','A function that modifies another function','A class method','A data structure'], ans: 1 },
      { q: 'Which module is used for regular expressions in Python?', opts: ['regex','re','regexp','rx'], ans: 1 }
    ],
    os: [
      { q: 'What is a deadlock in Operating Systems?', opts: ['A CPU crash','A situation where processes wait for each other indefinitely','An I/O error','Memory overflow'], ans: 1 },
      { q: 'Which scheduling algorithm gives priority to the shortest job?', opts: ['FCFS','Round Robin','SJF','Priority Scheduling'], ans: 2 },
      { q: 'What does PCB stand for in OS?', opts: ['Program Control Block','Process Control Block','Processor Cache Block','Primary Code Block'], ans: 1 },
      { q: 'Virtual memory is an extension of which component?', opts: ['CPU','Cache','ROM','RAM'], ans: 3 },
      { q: 'Which page replacement algorithm replaces the least recently used page?', opts: ['FIFO','LRU','Optimal','MRU'], ans: 1 },
      { q: 'What is thrashing in OS?', opts: ['High CPU utilization','Excessive paging causing low CPU utilization','Disk formatting','Cache overflow'], ans: 1 },
      { q: 'Which OS component manages file systems?', opts: ['Kernel','Shell','File Manager','Driver'], ans: 0 },
      { q: 'What is the main purpose of a semaphore?', opts: ['Memory management','Process synchronization','File I/O','CPU scheduling'], ans: 1 },
      { q: 'Which type of kernel runs most OS services in user space?', opts: ['Monolithic','Hybrid','Microkernel','Nano kernel'], ans: 2 },
      { q: 'Context switching occurs when?', opts: ['CPU switches from one process to another','Memory is full','Disk I/O completes','System boots'], ans: 0 }
    ],
    dbms: [
      { q: 'What does DBMS stand for?', opts: ['Data Block Management System','Database Management System','Data Bus Management System','Digital Base Management System'], ans: 1 },
      { q: 'Which SQL command is used to remove a table?', opts: ['DELETE','TRUNCATE','REMOVE','DROP'], ans: 3 },
      { q: 'What is a primary key?', opts: ['A key that can have NULL values','A key that uniquely identifies each row','A foreign key reference','A composite key'], ans: 1 },
      { q: 'Which normal form removes partial dependencies?', opts: ['1NF','2NF','3NF','BCNF'], ans: 1 },
      { q: 'What does ACID in databases stand for?', opts: ['Atomicity, Consistency, Isolation, Durability','Access, Control, Index, Data','Array, Cluster, Index, Domain','Attribute, Column, Instance, Dependency'], ans: 0 },
      { q: 'Which JOIN returns all rows from both tables, including unmatched ones?', opts: ['INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL OUTER JOIN'], ans: 3 },
      { q: 'What is a foreign key?', opts: ['A key that is always unique','A key that references a primary key in another table','A key with NULL values','An encrypted key'], ans: 1 },
      { q: 'Which command is used to retrieve data in SQL?', opts: ['FETCH','GET','SELECT','FIND'], ans: 2 },
      { q: 'What is an index in a database?', opts: ['A backup copy','A data structure to speed up queries','A type of join','A stored procedure'], ans: 1 },
      { q: 'Which SQL aggregate function returns the total count of rows?', opts: ['SUM()','TOTAL()','COUNT()','MAX()'], ans: 2 }
    ],
    ai: [
      { q: 'What does AI stand for?', opts: ['Automated Intelligence','Artificial Intelligence','Advanced Integration','Automated Interaction'], ans: 1 },
      { q: 'Which algorithm is used for finding shortest path in a graph?', opts: ['DFS','BFS','A* Algorithm','Hill Climbing'], ans: 2 },
      { q: 'What is a neural network inspired by?', opts: ['Computer chips','Human brain','DNA structure','Solar system'], ans: 1 },
      { q: 'What is overfitting in machine learning?', opts: ['Model performs well on training but poor on new data','Model underfits the data','Model has too few parameters','Model is too simple'], ans: 0 },
      { q: 'Which type of learning uses labelled data?', opts: ['Unsupervised learning','Reinforcement learning','Supervised learning','Self-supervised learning'], ans: 2 },
      { q: 'What is the Turing Test designed to evaluate?', opts: ['Processing speed','Machine intelligence vs human intelligence','Memory capacity','Algorithm efficiency'], ans: 1 },
      { q: 'Which activation function is commonly used in output layers for binary classification?', opts: ['ReLU','Sigmoid','Tanh','Softmax'], ans: 1 },
      { q: 'What does CNN stand for in deep learning?', opts: ['Computed Neural Node','Convolutional Neural Network','Connected Node Network','Central Neural Network'], ans: 1 },
      { q: 'What is the purpose of backpropagation?', opts: ['Forward data flow','Computing gradients to update weights','Normalizing inputs','Generating predictions'], ans: 1 },
      { q: 'Which search is complete and optimal for unit-cost problems?', opts: ['DFS','Hill Climbing','BFS','Greedy Search'], ans: 2 }
    ],
    webdev: [
      { q: 'Which HTML tag defines the largest heading?', opts: ['<h6>','<h3>','<h1>','<heading>'], ans: 2 },
      { q: 'What does CSS stand for?', opts: ['Creative Style Sheets','Cascading Style Sheets','Computer Style System','Colorful Style Sheets'], ans: 1 },
      { q: 'Which property makes a flex container wrap items?', opts: ['flex-wrap: nowrap','flex-flow: row','flex-wrap: wrap','flex-direction: wrap'], ans: 2 },
      { q: 'Which HTTP method is used to send data to a server?', opts: ['GET','DELETE','HEAD','POST'], ans: 3 },
      { q: 'What does DOM stand for?', opts: ['Data Object Model','Document Object Model','Dynamic Order Model','Design Object Manager'], ans: 1 },
      { q: 'Which JavaScript method adds an event listener to an element?', opts: ['attachEvent()','addEvent()','addEventListener()','onEvent()'], ans: 2 },
      { q: 'What does async/await do in JavaScript?', opts: ['Creates animations','Handles synchronous code','Simplifies working with Promises','Manages CSS transitions'], ans: 2 },
      { q: 'Which CSS unit is relative to the root element font size?', opts: ['em','%','px','rem'], ans: 3 },
      { q: 'What is the correct way to comment in CSS?', opts: ['// comment','# comment','/* comment */','-- comment'], ans: 2 },
      { q: 'Which tag is used to link an external JavaScript file?', opts: ['<js>','<javascript>','<link>','<script>'], ans: 3 }
    ]
  };

  const SUBJECT_META = {
    java:   { name: 'Java',                    icon: '☕' },
    python: { name: 'Python',                  icon: '🐍' },
    os:     { name: 'Operating Systems',       icon: '🖥️' },
    dbms:   { name: 'DBMS',                    icon: '🗄️' },
    ai:     { name: 'Artificial Intelligence', icon: '🤖' },
    webdev: { name: 'Web Development',         icon: '🌐' }
  };

  const TOTAL_Q    = 10;
  const TIMER_SECS = 20;
  const CIRC       = 113.1;

  let currentSubject = null;
  let currentQ       = 0;
  let score          = 0;
  let answered       = false;
  let timerInterval  = null;
  let timeLeft       = TIMER_SECS;

  const subjectScreen  = document.getElementById('quizSubjectScreen');
  const activeScreen   = document.getElementById('quizActiveScreen');
  const quizSubjectTag = document.getElementById('quizSubjectTag');
  const timerNum       = document.getElementById('timerNum');
  const timerRingFill  = document.getElementById('timerRingFill');
  const progressFill   = document.getElementById('quizProgressFill');
  const counter        = document.getElementById('questionCounter');
  const liveScore      = document.getElementById('liveScore');
  const questionEl     = document.getElementById('quizQuestion');
  const optionsEl      = document.getElementById('quizOptions');
  const nextBtn        = document.getElementById('nextBtn');
  const quizBody       = document.getElementById('quizBody');
  const quizResult     = document.getElementById('quizResult');
  const resultIcon     = document.getElementById('resultIcon');
  const resultHeading  = document.getElementById('resultHeading');
  const resultText     = document.getElementById('resultText');
  const ringFill       = document.getElementById('ringFill');
  const ringLabel      = document.getElementById('ringLabel');
  const quizCard       = document.querySelector('.quiz-card');
  const replayBtn      = document.getElementById('replayBtn');
  const changeSubBtn   = document.getElementById('changeSubjectBtn');
  const exitBtn        = document.getElementById('quizExitBtn');

  document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', () => startQuiz(card.dataset.subject));
  });

  function startQuiz(subject) {
    currentSubject = subject; currentQ = 0; score = 0; answered = false;
    const meta = SUBJECT_META[subject];
    quizSubjectTag.textContent = meta.icon + ' ' + meta.name;
    subjectScreen.classList.add('hidden');
    activeScreen.classList.remove('hidden');
    quizBody.classList.remove('hidden');
    quizResult.classList.add('hidden');
    ringFill.style.strokeDashoffset = '264';
    renderQuestion();
  }

  function renderQuestion() {
    const q = QUESTION_BANK[currentSubject][currentQ];
    progressFill.style.width = ((currentQ / TOTAL_Q) * 100) + '%';
    counter.textContent   = 'Question ' + (currentQ + 1) + ' of ' + TOTAL_Q;
    liveScore.textContent = score;
    questionEl.textContent = q.q;
    optionsEl.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(i));
      optionsEl.appendChild(btn);
    });
    nextBtn.classList.add('hidden');
    answered = false;
    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIMER_SECS;
    updateTimerUI(timeLeft);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerUI(timeLeft);
      if (timeLeft <= 0) { clearInterval(timerInterval); handleTimeout(); }
    }, 1000);
  }

  function stopTimer() { clearInterval(timerInterval); }

  function updateTimerUI(t) {
    timerNum.textContent = t;
    timerRingFill.style.strokeDashoffset = CIRC - (t / TIMER_SECS) * CIRC;
    const warn = t <= 10 && t > 5;
    const dang = t <= 5;
    timerRingFill.classList.toggle('warning', warn);
    timerRingFill.classList.toggle('danger',  dang);
    timerNum.classList.toggle('warning', warn);
    timerNum.classList.toggle('danger',  dang);
  }

  function handleTimeout() {
    if (answered) return;
    answered = true;
    const q    = QUESTION_BANK[currentSubject][currentQ];
    const opts = optionsEl.querySelectorAll('.quiz-opt');
    opts.forEach(btn => (btn.disabled = true));
    opts[q.ans].classList.add('correct');
    quizCard.classList.add('timeout-flash');
    setTimeout(() => quizCard.classList.remove('timeout-flash'), 400);
    if (currentQ < TOTAL_Q - 1) { nextBtn.classList.remove('hidden'); }
    else { setTimeout(showResult, 900); }
  }

  function selectAnswer(index) {
    if (answered) return;
    answered = true;
    stopTimer();
    const q    = QUESTION_BANK[currentSubject][currentQ];
    const opts = optionsEl.querySelectorAll('.quiz-opt');
    opts.forEach(btn => (btn.disabled = true));
    opts[q.ans].classList.add('correct');
    if (index !== q.ans) opts[index].classList.add('wrong');
    else { score++; liveScore.textContent = score; }
    if (currentQ < TOTAL_Q - 1) { nextBtn.classList.remove('hidden'); }
    else { setTimeout(showResult, 900); }
  }

  nextBtn.addEventListener('click', () => { currentQ++; renderQuestion(); });

  function showResult() {
    stopTimer();
    progressFill.style.width = '100%';
    quizBody.classList.add('hidden');
    quizResult.classList.remove('hidden');
    const pct = (score / TOTAL_Q) * 100;
    let icon, heading, text;
    if      (pct === 100) { icon = '🏆'; heading = 'Perfect Score!';   text = 'Flawless! All ' + TOTAL_Q + '/' + TOTAL_Q + ' correct.'; }
    else if (pct >= 80)   { icon = '🎉'; heading = 'Excellent!';       text = score + '/' + TOTAL_Q + ' — outstanding performance!'; }
    else if (pct >= 60)   { icon = '😊'; heading = 'Good Job!';        text = score + '/' + TOTAL_Q + ' — keep practising!'; }
    else if (pct >= 40)   { icon = '📚'; heading = 'Keep Studying!';   text = score + '/' + TOTAL_Q + ' — review the topics and retry.'; }
    else                  { icon = '💪'; heading = "Don't Give Up!";   text = score + '/' + TOTAL_Q + ' — practice makes perfect!'; }
    resultIcon.textContent    = icon;
    resultHeading.textContent = heading;
    resultText.textContent    = text;
    ringLabel.textContent     = score + '/' + TOTAL_Q;
    const offset = 264 - (score / TOTAL_Q) * 264;
    setTimeout(() => { ringFill.style.strokeDashoffset = offset; }, 100);
  }

  replayBtn.addEventListener('click', () => startQuiz(currentSubject));
  changeSubBtn.addEventListener('click', goToSubjectScreen);
  exitBtn.addEventListener('click', goToSubjectScreen);

  function goToSubjectScreen() {
    stopTimer();
    activeScreen.classList.add('hidden');
    subjectScreen.classList.remove('hidden');
  }

})();


/* ================================================================
   6. WEATHER API
   ================================================================ */
(function initWeather() {

  /* DOM refs */
  const cityInput          = document.getElementById('cityInput');
  const getWeatherBtn      = document.getElementById('getWeatherBtn');
  const weatherPlaceholder = document.getElementById('weatherPlaceholder');
  const weatherLoader      = document.getElementById('weatherLoader');
  const weatherError       = document.getElementById('weatherError');
  const errorMsg           = document.getElementById('errorMsg');
  const weatherCard        = document.getElementById('weatherCard');

  const wcCity       = document.getElementById('wcCity');
  const wcCountry    = document.getElementById('wcCountry');
  const wcIcon       = document.getElementById('wcIcon');
  const wcCondition  = document.getElementById('wcCondition');
  const wcTemp       = document.getElementById('wcTemp');
  const wcFeels      = document.getElementById('wcFeels');
  const wcHumidity   = document.getElementById('wcHumidity');
  const wcWind       = document.getElementById('wcWind');
  const wcVisibility = document.getElementById('wcVisibility');
  const wcPressure   = document.getElementById('wcPressure');
  const wcUpdated    = document.getElementById('wcUpdated');

  /* Show one state, hide the rest */
  function showState(state) {
    [weatherPlaceholder, weatherLoader, weatherError, weatherCard].forEach(el =>
      el.classList.add('hidden')
    );
    const map = {
      placeholder: weatherPlaceholder,
      loading:     weatherLoader,
      error:       weatherError,
      card:        weatherCard
    };
    if (map[state]) map[state].classList.remove('hidden');
  }

  /* Fetch weather data */
  async function fetchWeather(city) {
    if (!city.trim()) return;

    /* No API key check */
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
      showState('error');
      errorMsg.textContent = 'No API key set. Add your OpenWeatherMap key in script.js (line 12).';
      return;
    }

    showState('loading');

    const url = `${WEATHER_BASE}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;

    try {
      const res  = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        showState('error');
        errorMsg.textContent = data.message
          ? `Error: ${data.message}`
          : 'City not found. Please check the spelling.';
        return;
      }

      renderCard(data);

    } catch (err) {
      showState('error');
      errorMsg.textContent = 'Network error. Check your internet connection.';
      console.error('Weather fetch error:', err);
    }
  }

  /* Render weather card */
  function renderCard(data) {
    const { name, sys, weather, main, wind, visibility } = data;

    wcCity.textContent      = name;
    wcCountry.textContent   = `${sys.country}`;
    wcCondition.textContent = weather[0].description;
    wcTemp.textContent      = Math.round(main.temp);
    wcFeels.textContent     = Math.round(main.feels_like);
    wcHumidity.textContent  = `${main.humidity}%`;
    wcWind.textContent      = `${(wind.speed * 3.6).toFixed(1)} km/h`;
    wcVisibility.textContent = visibility ? `${(visibility / 1000).toFixed(1)} km` : 'N/A';
    wcPressure.textContent  = `${main.pressure} hPa`;

    /* Weather icon */
    wcIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    wcIcon.alt = weather[0].description;

    /* Timestamp */
    wcUpdated.textContent = `Updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    showState('card');
  }

  /* Event: button click */
  getWeatherBtn.addEventListener('click', () => fetchWeather(cityInput.value));

  /* Event: Enter key */
  cityInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') fetchWeather(cityInput.value);
  });

  /* Event: quick-city buttons */
  document.querySelectorAll('.qc-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      cityInput.value = btn.dataset.city;
      fetchWeather(btn.dataset.city);
    })
  );
})();


/* ================================================================
   7. DOM READY
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  /* Smooth page fade-in */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .35s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });

  console.log('%c ✓ FrontendCraft Task 3 loaded ', 'background:#6c63ff;color:#fff;padding:4px 12px;border-radius:6px;font-weight:700;');
});