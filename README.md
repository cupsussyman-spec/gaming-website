# ⛏ CraftedWisdom

> **The ultimate community-driven Minecraft tips & tricks platform.**
> Share your knowledge. Survive together.

---

## 🗺️ Features

- 📖 Browse Minecraft tips by category — Survival, Redstone, Building, Combat, Farming
- ✍️ Submit your own tips with optional YouTube links
- 👍 Upvote / downvote tips from the community
- 🔐 Login with **Google** or register with email & password
- 👤 Player profiles showing submitted tips and total upvotes
- 🌱 Pixel-art Minecraft aesthetic throughout

---

## 🧱 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase OAuth (Google) + Custom JWT |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/gaming-website.git
cd gaming-website
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Go to **Authentication → Providers** and enable **Google**
4. Go to **Authentication → URL Configuration** and add your redirect URL:
   ```
   http://localhost:5173/auth/callback
   ```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
JWT_SECRET=any-random-secret-string
```

Also update `client/src/lib/supabase.js` with your own Supabase URL and anon key.

### 4. Install dependencies

```bash
npm run install:all
```

### 5. Run the development servers

Open **two terminals**:

```bash
# Terminal 1 — Backend
node server/index.js

# Terminal 2 — Frontend
cd client && npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3001](http://localhost:3001)

---

## 📁 Project Structure

```
gaming-website/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # Shared UI components
│       ├── context/         # Auth context
│       ├── lib/             # Supabase client
│       └── pages/           # Route pages
├── server/                  # Express backend
│   ├── middleware/          # Auth middleware
│   ├── routes/              # API routes
│   ├── database.js          # Supabase client
│   └── index.js             # Entry point
├── supabase-schema.sql      # Database schema (run once in Supabase)
└── .env.example             # Environment variable template
```

---

## 🗃️ Database Schema

```
users     — id, username, email, password_hash, created_at
tips      — id, user_id, title, category, content, youtube_url, created_at, updated_at
votes     — id, user_id, tip_id, type (up/down)
```

---

## 📜 License

MIT — do whatever you want with it.
