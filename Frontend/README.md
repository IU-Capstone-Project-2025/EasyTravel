# Frontend README

This directory contains the Next.js-based frontend for EasyTravel. It provides the user interface for searching and getting personalized recommendations of places to visit.

---

## 📁 Structure

```
Frontend/
├── app/                # App Router pages and layouts
├── components/         # Reusable React components (UI, user menu, etc.)
├── hooks/              # Custom React hooks
├── public/             # Static assets
├── styles/             # Global styles and Tailwind config
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── Dockerfile          # Container build for production
└── package.json        # Project manifest
```

---

## 🛠️ Development

1. **Install dependencies** (using `pnpm` recommended):

   ```bash
   pnpm install
   ```

2. **Run the development server**:

   ```bash
   pnpm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Environment variable**:

   - `NEXT_PUBLIC_API_URL` – URL of the backend API (default `http://localhost:8000`).

   Set this in your environment or in `.env.local` when running locally.

4. **Build for production**:

   ```bash
   pnpm run build
   pnpm run start
   ```

---

## 🐳 Docker

The project includes a `Dockerfile` for containerized deployment. You can also use `docker-compose` from the repository root which starts both the frontend and backend services:

```bash
docker-compose up --build
```

The frontend will be available on port **3000**.

---
