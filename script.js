function relativeGrading(scores, failingScore) {
    const scoresSorted = [...scores].sort((a, b) => b - a);
    const n = scores.length;
    let result = [];

    for (let s of scores) {
        let grade = "F";
        if (s >= failingScore) {
            const ranks = scoresSorted
                .map((val, idx) => val === s ? idx + 1 : null)
                .filter(v => v !== null);
            const rank = Math.min(...ranks);
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
    const scoresInput = document.getElementById("scores").value.trim();
    const failingScore = parseInt(document.getElementById("failing_score").value);

    if (!scoresInput || isNaN(failingScore)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
        return;
    }

    const scores = scoresInput
        .split(/\s+/)
        .map(s => parseInt(s))
        .filter(s => !isNaN(s));

    if (scores.length === 0) {
        alert("กรุณากรอกคะแนนให้ถูกต้อง!");
        return;
    }

    const grades = relativeGrading(scores, failingScore);

    const resultList = document.getElementById("result");
    resultList.innerHTML = "";

    grades.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `คะแนน ${item.score} ได้เกรด ${item.grade}`;
        resultList.appendChild(li);
    });
}
