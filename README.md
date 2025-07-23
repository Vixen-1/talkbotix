# 🤖 TalkBotix

**TalkBotix** is your personal full-stack AI-powered interview assistant designed to help users ace real-world job interviews through realistic, voice-driven mock interviews.

> 🚀 [Live Demo](https://talkbotix.vercel.app/)

---

## 🛠️ Tech Stack

| Layer         | Tech Used                                                             |
|---------------|-----------------------------------------------------------------------|
| **Frontend**  | [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **AI Engine** | [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) |
| **Voice AI**  | [Vapi AI](https://vapi.ai/) for natural, human-like AI conversation    |
| **Auth & DB** | [Firebase](https://firebase.google.com/) for authentication & database |
| **Deployment**| [Vercel](https://vercel.com/)                                         |

---

## ✨ Features

- 🎤 **Voice-Based Interview Simulation** using Vapi AI
- 🧠 **Context-Aware Interview Generation** powered by Gemini 2.0 Flash
- 🔐 **Secure Authentication** with Firebase Auth
- 🔄 **Dynamic Interview Flows** tailored to:
  - Type of interview
  - Role
  - Experience level
  - Tech stack
  - Number of questions
- 📊 User data stored and managed via Firebase
- 💅 Modern UI built using Tailwind CSS + shadcn/ui components
- 🌐 Deployed live via Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/talkbotix.git
cd talkbotix
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

```bash
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project_id
NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID=private_key_id
NEXT_PUBLIC_FIREBASE_PRIVATE_KEY=private_key
NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=client_email
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_interview_generation_id
NEXT_PUBLIC_VAPI_QUESTIONS_ASSISTANT_ID=your_questionasking_bot_id
```

### 4. Run the development server

```bash
npm run dev
```

## 🧠 Powered By

- **🌐 Google Gemini 2.0 Flash** – For fast and powerful LLM responses
- **🗣️ Vapi AI** – For natural human-like voice conversations
- **📚 Firebase** – For scalable and secure backend infrastructure + real-time storage
- **🖌️ Tailwind CSS + shadcn/ui** – For clean, customizable UIs

## 🧑‍💻 Author

- Built with ❤️ by Ayushi Saxena