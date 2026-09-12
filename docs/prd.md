Absolutely. Here is a **PRD (Product Requirements Document)** for your project, structured so you can use it for your BCA final-year project documentation and later development.

# Product Requirements Document (PRD)

## AI-Powered Resume Analyzer & Career Roadmap Platform

**Version:** 1.0
**Project Type:** AI-powered Web Application
**Target Users:** College students, freshers, and early-career job seekers
**Primary Goal:** Analyze a student's resume using AI and provide actionable corrections, skill-gap analysis, and a personalized career roadmap.

---

## 1. Product Overview

### Product Name

**CareerPath AI** *(working name)*

### One-line Description

> An AI-powered platform that analyzes a student's resume, identifies weaknesses and skill gaps, suggests corrections, and generates a personalized career roadmap based on their target career.

### Problem Statement

Many students create resumes without knowing:

* Whether their resume is ATS-friendly
* Whether their skills match their desired job role
* What skills they are missing
* How to improve their project descriptions
* Which technologies they should learn next
* What projects they should build
* Whether they are actually ready for placements

Existing resume tools often focus primarily on resume scoring. Students need something more useful:

> **"Tell me where I am now, what is missing, and exactly what I should do next."**

---

# 2. Product Vision

The platform should transform a student's resume into a **personalized career development plan**.

```text
              RESUME
                 ↓
          AI ANALYSIS
                 ↓
       ┌─────────┴─────────┐
       ↓                   ↓
 Resume Evaluation      Skill Analysis
       ↓                   ↓
 Corrections            Skill Gaps
       └─────────┬─────────┘
                 ↓
          CAREER ROADMAP
                 ↓
       ┌─────────┼─────────┐
       ↓         ↓         ↓
    Skills    Projects   Practice
       ↓         ↓         ↓
       └─────────┼─────────┘
                 ↓
         PLACEMENT READY
```

---

# 3. Target Users

### Primary Users

**College Students**

Especially:

* BCA
* B.Tech
* MCA
* Computer Science students
* IT students

### Secondary Users

* Fresh graduates
* Entry-level job seekers
* Students preparing for placements
* Career switchers at beginner level

---

# 4. User Goals

The user should be able to:

1. Upload their resume.
2. Select a target career/job role.
3. Receive an AI-generated resume analysis.
4. Understand their strengths and weaknesses.
5. See an overall resume score.
6. Identify missing skills.
7. Receive specific resume corrections.
8. Get recommended projects.
9. Get a personalized learning roadmap.
10. Track their progress.

---

# 5. Core Features

## Feature 1 — User Authentication

Users can create an account and log in.

### Requirements

* Registration
* Login
* Logout
* Password protection
* Profile management

### User Profile

```text
Name
Education
College
Degree
Graduation Year
Target Career
Experience Level
```

---

# 6. Resume Upload

The user uploads their resume.

### Supported formats

* PDF
* DOCX

### Process

```text
Upload Resume
      ↓
Validate File
      ↓
Extract Text
      ↓
Parse Resume
      ↓
Send Structured Data to AI
```

### Validation

System should check:

* File format
* File size
* Whether readable text exists
* Whether the document appears to be a resume

---

# 7. Resume Parsing

The system extracts information such as:

### Personal Information

* Name
* Email
* Phone
* Location
* Portfolio links

### Education

* Degree
* Institution
* Graduation year
* CGPA/percentage

### Skills

Example:

```text
Python
Java
SQL
HTML
CSS
JavaScript
Git
```

### Projects

```text
Project Name
Technology Used
Description
Role
Achievements
```

### Experience

```text
Company
Position
Duration
Responsibilities
```

### Certifications

* Certification name
* Issuing organization
* Year

---

# 8. AI Resume Analysis

This is the core feature.

The AI evaluates the resume across multiple categories.

### Resume Score

Example:

```text
Overall Score
       78/100
```

### Categories

| Category          | Score |
| ----------------- | ----: |
| ATS Compatibility |    82 |
| Skills            |    76 |
| Projects          |    70 |
| Education         |    90 |
| Experience        |    60 |
| Content Quality   |    75 |
| Formatting        |    85 |

---

# 9. ATS Analysis

The system evaluates whether the resume is likely to work well with Applicant Tracking Systems.

### Checks

* Standard section headings
* Keyword relevance
* Skill matching
* Excessive graphics
* Complex formatting
* Tables
* Unnecessary sections
* Missing keywords

### Output

```text
ATS Score: 82/100

✓ Clear section structure
✓ Relevant technical skills
⚠ Project descriptions need stronger keywords
⚠ Add target-role keywords
```

---

# 10. Resume Corrections

The system should provide **specific corrections**, not generic advice.

### Example

**Current:**

> Made a student management system using Java.

**AI Recommendation:**

> Developed a Java-based Student Management System implementing CRUD operations for managing student records through REST APIs.

### Categories

* Grammar
* Sentence structure
* Technical terminology
* Achievement statements
* Project descriptions
* Skill descriptions
* Professional wording

---

# 11. Skill Gap Analysis

The user selects a target role.

Example:

> **Target Role: AI Engineer**

The system compares:

```text
CURRENT SKILLS
       ↓
TARGET ROLE REQUIREMENTS
       ↓
SKILL GAP
```

### Example

| Skill            | Current | Required | Gap    |
| ---------------- | ------- | -------- | ------ |
| Python           | ✅       | ✅        | None   |
| SQL              | ✅       | ✅        | None   |
| Machine Learning | ❌       | ✅        | High   |
| Deep Learning    | ❌       | ✅        | High   |
| RAG              | ❌       | ✅        | Medium |
| Git              | ✅       | ✅        | None   |

---

# 12. Personalized Career Roadmap

This is the **main differentiating feature**.

The AI creates a roadmap based on:

* Current skills
* Education
* Target role
* Experience
* Projects
* Skill gaps

### Example

```text
AI ENGINEER ROADMAP

LEVEL 1
Programming Foundations
├── Python
├── Git
└── SQL

LEVEL 2
Data & ML
├── NumPy
├── Pandas
├── Statistics
└── Machine Learning

LEVEL 3
Advanced AI
├── Deep Learning
├── NLP
├── LLMs
└── RAG

LEVEL 4
Projects
├── ML Project
├── RAG Application
└── AI Agent

LEVEL 5
Placement
├── DSA
├── Resume
├── GitHub
└── Interviews
```

---

# 13. Project Recommendations

The AI recommends projects based on the student's skill level.

### Example

If the student knows:

```text
Python
SQL
Pandas
Basic ML
```

The system might recommend:

### Beginner

**Student Performance Prediction**

### Intermediate

**Job Salary Prediction System**

### Advanced

**AI Resume Analyzer**

Each project should include:

* Project description
* Difficulty
* Technologies
* Features
* Learning objectives
* Expected outcome

---

# 14. Learning Recommendations

For each missing skill:

```text
Missing Skill
     ↓
Why you need it
     ↓
What to learn
     ↓
Practice
     ↓
Project
```

Example:

### Machine Learning

**Why:** Required for your target AI Engineer role.

**Learn:**

1. Supervised Learning
2. Regression
3. Classification
4. Model Evaluation
5. Feature Engineering

**Practice:** Build a prediction model.

---

# 15. Career Readiness Score

The platform can calculate an overall readiness score.

Example:

```text
         CAREER READINESS

              68%
        ███████████░░░░

Resume       78%
Skills       65%
Projects     70%
GitHub       60%
DSA          55%
Interview    62%
```

This gives the student a simple answer:

> **"How ready am I for placements?"**

---

# 16. Dashboard

The dashboard becomes the student's central workspace.

### Dashboard

```text
┌────────────────────────────────────┐
│          CAREERPATH AI             │
├────────────────────────────────────┤
│                                    │
│ Resume Score             78/100    │
│ Career Readiness         68%       │
│                                    │
├────────────────────────────────────┤
│ Target Role: AI Engineer           │
├────────────────────────────────────┤
│                                    │
│ Skills to Learn                    │
│ ███████░░ Machine Learning         │
│ █████░░░░ Deep Learning            │
│ ███░░░░░░ RAG                     │
│                                    │
├────────────────────────────────────┤
│ Today's Tasks                      │
│                                    │
│ ☐ Learn Python OOP                 │
│ ☐ Complete ML exercise             │
│ ☐ Improve project description      │
│                                    │
└────────────────────────────────────┘
```

---

# 17. Progress Tracking

Users can mark roadmap items as complete.

```text
Python
██████████ 100% ✓

Machine Learning
██████░░░░ 60%

Deep Learning
██░░░░░░░░ 20%
```

The system should update the user's progress.

---

# 18. Future Features

These should **not necessarily be part of the first version**, but can make the project much more powerful.

### GitHub Analysis

User connects GitHub.

AI analyzes:

* Repositories
* Project quality
* Languages
* Commit activity
* README quality
* Project relevance

### Job Description Matching

User uploads a job description.

System compares:

```text
RESUME
   +
JOB DESCRIPTION
   ↓
AI MATCHING
   ↓
Match Score: 81%
```

### LinkedIn Analysis

Analyze profile completeness and career positioning.

### AI Interview Preparation

Generate interview questions based on:

* Resume
* Target role
* Projects
* Skills

---

# 19. Functional Requirements

### FR-01

The system shall allow users to register and log in.

### FR-02

The system shall allow users to upload resumes.

### FR-03

The system shall extract resume text.

### FR-04

The system shall identify resume sections.

### FR-05

The system shall calculate a resume score.

### FR-06

The system shall analyze ATS compatibility.

### FR-07

The system shall identify skill gaps.

### FR-08

The system shall generate resume corrections.

### FR-09

The system shall generate a personalized career roadmap.

### FR-10

The system shall recommend projects.

### FR-11

The system shall track roadmap progress.

### FR-12

The system shall generate a career-readiness score.

---

# 20. Non-Functional Requirements

### Performance

Resume analysis should ideally complete within a reasonable time, e.g. **10–30 seconds**, depending on AI/API response time.

### Security

* Secure authentication
* Password hashing
* Protected user data
* Secure file handling
* API authentication

### Scalability

Architecture should allow additional AI features later.

### Usability

The interface should be:

* Simple
* Mobile responsive
* Beginner-friendly
* Easy to understand

---

# 21. Suggested Technology Stack

Since you're learning Java/Spring Boot:

### Frontend

**React.js**

```text
React
HTML
CSS
JavaScript
```

### Backend

**Spring Boot**

```text
Java
Spring Boot
Spring Security
REST API
```

### Database

**MySQL** or **PostgreSQL**

### AI Service

Two possible architectures:

**Option A — Java directly communicates with LLM API**

```text
React
 ↓
Spring Boot
 ↓
LLM API
```

**Option B — Python AI microservice**

```text
React
 ↓
Spring Boot
 ↓
Python FastAPI
 ↓
LLM
```

For your first version, **Option A is simpler**.

---

# 22. High-Level System Architecture

```text
                    USER
                     │
                     ▼
              ┌─────────────┐
              │ React Front │
              │    End      │
              └──────┬──────┘
                     │ REST API
                     ▼
              ┌─────────────┐
              │ Spring Boot │
              │   Backend   │
              └──────┬──────┘
                     │
          ┌──────────┼───────────┐
          ▼          ▼           ▼
      ┌───────┐  ┌────────┐  ┌─────────┐
      │ MySQL │  │ Resume │  │   AI    │
      │       │  │Parser  │  │ Service │
      └───────┘  └────────┘  └────┬────┘
                                  │
                                  ▼
                              LLM API
```

---

# 23. Main Database Entities

### User

```text
id
name
email
password
education
graduation_year
target_role
created_at
```

### Resume

```text
id
user_id
file_name
resume_text
score
uploaded_at
```

### Skill

```text
id
name
category
```

### UserSkill

```text
id
user_id
skill_id
proficiency
```

### Roadmap

```text
id
user_id
target_role
created_at
```

### RoadmapItem

```text
id
roadmap_id
title
description
priority
status
```

### Project

```text
id
title
description
difficulty
technologies
```

---

# 24. MVP — Version 1

Don't try to build everything initially.

Your **MVP should contain only:**

```text
1. Login/Register
        ↓
2. Resume Upload
        ↓
3. Resume Text Extraction
        ↓
4. AI Resume Analysis
        ↓
5. Resume Score
        ↓
6. Skill Gap Analysis
        ↓
7. Resume Corrections
        ↓
8. Personalized Roadmap
        ↓
9. Dashboard
```

This alone is already a **complete BCA-level AI project**.

---

# 25. Version 2

After MVP:

```text
+ GitHub Analysis
+ Job Description Matching
+ Project Recommendations
+ Learning Resources
+ Progress Tracking
+ Career Readiness Score
```

---

# 26. Version 3

Advanced version:

```text
+ LinkedIn Analysis
+ AI Interview
+ Mock Interviews
+ Job Recommendations
+ Resume Builder
+ AI Career Assistant
```

---

# 27. Success Metrics

The project can measure:

* Number of registered users
* Number of resumes analyzed
* Average resume score improvement
* Roadmap completion rate
* Number of skill gaps identified
* Number of users completing recommended projects

A particularly good metric for your project demonstration:

> **Before vs After Resume Score**

Example:

```text
Before AI Suggestions
        61/100

        ↓
   AI Corrections
        ↓

After Improvements
        84/100
```

That gives you a very strong **project demonstration** during your viva.

---

# 28. Unique Selling Proposition

Your project shouldn't be presented as simply:

> **"AI Resume Analyzer"**

Instead:

> ### **"AI-powered Career Gap & Roadmap Platform for Students"**

The key difference is:

**Most resume tools → "Here is your score."**

**Your platform → "Here is your score, here is what's wrong, here is what you're missing, and here is exactly what you should learn and build next."**

---

# 29. Final Product Statement

> **CareerPath AI is an AI-powered career guidance platform designed for students and freshers. It analyzes their resumes, evaluates ATS compatibility, identifies skill gaps, provides personalized resume corrections, recommends relevant projects, and generates a customized career roadmap to help them become placement-ready.**

### Recommended development order

```text
PHASE 1
Frontend foundation
        ↓
PHASE 2
Spring Boot backend
        ↓
PHASE 3
Database
        ↓
PHASE 4
Resume upload + extraction
        ↓
PHASE 5
AI integration
        ↓
PHASE 6
Resume scoring
        ↓
PHASE 7
Skill-gap engine
        ↓
PHASE 8
Roadmap generator
        ↓
PHASE 9
Dashboard
        ↓
PHASE 10
Testing + deployment
```

**This is the version I would recommend building first.** It is ambitious enough to look impressive, but still realistic to complete as a BCA project.
