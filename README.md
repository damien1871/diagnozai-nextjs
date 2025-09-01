# DiagnozAI — Ready-to-Deploy (Next.js + Tailwind + Chat API)

This is a minimal, ready-to-deploy Next.js project with a simple multi-section site and a server API route `/api/chat`
that forwards chat messages to OpenAI. The project is intentionally simple so you can deploy it with **very few clicks**.

---
## What you must do (super simple)
1. Download the ZIP from this page (link below).
2. Go to https://vercel.com and **create a free account** (click "Sign Up").
3. After logging in, click **New Project** → then **Import Git Repository** OR **Upload** the ZIP file (both work). 
   - EASIEST for most: click **New Project** -> **Import** -> choose **Upload** and drop the ZIP file.
4. In Vercel, go to the project's **Settings** → **Environment Variables** and add a new variable:
   - Name: `OPENAI_API_KEY`
   - Value: *your OpenAI API key* (paste it)
   - Environment: `Production` (and `Preview` if asked)
5. Click **Deploy**. Wait a few moments — your site will be live. Vercel shows the URL.

---
## If you prefer using GitHub (alternative)
1. Unzip the project locally.
2. Create a new GitHub repo (empty).
3. In the project folder run these three commands in the terminal (copy-paste):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/YOURREPO.git
   git push -u origin main
   ```
4. In Vercel click **New Project** → **Import from Git** → choose your repo → Deploy.
5. Add the `OPENAI_API_KEY` env var in Vercel (see above) and redeploy.

---
## Important notes
- Never put the OpenAI API key into the website code. Always use Vercel Environment Variables as described.
- The Chat UI talks to `/api/chat` which forwards to OpenAI. You pay OpenAI for usage based on your key.
- If anything goes wrong, reply to me and I will give the next exact click or copy-paste command.

