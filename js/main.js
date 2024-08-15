// ! --------------------- random question -----------------------
const questions = [
  "Как бы ты объяснил/а, что такое любовь, инопланетянину?",
  "Если бы ты был/а животным, то каким бы ты был/а на свадьбе?",
  "Какой танец ты бы исполнил/а, если бы был/а невидимым/ой на этой свадьбе?",
  "Если бы ты мог/могла сказать что-то еде на столе, что бы это было?",
  "Как ты представляешь себе свадебный тост от супергероя?",
  "Что бы ты сделал/а, если бы обнаружил/а, что на свадьбе вместо еды — игрушечные фрукты?",
  "Как ты думаешь, сколько танцевальных движений может создать робот на свадьбе?",
  "Если бы свадьба была музыкальным фильмом, какой бы ты исполнил/а номер?",
  "Как ты думаешь, о чём мечтает свадебный торт?",
  "Какой секрет ты бы рассказал/а тортоделу на этой свадьбе?",
  "Как бы выглядело идеальное свадебное платье для кота?",
  "Что бы ты сделал/а, если бы поймал/а букет, а он вдруг ожил?",
  "Как бы ты объяснил/а гостям, что это не обычная свадьба, а тайная операция?",
  "Что бы ты сказал/а, если бы тебя попросили прочитать клятву вместо молодоженов?",
  "Если бы ты мог/могла на один день стать кем-то другим, кем бы ты стал/а на этой свадьбе?",
  "Какой суперспособностью ты бы хотел/а обладать на свадьбе?",
  "Что бы ты посоветовал/а инопланетянину, который случайно попал на свадьбу?",
  "Как бы ты описал/а свадебный танец какому-то древнему философу?",
  "Что бы ты сказал/а, если бы обнаружил/а, что твой сосед по столу – знаменитость под прикрытием?",
  "Как бы выглядело твое идеальное свадебное фото с внезапным появлением динозавра?",
  "Что бы ты сделал/а, если бы все гости на свадьбе оказались персонажами из мультфильмов?",
  "Как бы ты изменил/а свадебный сценарий, если бы все было по твоему?",
  "Как бы ты выглядел/а, если бы тебе предложили быть свидетелем на свадьбе, но в костюме супергероя?",
  "Какую музыку ты бы выбрал/а для свадьбы, если бы все гости были вампирами?",
  "Какой предмет ты бы выбрал/а для танцев, если бы был/а учителем танцев на свадьбе?",
  "Что бы ты сказал/а своей бабушке, если бы она предложила тебе станцевать хип-хоп на свадьбе?",
  "Какую шутку ты бы рассказал/а, если бы был/а ведущим на свадьбе?",
  "Как бы ты описал/а свою свадьбу, если бы она проходила на Марсе?",
  "Что бы ты сказал/а, если бы на свадьбу пришел сам Гарри Поттер?",
  "Как бы ты поступил/а, если бы на свадьбе объявили танцевальный батл?",
];

window.addEventListener("DOMContentLoaded", (event) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];

  document.getElementById("question1").innerText = randomQuestion;
});

// ! ---------------- time out --------------------

const countdown = document.querySelector(".countdown");
const targetDate = new Date("2024-09-14T17:00:00");

function updateCountdown() {
  const now = new Date();
  const remainingTime = targetDate - now;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");
}

// Обновляем счетчик каждую секунду
setInterval(updateCountdown, 1000);

// ! -------------------------   ---------------------------

let form = document.querySelector("form");
let btnSubmit = document.querySelector("button[type='submit']");
let newGuest = document.querySelector("#check_guest");
let loader1 = document.querySelector(".loader1");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы
  btnSubmit.style.display = "none";
  loader1.style.display = "block";

  fetch(
    "https://script.google.com/macros/s/AKfycbysVFJuw0ArB1FdP1PWkA1JWwo47sy2h3ZxEiSJsRhm7rT91ZGwF1ofH7NdjemsCtns/exec",
    {
      method: "POST",
      body: new FormData(form),
    }
  )
    .then((response) => {
      response.text();
    })
    .then((text) => {
      console.log(text);
      loader1.style.display = "none";
      newGuest.style.display = "flex";
      newGuest.innerText = "Ваши данные успешно отправлены!";
    })
    .catch((error) => {
      console.error("Error:", error);
      loader1.style.display = "none";
      newGuest.style.display = "flex";
      newGuest.innerText =
        "Произошла ошибка! Перезагрузите страницу и попробуйте снова!";
    });
});

// !------------------------  -------------------------------

let recorder;
let stream;
let videoBlob;
let isRecording = false; // Флаг для проверки записи
let loader = document.querySelector(".loader");
let startVideo = document.getElementById("start-video");
let stopVideo = document.getElementById("stop-video");
let sendVideo = document.getElementById("send-video");
let checkVideoText = document.getElementById("check_video_text");

startVideo.addEventListener("click", async () => {
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
    checkVideoText.innerText =
      "Произошла ошибка, попробуйте зайти позже или отправьте ваш ответ, тому кто отправил пригласительное.";
  }
});

// ? ----------------- stop-video function -----------------------

stopVideo.addEventListener("click", async () => {
  if (!isRecording) {
    console.warn("No recording in progress to stop.");
    return; // Если запись не ведется, ничего не делаем
  }
  loader.style.display = "block";
  startVideo.style.display = "none";
  stopVideo.style.display = "none";
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
    loader.style.display = "none";
    sendVideo.style.display = "block";
  } catch (error) {
    console.error("Error stopping video recording:", error);
    loader.style.display = "none";
    checkVideoText.innerText =
      "Произошла ошибка, попробуйте зайти позже или отправьте ваш ответ, тому кто отправил пригласительное.";
  }
});

// ? ------------------- send-video function ---------------------

sendVideo.addEventListener("click", async () => {
  if (!videoBlob) {
    console.error("No video to send!");
    return;
  }
  loader.style.display = "block";
  sendVideo.style.display = "none";
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
      loader.style.display = "none";
      checkVideoText.innerText = "Ваше видео успешно отправлено!";
      // добавить текст
    } else {
      console.error("Error in response:", data);
      checkVideoText.innerText =
        "Произошла ошибка, попробуйте зайти позже или отправьте ваш ответ, тому кто отправил пригласительное.";
    }
  } catch (error) {
    console.error("Error sending video:", error);
    checkVideoText.innerText =
      "Произошла ошибка, попробуйте зайти позже или отправьте ваш ответ, тому кто отправил пригласительное.";
  }
});
