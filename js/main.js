let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  fetch(
    "https://script.google.com/macros/s/AKfycbysVFJuw0ArB1FdP1PWkA1JWwo47sy2h3ZxEiSJsRhm7rT91ZGwF1ofH7NdjemsCtns/exec",
    {
      method: "POST",
      body: new FormData(form),
    }
  )
    .then((response) => response.text())
    .then((text) => console.log(text))
    .catch((error) => console.error("Error:", error));
});

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
    videoBitsPerSecond: 500000, // Уменьшите битрейт видео
    audioBitsPerSecond: 64000, // Уменьшите битрейт аудио
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
