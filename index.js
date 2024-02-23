// const question = "Kamaria, will you be my Valentine?";
// const questionHolder = document.getElementById("question");

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function animateQuestion() {
//   for (let i = 0; i <= question.length; i++) {
//     questionHolder.innerText = question.slice(0, i);
//     await sleep(100);
//   }
// }

// animateQuestion();
class Line {
  constructor(angle) {
    this.angle = angle;
  }

  get radians() {
    return (this.angle * Math.PI) / 180;
  }

  get sin() {
    return Math.sin(this.radians);
  }

  get cos() {
    return Math.cos(this.radians);
  }
}

class Location {
  constructor(lat, long) {
    this.latitude = new Line(lat);
    this.longitude = new Line(long);
  }

  distance(other) {
    return (
      Math.acos(
        this.latitude.sin * other.latitude.sin +
          this.latitude.cos *
            other.latitude.cos *
            Math.cos(other.longitude.radians - this.longitude.radians)
      ) * 6371
    );
  }
}

let timer = document.getElementById("timer");
let reunion = new Date("February 26, 2024 21:45:00");
let distance = document.getElementById("distance");
let home = new Location(38.8726784, -77.0244608);
let mari;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    mari = new Location(position.coords.latitude, position.coords.longitude);
    let d = Math.floor(home.distance(mari) * 0.62137);
    distance.innerText =
      d == 0 ? "You are home" : `You are ${d}mi away from home`;
  });
}

setInterval(myTimer, 500);

function myTimer() {
  const now = new Date(Date.now());

  let seconds = Math.floor(Math.abs(reunion.getTime() - now.getTime()) / 1000);

  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds = seconds - days * 24 * 60 * 60;

  const hours = Math.floor(seconds / (60 * 60));
  seconds = seconds - hours * 60 * 60;

  const minutes = Math.floor(seconds / 60);

  seconds = seconds - minutes * 60;

  timer.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
