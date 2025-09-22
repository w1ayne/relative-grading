function relativeGrading(scores, failingScore) {
    const scoresSorted = [...scores].sort((a, b) => b - a);
    const n = scores.length;
    let result = [];

    for (let s of scores) {
        let grade = "F";
        if (s >= failingScore) {
            const rank = scoresSorted.indexOf(s) + 1;
            const p = rank / n;
            if (p <= 0.1) grade = "A";
            else if (p <= 0.3) grade = "B+";
            else if (p <= 0.4) grade = "B";
            else if (p <= 0.5) grade = "C+";
            else if (p <= 0.6) grade = "C";
            else grade = "D";
        }
        result.push({ score: s, grade: grade });
    }
    return result;
}

function calculateGrades() {
    const scoresInput = document.getElementById("scores").value;
    const failingScore = parseInt(document.getElementById("failing_score").value);

    if (!scoresInput || isNaN(failingScore)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
        return;
    }

    const scores = scoresInput.split(" ").map(Number);
    const grades = relativeGrading(scores, failingScore);

    const resultList = document.getElementById("result");
    resultList.innerHTML = ""; // Clear previous results

    grades.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `คะแนน ${item.score} ได้เกรด ${item.grade}`;
        resultList.appendChild(li);
    });
}
