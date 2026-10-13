---
title: CourseSphere
tagline: A team prototype of a Cornell course recommender (React + Flask + Firebase) over scraped course-roster and Reddit data.
date: '2024'
role: Team of 5 · I set up the repo and built the React frontend (auth, dashboard, course selector) and the first query-classification scaffold
description: A summer team project to recommend Cornell courses from a student's profile. It has a working frontend and auth, Flask endpoints over course-roster data, and an unfinished LLM query pipeline.
group: ml
order: 7
tech:
- React
- TypeScript
- Flask
- Firebase
- Python
github: https://github.com/LambdaAK/CourseSphere
image: ../../assets/logos/coursesphere.png
mediaAlt: ''
highlights:
- I built Firebase sign-up/login, the dashboard with a course selector, and Realtime Database persistence of the student profile.
- Teammates added Flask endpoints over Kaggle course-roster and Reddit data, plus a chat UI.
---

## How it works
A React (MUI) frontend with Firebase auth collects a student's majors, minors, courses taken and an "about" blurb. A Flask backend serves course queries from roster data. `backend/query_manager.py` sketches an LLM step (classify the query type, then answer), but the OpenAI calls are commented out and `get_response_to_query` returns "Fake implementation".
