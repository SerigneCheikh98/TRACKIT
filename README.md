
# TRACKIT

## “On the right track for perfect driving”

# Team members

1. Francesco Pio Cellamare s309530​
2. Serigne Cheikh Tidiane Sy Fall s317390​
3. Paolo Muccilli s317715​
4. Inaam El Helwe s306979

# Problem/Solution Overview

TRACKIT is a mobile application designed for individuals who are learning to drive and want to enhance their driving skills while monitoring their progress. Users can schedule practice sessions with experienced drivers through the application and decide the topics they want to practice on. Following each lesson, the experienced driver is prompted to complete a form and provide feedback on the student's performance.

## Getting started

Double-Server Setup has been used for the development

### How to run

#### Client side

- Download expo App from your device's app store
- navigate to the directory TRACKIT/client/TRACKIT

```bash
cd TRACKIT/client/TRACKIT
```

- install the packages

```bash
npm install
```

- run the application

```bash
npm start
```

- connect your smartphone as follow:
  - from `iphone`: ***scan the QR code using the Camera App***
    > android not supported yet!

> **IMPORTANT**: You need to be connected under the same network. Furthermore, the IP address obtained through npm start must be substitute in API.jsx

#### Server side

- navigate to the directory TRACKIT/server

```bash
cd TRACKIT/server
```

- install the packages

```bash
npm install
```

- run the server

```bash
node index.js
```
