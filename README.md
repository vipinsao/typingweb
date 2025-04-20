
# 🧠 TypingWeb - Master Typing with Speed and Accuracy 🚀

Welcome to **TypingWeb** — a fun and effective way to improve your typing speed, accuracy, and confidence. This is a beta version and many cool features are under development. 🎯

This is a personal project I built to not only help others practice typing, but also to showcase my skills with frontend/backend tools, Firebase Auth, and real-time UI updates. 😄

---

## 🔥 Features

- ✅ Clean and responsive UI (Next.js + TailwindCSS)
- 🔐 Firebase Authentication (Login / Sign Up / Guest Mode)
- 💬 Paragraphs loaded from a custom array (based on difficulty levels)
- 🌐 Fully functional typing test with:
  - Accuracy & WPM calculation 📊
  - Visual keyboard for practice 🔤
  - English & Hindi mode 🇬🇧 🇮🇳
- 👨‍💻 Dynamic UI updates after login (profile avatar, name, etc.)
- ⚙️ Built-in state handling with React Hooks

---

## 📚 How I Built It

> Here’s the full breakdown of what went into building TypingWeb.

### 🏗️ Tech Stack

| Area        | Tech Used                        |
|-------------|----------------------------------|
| Frontend    | Next.js 15 + TypeScript          |
| UI          | Tailwind CSS                     |
| State Mgmt  | React Hooks + useEffect + Context |
| Auth        | Firebase Authentication          |
| Data Source | Custom JavaScript array (paragraphs by level) |
| Deployment  | Vercel                           |

---

## 📂 Paragraph Handling

I created a simple array of objects to store predefined paragraphs for each difficulty level:

const paragraphs = {
  easy: [ "Simple para 1", "Simple para 2", ... ],
  medium: [ "Medium para 1", ... ],
  hard: [ "Hard para 1", ... ],
};

Then I used \`Math.random()\` to randomly select paragraphs during a test. It’s lightweight and quick — no database required for this part.

---

## 🔐 Firebase Authentication

For auth, I integrated **Firebase** with full support for:

- 🔑 Login / Sign Up using email and password
- 🧪 Guest Mode (you can practice without an account)
- 🔄 Real-time profile updates after login

After logging in, your name is shown with an auto-generated avatar from the \`ui-avatars.com\` API.

---

## 💻 Local Setup

Want to run this locally? Follow these steps:

bash
# 1. Clone the repository
git clone https://github.com/your-username/TypingWeb.git

# 2. Install dependencies
cd TypingWeb
npm install

# 3. Create a .env file for Firebase config
touch .env.local
# Add your Firebase config keys here

# 4. Run the dev server
npm run dev

---

## 🧪 Demo Preview

> This is the current homepage design (Beta):

![TypingWeb Homepage](./Screenshot%202025-04-20%20153048.png)
Live Demo:[Lets Go Live](typingweb-two.vercel.app)

More UI features like stats, leaderboard, profile pages, and detailed reports are coming soon!

---

## 🤝 Contribution

This is still in beta, but if you're a dev interested in open-source collab or have feedback/suggestions — feel free to open an issue or PR.

---

## 📫 Contact Me

If you liked this project or want to connect:

- GitHub: [vipinsao](https://github.com/vipinsao)
- Twitter: [vipinSao1](https://x.com/vipinSao1)
- Email: vipinc.sao@gmail.com

---

Thanks for checking this out 🙌  
I built this as part of my journey to becoming a Full Stack Engineer at any company which will provide me opportunity.  
Every click, paragraph, and feature is totally hard work, crafted with 💙 and code!

— Sao (Vipin Chandra Sao)
