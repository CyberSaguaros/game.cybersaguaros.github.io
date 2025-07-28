const logs = [
  {
    entries: [
      "192.168.1.5 - GET /index.html",
      "192.168.1.12 - POST /login",
      "203.0.113.77 - GET /admin.php", // suspicious
      "192.168.1.5 - GET /assets/style.css"
    ],
    breachIndex: 2
  },
  {
    entries: [
      "172.16.0.3 - GET /dashboard",
      "198.51.100.24 - GET /config.bak", // suspicious
      "172.16.0.3 - GET /api/userdata",
      "172.16.0.3 - POST /upload"
    ],
    breachIndex: 1
  },
  {
    entries: [
      "10.0.0.1 - GET /home",
      "10.0.0.1 - GET /search",
      "10.0.0.1 - GET /robots.txt",
      "66.66.66.66 - POST /shell.php" // suspicious
    ],
    breachIndex: 3
  }
];

let currentLog = 0;

function loadLog() {
  const container = document.getElementById("log-container");
  container.innerHTML = "";

  logs[currentLog].entries.forEach((entry, index) => {
    const line = document.createElement("div");
    line.textContent = entry;
    line.classList.add("log-line");
    line.onclick = () => handleChoice(index, line);
    container.appendChild(line);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").style.display = "none";
}

function handleChoice(index, line) {
  const correctIndex = logs[currentLog].breachIndex;
  const allLines = document.querySelectorAll(".log-line");

  allLines.forEach(l => l.onclick = null); // disable further clicks

  if (index === correctIndex) {
    line.classList.add("correct");
    document.getElementById("feedback").textContent = "✅ Good catch! That was the breach.";
  } else {
    line.classList.add("incorrect");
    allLines[correctIndex].classList.add("correct");
    document.getElementById("feedback").textContent = "❌ Missed it! That was a safe log.";
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

function nextLog() {
  currentLog++;
  if (currentLog >= logs.length) {
    document.getElementById("log-container").innerHTML = "🎉 All logs analyzed. Great work, analyst!";
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").style.display = "none";
  } else {
    loadLog();
  }
}

window.onload = loadLog;
