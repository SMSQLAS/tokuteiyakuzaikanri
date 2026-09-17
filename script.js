const QUIZ_NAME = "特定薬剤管理指導加算クイズ";

// 元のクイズサイトで使っていた送信先をそのまま引き継いでいます。
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxCGQdVIRdGYjocIAdfrMA_gUYtxovXCQBj4IDBKXuUZTP7BKx5z0YVRRHIheUsRTI/exec";

const answerChoices = [
  { value: "1イ", label: "1（イ） ：10点" },
  { value: "1ロ", label: "1（ロ） ：5点" },
  { value: "2", label: "2 ：100点" },
  { value: "3イ", label: "3（イ） ：5点" },
  { value: "3ロ", label: "3（ロ） ：10点" },
  { value: "1イ3ロ", label: "1（イ）＋3（ロ）" },
  { value: "1ロ3ロ", label: "1（ロ）＋3（ロ）" },
  { value: "3イロ", label: "3（イ）＋3（ロ）" },
  { value: "×", label: "算定できない" }
];

const questions = [
  {
    text: `<strong>問題1</strong><p>アマリール1mgからアマリール3mgに変更になった。</p><p>どの特定薬剤管理指導加算が算定できる？</p>`,
    answer: "1ロ",
    explanation: "1（ロ）を算定できます。用量の変更に基づき必要な指導を行った場合に該当します。"
  },
  {
    text: `<strong>問題2</strong><p>流通不安定によるメーカー変更。</p><div class="change-box">アムロジピン5mg「サワイ」<br><span>↓</span><br>アムロジピン5mg「トーワ」</div><p>どの特定薬剤管理指導加算が算定できる？</p>`,
    answer: "3ロ",
    explanation: "3（ロ）を算定できます。医薬品の選択（メーカー変更）に係わる情報が特に必要な場合に該当します。"
  },
  {
    text: `<strong>問題3</strong><p>RMP策定の薬が処方されたが、患者向けの資材のない薬が出た場合。</p><p>特定薬剤管理指導加算は算定できる？</p>`,
    answer: "×",
    explanation: "算定できません。原稿では、RMP策定薬であっても患者向け資材がない場合は算定不可とされています。"
  },
  {
    text: `<strong>問題4</strong><p>令和8年5月に選定療養の対象となる薬品を処方され、6月にも同じ処方が出て選定療養費が上がる場合。</p><p>金額が上がることを患者に説明した。</p><p>どの特定薬剤管理指導加算が算定できる？</p>`,
    answer: "3ロ",
    explanation: "3（ロ）を算定できます。選定療養に係わる情報について説明したケースです。"
  },
  {
    text: `<strong>問題5</strong><p>選定療養の対象となる薬品が処方されている患者に対して説明したのち、後発品を選択した場合。</p><p>どの特定薬剤管理指導加算が算定できる？</p>`,
    answer: "3ロ",
    explanation: "3（ロ）を算定できます。選定療養・医薬品の選択に係わる情報提供を行ったケースです。"
  },
  {
    text: `<strong>問題6</strong><p>選定療養の対象となる薬品が処方されていて、RMP資材を用いて患者に説明した場合。</p><p>どの特定薬剤管理指導加算が算定できる？</p>`,
    answer: "3イロ",
    explanation: "3（イ）と3（ロ）を同時に算定できます。原稿では、3（イ）と3（ロ）は同時算定可能とされています。"
  },
  {
    text: `<strong>問題7</strong><p>6歳の患者にゾフルーザが処方された場合。</p><p>どの特定薬剤管理指導加算が算定できる？</p>`,
    answer: "3イ",
    explanation: "3（イ）を算定できます。RMP資材を用いた説明に該当するケースです。"
  },
  {
    text: `<strong>問題8</strong><p>Ⅱ型糖尿病でジャデアンスが処方された時、RMP資材対象か。</p>`,
    answer: "×",
    explanation: "対象ではありません。RMP資材対象の病名が慢性心不全・慢性腎臓病です。"
  }
];

let current = 0;
let score = 0;
let answered = false;
const answerLog = [];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startButton");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextButton");
const questionText = document.getElementById("questionText");
const feedback = document.getElementById("feedback");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const scoreText = document.getElementById("scoreText");
const resultForm = document.getElementById("resultForm");
const sendButton = document.getElementById("sendButton");
const sendStatus = document.getElementById("sendStatus");
const formError = document.getElementById("formError");
const retryButton = document.getElementById("retryButton");

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => {
    item.classList.toggle("active", item === screen);
  });
  document.body.classList.toggle("quiz-mode", screen === quizScreen);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  current = 0;
  score = 0;
  answered = false;
  answerLog.length = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const question = questions[current];

  questionText.innerHTML = question.text;
  progressText.textContent = `問題${current + 1} / ${questions.length}`;
  scoreText.textContent = `正解 ${score}`;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;

  feedback.className = "feedback hidden";
  feedback.innerHTML = "";
  nextButton.classList.add("hidden");

  answerButtons.innerHTML = "";
  answerChoices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = choice.label;
    button.dataset.value = choice.value;
    button.addEventListener("click", () => answerQuestion(choice.value));
    answerButtons.appendChild(button);
  });
}

function answerQuestion(selectedAnswer) {
  if (answered) return;
  answered = true;

  const question = questions[current];
  const isCorrect = selectedAnswer === question.answer;
  if (isCorrect) score += 1;

  answerLog.push({
    number: current + 1,
    selected: selectedAnswer,
    correct: question.answer,
    isCorrect
  });

  document.querySelectorAll(".answer-button").forEach((button) => {
    button.disabled = true;
    if (button.dataset.value === question.answer) button.classList.add("correct-choice");
    if (button.dataset.value === selectedAnswer && !isCorrect) button.classList.add("wrong-choice");
  });

  scoreText.textContent = `正解 ${score}`;
  feedback.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedback.innerHTML = `
    <div class="feedback-title">${isCorrect ? "⭕ 正解！" : "❌ 不正解"}</div>
    <div>${question.explanation}</div>
  `;

  nextButton.textContent = current === questions.length - 1 ? "結果を見る" : "次の問題へ";
  nextButton.classList.remove("hidden");
}

function goNext() {
  if (!answered) return;
  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);
  document.getElementById("resultScore").textContent = `${score} / ${questions.length}点`;
  resultForm.reset();
  formError.classList.add("hidden");
  sendStatus.classList.add("hidden");
  sendStatus.textContent = "";
  sendButton.disabled = false;
  sendButton.textContent = "結果を送信する";
  retryButton.disabled = true;
}

function buildPayload() {
  const difficulty = document.querySelector('input[name="difficulty"]:checked')?.value || "";
  const wrongNumbers = answerLog.filter((item) => !item.isCorrect).map((item) => `問題${item.number}`);
  return {
    quizName: QUIZ_NAME,
    storeName: document.getElementById("storeName").value.trim(),
    userName: document.getElementById("userName").value.trim(),
    difficulty,
    score,
    total: questions.length,
    scoreDisplay: `${score}/${questions.length}`,
    wrongAnswers: wrongNumbers.length ? wrongNumbers.join("、") : "なし",
    answerDetail: answerLog.map((item) => `問題${item.number}:${item.selected}`).join("｜")
  };
}

async function submitResult(event) {
  event.preventDefault();
  const payload = buildPayload();

  if (!payload.storeName || !payload.userName || !payload.difficulty) {
    formError.textContent = "店舗名・名前・難易度をすべて入力してください。";
    formError.classList.remove("hidden");
    return;
  }

  formError.classList.add("hidden");

  if (!WEB_APP_URL) {
    sendStatus.innerHTML = "Apps ScriptのURLがまだ設定されていません。<br>script.js上部のWEB_APP_URLにURLを入れてください。";
    sendStatus.classList.remove("hidden");
    return;
  }

  sendButton.disabled = true;
  sendButton.textContent = "送信中…";
  retryButton.disabled = true;
  sendStatus.textContent = "送信中です…";
  sendStatus.classList.remove("hidden");

  try {
    const sendData = {
      timestamp: new Date().toISOString(),
      quizTitle: QUIZ_NAME,
      storeName: payload.storeName,
      name: payload.userName,
      difficulty: payload.difficulty,
      score: payload.scoreDisplay,
      answers: payload.wrongAnswers
    };

    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(sendData)
    });

    sendStatus.textContent = "✅ 結果を送信しました！";
    sendButton.textContent = "送信済み";
    retryButton.disabled = false;
  } catch (error) {
    console.error(error);
    sendStatus.textContent = "送信できませんでした。通信状況とApps ScriptのURLを確認してください。";
    sendButton.disabled = false;
    sendButton.textContent = "結果を送信する";
    retryButton.disabled = true;
  }
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", goNext);
resultForm.addEventListener("submit", submitResult);
retryButton.addEventListener("click", startQuiz);
