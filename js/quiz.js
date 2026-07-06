document.addEventListener("DOMContentLoaded", function () {
    var COUNTRIES = [
        { code: "ru", name: "Россия", capital: "Москва" },
        { code: "us", name: "США", capital: "Вашингтон" },
        { code: "fr", name: "Франция", capital: "Париж" },
        { code: "de", name: "Германия", capital: "Берлин" },
        { code: "it", name: "Италия", capital: "Рим" },
        { code: "es", name: "Испания", capital: "Мадрид" },
        { code: "gb", name: "Великобритания", capital: "Лондон" },
        { code: "jp", name: "Япония", capital: "Токио" },
        { code: "cn", name: "Китай", capital: "Пекин" },
        { code: "br", name: "Бразилия", capital: "Бразилиа" },
        { code: "ca", name: "Канада", capital: "Оттава" },
        { code: "au", name: "Австралия", capital: "Канберра" },
        { code: "in", name: "Индия", capital: "Нью-Дели" },
        { code: "eg", name: "Египет", capital: "Каир" },
        { code: "mx", name: "Мексика", capital: "Мехико" },
        { code: "za", name: "ЮАР", capital: "Претория" },
        { code: "gr", name: "Греция", capital: "Афины" },
        { code: "tr", name: "Турция", capital: "Анкара" },
        { code: "kr", name: "Южная Корея", capital: "Сеул" },
        { code: "se", name: "Швеция", capital: "Стокгольм" },
        { code: "no", name: "Норвегия", capital: "Осло" },
        { code: "pt", name: "Португалия", capital: "Лиссабон" },
        { code: "nl", name: "Нидерланды", capital: "Амстердам" },
        { code: "ch", name: "Швейцария", capital: "Берн" },
        { code: "pl", name: "Польша", capital: "Варшава" },
        { code: "at", name: "Австрия", capital: "Вена" },
        { code: "fi", name: "Финляндия", capital: "Хельсинки" },
        { code: "ar", name: "Аргентина", capital: "Буэнос-Айрес" },
        { code: "th", name: "Таиланд", capital: "Бангкок" },
        { code: "vn", name: "Вьетнам", capital: "Ханой" }
    ];
    var TOTAL_QUESTIONS = 10;
    var els = {
        modebar: document.getElementById("quizModebar"),
        start: document.getElementById("quizStart"),
        game: document.getElementById("quizGame"),
        result: document.getElementById("quizResult"),
        startBtn: document.getElementById("quizStartBtn"),
        progressFill: document.getElementById("quizProgressFill"),
        progressLabel: document.getElementById("quizProgressLabel"),
        scoreLabel: document.getElementById("quizScoreLabel"),
        flagBig: document.getElementById("quizFlagBig"),
        question: document.getElementById("quizQuestion"),
        options: document.getElementById("quizOptions"),
        resultEmoji: document.getElementById("quizResultEmoji"),
        resultScore: document.getElementById("quizResultScore"),
        resultText: document.getElementById("quizResultText"),
        resultStreak: document.getElementById("quizResultStreak"),
        restartBtn: document.getElementById("quizRestartBtn"),
        modeLabel: document.getElementById("quizModeLabel"),
        feedback: document.getElementById("quizFeedback")
    };

    var mode = "flags";
    var questions = [];
    var qIndex = 0;
    var score = 0;
    var streak = 0;
    var bestStreak = 0;
    var answered = false;

    if (els.modebar) {
        els.modebar.addEventListener("click", function (e) {
            var btn = e.target.closest(".filter-btn");
            if (!btn) return;
            els.modebar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            mode = btn.dataset.mode;
        });
    }

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function buildQuestions() {
        var pool = shuffle(COUNTRIES).slice(0, TOTAL_QUESTIONS);
        return pool.map(function (correct) {
            var wrongPool = shuffle(COUNTRIES.filter(function (c) { return c.code !== correct.code; })).slice(0, 3);
            var optionSource = mode === "flags" ? "name" : "capital";
            var options = shuffle([correct].concat(wrongPool)).map(function (c) { return c[optionSource]; });
            return { correct: correct, options: options };
        });
    }

    function startQuiz() {
        questions = buildQuestions();
        qIndex = 0;
        score = 0;
        streak = 0;
        bestStreak = 0;
        els.modeLabel.textContent = mode === "flags" ? "Флаг - страна" : "Страна - столица";
        els.start.classList.add("d-none");
        els.result.classList.add("d-none");
        els.game.classList.remove("d-none");
        renderQuestion();
    }

    function renderQuestion() {
        answered = false;
        els.feedback.style.opacity = 0;
        var q = questions[qIndex];
        els.progressFill.style.width = ((qIndex) / TOTAL_QUESTIONS * 100) + "%";
        els.progressLabel.textContent = "Вопрос " + (qIndex + 1) + " из " + TOTAL_QUESTIONS;
        els.scoreLabel.textContent = "Счёт: " + score;

        if (mode === "flags") {
            els.flagBig.innerHTML = '<span class="fi fi-' + q.correct.code + '" style="width:120px;height:90px;display:inline-block;border-radius:8px;box-shadow:var(--shadow);"></span>';
            els.question.textContent = "Какой стране принадлежит этот флаг?";
        } else {
            els.flagBig.innerHTML = '<span class="fi fi-' + q.correct.code + '" style="width:120px;height:90px;display:inline-block;border-radius:8px;box-shadow:var(--shadow);"></span>';
            els.question.textContent = "Какая столица у страны с этим флагом?";
        }

        els.options.innerHTML = "";
        q.options.forEach(function (opt) {
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "quiz-option";
            btn.textContent = opt;
            btn.addEventListener("click", function () { handleAnswer(btn, opt); });
            els.options.appendChild(btn);
        });
    }

    function handleAnswer(btn, opt) {
        if (answered) return;
        answered = true;
        var q = questions[qIndex];
        var correctValue = mode === "flags" ? q.correct.name : q.correct.capital;
        var isCorrect = opt === correctValue;

        Array.from(els.options.children).forEach(function (b) {
            b.disabled = true;
            if (b.textContent === correctValue) b.classList.add("correct");
        });
        if (!isCorrect) btn.classList.add("wrong");

        if (isCorrect) {
            score++;
            streak++;
            bestStreak = Math.max(bestStreak, streak);
        } else {
            streak = 0;
        }

        els.scoreLabel.textContent = "Счёт: " + score;
        els.feedback.textContent = "Это флаг страны " + q.correct.name + " (столица: " + q.correct.capital + ")";
        els.feedback.style.opacity = 1;

        setTimeout(function () {
            qIndex++;
            if (qIndex >= TOTAL_QUESTIONS) {
                showResult();
            } else {
                renderQuestion();
            }
        }, 1100);
    }

    function showResult() {
        els.progressFill.style.width = "100%";
        els.game.classList.add("d-none");
        els.result.classList.remove("d-none");

        var pct = Math.round((score / TOTAL_QUESTIONS) * 100);
        var emoji = "🌍", text = "Неплохое начало попробуйте ещё раз!";
        if (pct === 100) { emoji = "🏆"; text = "Идеальный результат! Вы настоящий знаток географии."; }
        else if (pct >= 80) { emoji = "🥇"; text = "Отличный результат, ещё чуть чуть до идеала!"; }
        else if (pct >= 50) { emoji = "🙂"; text = "Хороший результат, но есть куда расти."; }

        els.resultEmoji.textContent = emoji;
        els.resultScore.textContent = score + " / " + TOTAL_QUESTIONS;
        els.resultText.textContent = text;
        els.resultStreak.textContent = "🔥 Лучшая серия подряд: " + bestStreak;

        if (pct === 100 && typeof gcConfetti === "function") {
            gcConfetti();
        }

        var best = +(localStorage.getItem("gc-quiz-best-" + mode) || 0);
        if (score > best) {
            localStorage.setItem("gc-quiz-best-" + mode, score);
            gcToast("Новый личный рекорд: " + score + " из " + TOTAL_QUESTIONS + "!");
        }
    }

    els.startBtn.addEventListener("click", startQuiz);
    els.restartBtn.addEventListener("click", function () {
        els.result.classList.add("d-none");
        els.start.classList.remove("d-none");
    });
});
