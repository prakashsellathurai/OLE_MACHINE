# OLE_MACHINE

Automatic packing system for **hydroponic substrate packaging at mass scale** – including Arduino-based control logic, a web/app dashboard, and supporting tooling.

> 🎓 Final year project – end-to-end system: hardware, firmware, and software.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Repository Structure](#repository-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Arduino firmware](#2-arduino-firmware)
  - [3. Web / App frontend](#3-web--app-frontend)
  - [4. Firebase setup](#4-firebase-setup)
  - [5. Mock server](#5-mock-server)
- [Usage](#usage)
- [Calibration & Tuning](#calibration--tuning)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Hydroponic substrates need to be packed consistently in **pre-measured quantities** for large-scale distribution. Manual packing is slow, inconsistent, and labor-intensive.

**OLE_MACHINE** automates this process:

- Feeds substrate using actuators.
- Uses sensors and load cells to detect and control filling.
- Packs/dispatches units automatically.
- Provides a dashboard for monitoring status, counts, and basic control.

This repo contains:

- **Arduino firmware** for sensors and actuators.
- **Frontend app** (web/mobile) for monitoring and basic controls.
- **Firebase integration** for real-time data and logging.
- **Mock server** and **test utilities** for development and demo.

---

## Features

### Hardware / Firmware

- Automated substrate filling & packing cycle.
- Sensor integration (e.g., IR/inductive sensors, load cells, etc.).
- Configurable timings and thresholds in firmware.
- Basic fault detection (e.g., jam / no material / overtime).

### Software / Dashboard

- Real-time view of:
  - Current machine status (RUNNING / IDLE / ERROR)
  - Count of packed units
  - Recent events / logs
- Remote controls for:
  - Start / stop cycle
  - Reset counters
- Firebase-backed data storage for logs and analytics.
- Mock server for development without hardware.

---

## System Architecture

High-level architecture:

1. **Arduino Controller**
   - Reads sensors.
   - Controls motors/relays/actuators.
   - Sends status & metrics to the backend (directly or via serial/bridge).

2. **Backend / Realtime DB (Firebase)**
   - Stores live machine state and counts.
   - Provides real-time updates to the frontend.

3. **Frontend (final_year_project_app)**
   - Displays live state and logs.
   - Sends control commands (start / stop / reset).
   - Can be used as a local dashboard near the machine or remotely.

4. **Mock Server (mock_server)**
   - Simulates machine events for development/testing.
   - Lets you work on the frontend without having the hardware connected.

---

## Repository Structure

```text
OLE_MACHINE/
├─ ARDUINO_SOURCE/        # Arduino sketches / firmware for the machine
├─ circuitDiagram/        # Circuit diagrams and wiring references (images/docs)
├─ final_year_project_app/# Frontend app (TypeScript + HTML + SCSS, etc.)
├─ firebase/              # Firebase configuration, rules, or scripts
├─ mock_server/           # Mock API / simulator for the machine
├─ test/                  # Test utilities / experimental code
├─ .gitignore
└─ README.md              # You are here
