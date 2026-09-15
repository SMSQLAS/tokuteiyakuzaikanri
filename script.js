const QUIZ_NAME = "薬学的有害事象等防止加算クイズ";

// 既存クイズと同じ Apps Script のウェブアプリURL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxCGQdVIRdGYjocIAdfrMA_gUYtxovXCQBj41DBKXuUZTP7BKx5z0YVRRHIheU5RTI/exec";

const questions = [
  {
    text: `
      <strong>問題1</strong>
      <div class="case-box">
        在宅患者。処方箋を受け付けた後、お薬手帳から他院の同一成分薬との重複を発見した。<br>
        処方医へ照会し、今回処方の薬剤が削除された。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "イ ＋ 901",
      "ロ ＋ 901",
      "ハ ＋ 901",
      "ニ ＋ 901"
    ],
    answer: 1,
    explanation:
      "在宅患者でも、処方箋交付後の照会による変更は「ロ」です。内容の要点は、同種・同効の併用薬との重複投薬なので901です。"
  },
  {
    text: `
      <strong>問題2</strong>
      <div class="case-box">
        外来患者。かかりつけ薬剤師が、併用薬との併用禁忌を確認した。<br>
        処方医へ照会した結果、別薬へ変更された。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "ロ ＋ 902",
      "ハ ＋ 902",
      "ニ ＋ 902",
      "ハ ＋ 901"
    ],
    answer: 1,
    explanation:
      "在宅患者ではなく、かかりつけ薬剤師による照会で処方変更されたため「ハ」です。併用禁忌は相互作用に該当するため902です。"
  },
  {
    text: `
      <strong>問題3</strong>
      <div class="case-box">
        外来患者。かかりつけ薬剤師ではない薬剤師が、患者から「以前この薬で発疹が出た」と聞き取った。<br>
        薬歴でも副作用歴を確認し、処方医への照会後、別薬へ変更された。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "ハ ＋ 903",
      "ニ ＋ 903",
      "ニ ＋ 902",
      "ロ ＋ 903"
    ],
    answer: 1,
    explanation:
      "在宅患者でも、かかりつけ薬剤師による照会でもないため「ニ」です。過去のアレルギー歴・副作用歴に基づく変更なので903です。"
  },
  {
    text: `
      <strong>問題4</strong>
      <div class="case-box">
        在宅患者。次回の処方箋が交付される前に、腎機能低下を踏まえて薬剤師が処方医へ減量を提案した。<br>
        その提案が反映され、用量が減量された処方箋を後日受け付けた。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "イ ＋ 905 ＋ 1004",
      "ロ ＋ 905",
      "イ ＋ 904 ＋ 1004",
      "ハ ＋ 905"
    ],
    answer: 0,
    explanation:
      "在宅患者について処方箋交付前に処方内容を相談・提案し、その提案が反映されたため「イ」です。理由は肝・腎機能等による影響なので905、変更内容は用量変更なので1004です。"
  },
  {
    text: `
      <strong>問題5</strong>
      <div class="case-box">
        外来患者。かかりつけ薬剤師ではない薬剤師が、小児の体重からみて処方量が過量と判断した。<br>
        処方医へ照会し、用量が減量された。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "ハ ＋ 904",
      "ニ ＋ 904",
      "ニ ＋ 905",
      "ロ ＋ 904"
    ],
    answer: 1,
    explanation:
      "外来患者で、かかりつけ薬剤師による照会ではないため「ニ」です。判断根拠が年齢・体重による影響なので904です。"
  },
  {
    text: `
      <strong>問題6</strong>
      <div class="case-box">
        在宅患者。定期訪問時、次回処方箋が発行される前に、他院薬と同効薬が重複していることを把握した。<br>
        薬剤中止を提案し、その提案が反映された処方箋を後日受け付けた。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "イ ＋ 901 ＋ 1006",
      "ロ ＋ 901",
      "ハ ＋ 901",
      "ニ ＋ 901"
    ],
    answer: 0,
    explanation:
      "処方箋交付前の在宅患者への提案が反映されたため「イ」です。理由は重複投薬なので901。中止は1002～1005のいずれにも該当しないため、変更内容は1006「その他」と整理します。"
  },
  {
    text: `
      <strong>問題7</strong>
      <div class="case-box">
        在宅患者。処方箋交付前に、嚥下状態を踏まえて同一成分の別剤形への変更を提案した。<br>
        その提案が反映された処方箋を受け付けた。変更理由は901～906のいずれにも該当しないものとする。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "イ ＋ 907 ＋ 1003",
      "ロ ＋ 907",
      "イ ＋ 904 ＋ 1003",
      "ニ ＋ 907"
    ],
    answer: 0,
    explanation:
      "処方箋交付前の在宅患者への提案なので「イ」です。理由はその他の薬学的観点として907、変更内容は剤形の変更なので1003です。"
  },
  {
    text: `
      <strong>問題8</strong>
      <div class="case-box">
        在宅患者。処方箋を受け付けた後、妊娠中であることを確認した。<br>
        処方医へ照会し、処方薬が別薬へ変更された。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "イ ＋ 906",
      "ロ ＋ 906",
      "ハ ＋ 906",
      "ロ ＋ 903"
    ],
    answer: 1,
    explanation:
      "在宅患者ですが処方箋交付後の照会なので「ロ」です。妊婦への影響が理由なので906です。「イ」ではないため1002～1006の追加選択は行いません。"
  },
  {
    text: `
      <strong>問題9</strong>
      <div class="case-box">
        外来患者。かかりつけ薬剤師が、患者が日常的に摂取している飲食物と処方薬との相互作用を確認した。<br>
        処方医へ照会し、処方変更となった。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "ハ ＋ 902",
      "ハ ＋ 907",
      "ニ ＋ 902",
      "ロ ＋ 902"
    ],
    answer: 0,
    explanation:
      "イ・ロには該当せず、かかりつけ薬剤師による照会で処方変更されたため「ハ」です。飲食物との相互作用は902です。"
  },
  {
    text: `
      <strong>問題10</strong>
      <div class="case-box">
        在宅患者。処方箋交付前に、901～906には該当しない薬学的な用法上の問題を指摘し、処方医へ変更を提案した。<br>
        提案どおり用法が変更された処方箋を受け付けた。
      </div>
      最も適切な組み合わせは？
    `,
    choices: [
      "イ ＋ 907 ＋ 1005",
      "ロ ＋ 907",
      "イ ＋ 907 ＋ 1004",
      "ニ ＋ 907"
    ],
    answer: 0,
    explanation:
      "処方箋交付前の在宅患者への提案が反映されたため「イ」です。内容の要点は907、変更内容は用法の変更なので1005です。"
  }
];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

const resultScore = document.getElementById("resultScore");
const wrongAnswerText = document.getElementById("wrongAnswerText");
const resultForm = document.getElementById("resultForm");
const storeName = document.getElementById("storeName");
const userName = document.getElementById("userName");
const formError = document.getElementById("formError");
const sendButton = document.getElementById("sendButton");
const sendStatus = document.getElementById("sendStatus");
const retryButton = document.getElementById("retryButton");

let currentQuestionIndex = 0;
let correctCount = 0;
let wrongAnswers = [];
let answered = false;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => {
    item.classList.toggle("active", item === screen);
  });

  // 早見表はクイズ画面（2ページ目以降）だけ表示
  document.body.classList.toggle("quiz-mode", screen === quizScreen);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetQuizState() {
  currentQuestionIndex = 0;
  correctCount = 0;
  wrongAnswers = [];
  answered = false;

  feedback.className = "feedback hidden";
  feedback.innerHTML = "";
  nextButton.classList.add("hidden");
  retryButton.disabled = true;

  sendStatus.className = "send-status hidden";
  sendStatus.textContent = "";
  formError.className = "form-error hidden";
  formError.textContent = "";

  sendButton.disabled = false;
  sendButton.textContent = "結果を送信する";

  resultForm.reset();
}

function startQuiz() {
  resetQuizState();
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;

  const q = questions[currentQuestionIndex];

  progressText.textContent =
    `問題${currentQuestionIndex + 1} / ${questions.length}`;
  scoreText.textContent = `正解 ${correctCount}`;
  progressBar.style.width =
    `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  questionText.innerHTML = q.text;
  answerButtons.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = choice;
    button.addEventListener("click", () => answerQuestion(index));
    answerButtons.appendChild(button);
  });

  feedback.className = "feedback hidden";
  feedback.innerHTML = "";
  nextButton.classList.add("hidden");
}

function answerQuestion(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestionIndex];
  const buttons = [...answerButtons.querySelectorAll(".answer-button")];
  const isCorrect = selectedIndex === q.answer;

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.answer) {
      button.classList.add("correct-choice");
    }

    if (index === selectedIndex && !isCorrect) {
      button.classList.add("wrong-choice");
    }
  });

  if (isCorrect) {
    correctCount += 1;
    feedback.className = "feedback correct";
    feedback.innerHTML =
      `⭕ 正解！<span class="explanation">${q.explanation}</span>`;
  } else {
    wrongAnswers.push(currentQuestionIndex + 1);
    feedback.className = "feedback wrong";
    feedback.innerHTML =
      `❌ 不正解<br>正解：${q.choices[q.answer]}` +
      `<span class="explanation">${q.explanation}</span>`;
  }

  scoreText.textContent = `正解 ${correctCount}`;
  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "結果を見る"
      : "次の問題へ";

  nextButton.classList.remove("hidden");
}

function goNext() {
  if (!answered) return;

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  showResult();
}

function showResult() {
  resultScore.textContent =
    `${questions.length}問中 ${correctCount}問正解！`;

  wrongAnswerText.textContent =
    wrongAnswers.length === 0
      ? "全問正解です🎉"
      : `誤答番号：${wrongAnswers.join("、")}`;

  showScreen(resultScreen);
}

async function submitResult(event) {
  event.preventDefault();

  const difficultyInput =
    resultForm.querySelector('input[name="difficulty"]:checked');

  const payload = {
    storeName: storeName.value.trim(),
    userName: userName.value.trim(),
    difficulty: difficultyInput ? difficultyInput.value : "",
    scoreDisplay: `${correctCount}/${questions.length}`,
    wrongAnswers:
      wrongAnswers.length === 0 ? "なし" : wrongAnswers.join(",")
  };

  if (!payload.storeName || !payload.userName || !payload.difficulty) {
    formError.textContent =
      "店舗名・名前・難易度をすべて入力してください。";
    formError.classList.remove("hidden");
    return;
  }

  formError.classList.add("hidden");
  sendStatus.classList.remove("hidden");
  sendStatus.textContent = "送信中です…";
  sendButton.disabled = true;
  sendButton.textContent = "送信中…";

  const sendData = {
    quiz: QUIZ_NAME,
    store: payload.storeName,
    name: payload.userName,
    difficulty: payload.difficulty,
    score: payload.scoreDisplay,
    answers: payload.wrongAnswers
  };

  try {
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(sendData)
    });

    sendStatus.textContent = "✅ 結果を送信しました！";
    sendButton.textContent = "送信済み";
    retryButton.disabled = false;
  } catch (error) {
    console.error(error);
    sendStatus.textContent =
      "送信できませんでした。通信状況とApps ScriptのURLを確認してください。";
    sendButton.disabled = false;
    sendButton.textContent = "結果を送信する";
    retryButton.disabled = true;
  }
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", goNext);
resultForm.addEventListener("submit", submitResult);
retryButton.addEventListener("click", startQuiz);
