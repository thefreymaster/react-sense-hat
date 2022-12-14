const express = require("express");
const app = express();
const path = require("path");
const imu = require("node-sense-hat").Imu;
const IMU = new imu.IMU();
const matrix = require("node-sense-hat").Leds;

matrix.clear();

const port = 6700;
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

const os = require("os");
const networkInterfaces = os.networkInterfaces();

app.use(express.json());
app.use(express.static(__dirname + "/build"));
app.use(express.static(__dirname + "/images"));

const server = require("http").Server(app);
const io = require("socket.io")(server);

const defaultDB = {
  history: {
    humidity: [],
    temperature: [],
    pressure: [],
  },
  system: {
    active: true,
  },
};

db.defaults(defaultDB).write();

const convertToF = (celsius) => {
  return celsius * (9 / 5) + 32;
};

const getPressure = (pressure) => {
  return pressure;
};

const getHumidity = (humidity) => {
  return humidity;
};
const run = () => {
  setTimeout(() => {
    IMU.getValue((err, data) => {
      if (err !== null) {
        console.error("Could not read sensor data: ", err);
        return;
      }
      console.log("Temp is: ", convertToF(data.temperature));
      console.log("Pressure is: ", getPressure(data.pressure));
      console.log("Humidity is: ", getHumidity(data.humidity));
      const now = new Date();
      db.get("history.temperature")
        .push({
          x: now,
          y: convertToF(data.temperature),
        })
        .write();
      db.get("history.humidity")
        .push({
          x: now,
          y: getHumidity(data.humidity),
        })
        .write();
      db.get("history.pressure")
        .push({
          x: now,
          y: getPressure(data.pressure),
        })
        .write();
      const temperature = db
        .get("history.temperature")
        .filter(
          (item) =>
            new Date().getTime() - new Date(item.x).getTime() < threedays
        )
        .value();
      const humidity = db
        .get("history.humidity")
        .filter(
          (item) =>
            new Date().getTime() - new Date(item.x).getTime() < threedays
        )
        .value();
      const pressure = db
        .get("history.pressure")
        .filter(
          (item) =>
            new Date().getTime() - new Date(item.x).getTime() < threedays
        )
        .value();
      io.emit("weather_update", {
        temperature,
        humidity,
        pressure,
      });
      io.emit("humidity", { humidity });
      io.emit("temperature", { temperature });
      io.emit("pressure", { pressure });
      run();
    });
  }, 300000);
};

const threedays = 60 * 60 * 24 * 1000 * 3;

app.get("/api/weather/history", (req, res) => {
  IMU.getValue((err, data) => {
    if (err !== null) {
      console.error("Could not read sensor data: ", err);
      return;
    }
    console.log("Temp is: ", convertToF(data.temperature));
    console.log("Pressure is: ", getPressure(data.pressure));
    console.log("Humidity is: ", getHumidity(data.humidity));
    db.get("history")
      .push({
        humidity: getHumidity(data.humidity),
        temperature: convertToF(data.temperature),
        pressure: getPressure(data.pressure),
        time: new Date(),
      })
      .write();
    // io.emit('weather_update', db.get('history').value())
    const temperature = db
      .get("history.temperature")
      .filter(
        (item) => new Date().getTime() - new Date(item.x).getTime() < threedays
      )
      .value();
    const humidity = db
      .get("history.humidity")
      .filter(
        (item) => new Date().getTime() - new Date(item.x).getTime() < threedays
      )
      .value();
    const pressure = db
      .get("history.pressure")
      .filter(
        (item) => new Date().getTime() - new Date(item.x).getTime() < threedays
      )
      .value();
    res.send({
      temperature,
      humidity,
      pressure,
    });
  });
});

app.get("/api/weather/current", (req, res) => {
  console.log({ route: "/api/weather/current" });
  IMU.getValue((err, data) => {
    if (err !== null) {
      console.error("Could not read sensor data: ", err);
      return;
    }
    console.log("Temp is: ", convertToF(data.temperature));
    console.log("Pressure is: ", getPressure(data.pressure));
    console.log("Humidity is: ", getHumidity(data.humidity));
    db.get("history")
      .push({
        humidity: getHumidity(data.humidity),
        temperature: convertToF(data.temperature),
        pressure: getPressure(data.pressure),
        time: new Date(),
      })
      .write();
    io.emit("weather_update", db.get("history").value());
    io.emit("humidity", { humidity: getHumidity(data.humidity) });
    io.emit("temperature", { temperature: convertToF(data.temperature) });
    io.emit("pressure", { pressure: getPressure(data.pressure) });

    res.send({
      humidity: getHumidity(data.humidity),
      temperature: convertToF(data.temperature),
      pressure: getPressure(data.pressure),
      time: new Date(),
    });
  });
});

app.get("/api/status", (req, res) => {
  console.log({ route: "/api/status" });
  res.send({
    active: true,
    version: "1.0.0",
    app: "Weather",
    uptime: `${process.uptime().toFixed(0)} seconds`,
    ip: networkInterfaces,
  });
});

app.get("/api", (req, res) => {
  res.send({
    status: {
      description: "Get the status of the server",
      route: "/api/status",
    },
    weather: {
      description: "Get the status of all zones",
      route: "/api/weather",
      history: {
        description: "Get historic weather data",
        route: "/api/weather/history",
      },
    },
  });
});

server.listen(port, () => {
  console.log("Weather Station running on :6700");
  IMU.getValue((err, data) => {
    if (err !== null) {
      console.error("Could not read sensor data: ", err);
      return;
    }
    console.log("Temp is: ", convertToF(data.temperature));
    console.log("Pressure is: ", getPressure(data.pressure));
    console.log("Humidity is: ", getHumidity(data.humidity));
    const now = new Date();
    db.get("history.temperature")
      .push({
        x: now,
        y: convertToF(data.temperature),
      })
      .write();
    db.get("history.humidity")
      .push({
        x: now,
        y: getHumidity(data.humidity),
      })
      .write();
    db.get("history.pressure")
      .push({
        x: now,
        y: getPressure(data.pressure),
      })
      .write();
    io.emit("weather_update", db.get("history").value());

    io.emit("humidity", { humidity: getHumidity(data.humidity) });
    io.emit("temperature", { temperature: convertToF(data.temperature) });
    io.emit("pressure", { pressure: getPressure(data.pressure) });

    run();
  });
});
