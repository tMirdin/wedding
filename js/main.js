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
let videoBlob;
let isRecording = false; // Флаг для проверки записи

document.getElementById("start-video").addEventListener("click", async () => {
  if (isRecording) {
    console.warn("Recording is already in progress!");
    return; // Предотвращаем повторное нажатие
  }
  try {
    // Остановите предыдущий поток, если он существует
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    // Получите новый поток
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    document.getElementById("video").srcObject = stream;

    // Убедитесь, что запись не началась дважды
    if (recorder && recorder.state === "recording") {
      console.warn("Recording is already in progress");
      return;
    }

    recorder = RecordRTC(stream, {
      type: "video",
      mimeType: "video/webm;codecs=vp8,opus", // Формат по умолчанию
      videoBitsPerSecond: 500000, // Уменьшите битрейт видео
      audioBitsPerSecond: 64000, // Уменьшите битрейт аудио
    });

    recorder.startRecording();
    isRecording = true; // Устанавливаем флаг записи
    console.log("Recording started");
  } catch (error) {
    console.error("Error starting video recording:", error);
  }
});

// ? ----------------- stop-video function -----------------------

document.getElementById("stop-video").addEventListener("click", async () => {
  if (!isRecording) {
    console.warn("No recording in progress to stop.");
    return; // Если запись не ведется, ничего не делаем
  }
  try {
    console.log("Stopping recording...");
    await new Promise((resolve) => {
      recorder.stopRecording(() => {
        videoBlob = recorder.getBlob();

        if (videoBlob) {
          const videoURL = URL.createObjectURL(videoBlob);
          document.getElementById("video").src = videoURL;
          console.log("Recording stopped and video available for playback");
        } else {
          console.error("No video blob found after stopping recording.");
        }

        resolve();
      });
    });

    // Очищаем stream, чтобы избежать утечек памяти
    stream.getTracks().forEach((track) => track.stop());
    isRecording = false; // Сбрасываем флаг записи
  } catch (error) {
    console.error("Error stopping video recording:", error);
  }
});

// ? ------------------- send-video function ---------------------

document.getElementById("send-video").addEventListener("click", async () => {
  if (!videoBlob) {
    console.error("No video to send!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("chat_id", "588935310");
    formData.append("video", videoBlob, "video.webm");

    const response = await fetch(
      "https://api.telegram.org/bot7071335378:AAGAws-yHvjQy9m3bK-H915EGfZBTcpuuKE/sendVideo",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.ok) {
      console.log("Video sent successfully:", data);
    } else {
      console.error("Error in response:", data);
    }
  } catch (error) {
    console.error("Error sending video:", error);
  }
});
