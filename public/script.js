// Register
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.text();
        alert(result);
    });
}

// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.text();
        alert(result);

        if (result === "Login Successful") {
            window.location.href = "quiz.html";
        }
    });
}
// Load Quiz
async function loadQuiz() {

    const response = await fetch("http://localhost:5000/api/quiz");
    const data = await response.json();

    const container = document.getElementById("quizContainer");

    if (!container) return;

    data.forEach((q) => {

        container.innerHTML += `
            <div>
                <h3>${q.question}</h3>

                <input type="radio" name="q${q.id}" value="${q.option1}"> ${q.option1}<br>

                <input type="radio" name="q${q.id}" value="${q.option2}"> ${q.option2}<br>

                <input type="radio" name="q${q.id}" value="${q.option3}"> ${q.option3}<br>

                <input type="radio" name="q${q.id}" value="${q.option4}"> ${q.option4}<br><br>
            </div>
        `;
    });

    window.quizData = data;
}

if(document.getElementById("quizContainer")){
    loadQuiz();
}
async function submitQuiz() {

    let score = 0;

    quizData.forEach((q) => {

        const answer = document.querySelector(`input[name="q${q.id}"]:checked`);

        if (answer && answer.value === q.answer) {
            score++;
        }

    });

    const email = prompt("Enter your email");

    await fetch("http://localhost:5000/api/result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            score
        })
    });

    alert("Your Score is " + score + "/" + quizData.length);
}