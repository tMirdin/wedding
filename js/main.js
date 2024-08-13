function submitQuiz() {
  const question1 = document.getElementById("question1").value;
  const question2 = document.getElementById("question2").value;

  // Создаем CSV строку для сохранения данных в Excel
  const csvData = `"${question1}","${question2}"\n`;

  // Сохраняем данные в файл
  downloadCSV(csvData, "quiz-results.csv");
}

function downloadCSV(csv, filename) {
  const csvFile = new Blob([csv], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

// !-------------------------------------------------------
let recorder;
let stream;

document.getElementById("start-video").addEventListener("click", async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  document.getElementById("video").srcObject = stream;

  recorder = RecordRTC(stream, {
    type: "video",
    mimeType: "video/webm;codecs=vp8,opus", // По умолчанию webm
  });

  recorder.startRecording();
});

document.getElementById("stop-video").addEventListener("click", () => {
  recorder.stopRecording(() => {
    let blob = recorder.getBlob();
    document.getElementById("video").src = URL.createObjectURL(blob);

    // Отправка видео в Telegram
    document.getElementById("send-video").addEventListener("click", () => {
      sendVideo(blob);
    });
  });

  stream.getTracks().forEach((track) => track.stop());
});

function sendVideo(blob) {
  const formData = new FormData();
  formData.append("chat_id", "588935310");
  formData.append("video", blob, "video.webm");

  fetch(
    "https://api.telegram.org/bot7071335378:AAGAws-yHvjQy9m3bK-H915EGfZBTcpuuKE/sendVideo",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => console.log("Video sent successfully:", data))
    .catch((error) => console.error("Error sending video:", error));
}
