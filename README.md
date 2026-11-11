# 🎂 Birthday Surprise Website for My Queen

A faithful, high-fidelity recreation of the interactive birthday surprise website (based on the reference project by Ahmii Codes), customized with a warm, affectionate Bangladeshi boyfriend tone for **My Queen**.

---

## 🌟 Features & Journey

1. **Website Entry Lock Screen (`12072005`)**
   - Matches the reference aesthetic with wax seal icon, romantic copy, and shake animation on incorrect attempts.
   - Saves unlock state to `localStorage` so visitors do not have to re-enter the passkey on refresh.
   - Smooth loading screen transition.

2. **Chapter 1: Welcome**
   - Warm, personal greeting for **My Queen**.
   - Transparent chroma-keyed cute sticker animations and romantic background music.

3. **Chapter 2: Handwritten Letter**
   - Wax-sealed interactive envelope that unseals on click.
   - Parchment paper with realistic typewriter text animation.
   - Affectionate, natural Bangla-English blend (*Subho Jonmodin, Amar Shona...*).

4. **Chapter 3: Play (Scratch Card & Love Meter)**
   - **Interactive Scratch Card:** Metallic scratch surface that tracks scratching progress with canvas and reveals romantic prize with confetti.
   - **Love Meter:** Heart rate thermometer calculation that overflows to infinite love ($\infty\%$).

5. **Chapter 4: The Memory ATM ("PHOTO BANK" — PIN `1207`)**
   - True-to-reference ATM booth environment (`atm-booth.jpg`).
   - Realistic physical card that slides into the blinking card slot on tap.
   - **ATM PIN Screen:** Requires 4-digit PIN (`1207`) entered via the on-screen ATM keypad.
   - **ATM Main Menu & Options:**
     - 📸 **Withdraw Memories:** 6 curated photo memory cards with captions and navigation.
     - 📊 **Emotional Balance Inquiry:** Sweet & humorous account statements (Smile: 100%, Funny Moments: 97%, Late Replies: 89%, Kindness: $\infty$, Love: $\infty$).
     - ✨ **Make a Birthday Wish:** Direct wish input on ATM screen with confirmation.
     - 🧾 **Exit Session:** Ejects realistic printed receipt (tap to collect), card return with blinking LED, and thank you screen.

6. **Chapter 5: Cut the Cake**
   - Birthday cake with animated flickering candles.
   - "Blow out the candles" button that extinguishes flames.
   - Interactive knife cursor that cuts real cake slices and drops cream crumbs.
   - Tracks slice count and unlocks the gift chapter.

7. **Chapter 6: Accept Gift & YouTube Surprise Video**
   - 3D gift box with shiny ribbon and bow. Tap to unwrap with a grand confetti celebration.
   - Displays romantic love coupons (*Unlimited Warm Hugs, Chai & Fuchka Date, One Wish Granted, etc.*).
   - **Video Integration:** Embedded YouTube video (`https://youtu.be/M9MweOLxGCU`) with responsive 16:9 container, perfectly styled.
   - "Relive The Journey ↺" button to replay from Chapter 1.

---

## 🔐 Passwords

| Purpose | Password | Location |
| :--- | :--- | :--- |
| **Website Entry** | `12072005` | Initial entry lock screen (unlocks entire site) |
| **Memory ATM** | `1207` | Keypad inside Chapter 4 (Memory ATM only) |

---

## 🎨 How to Personalize Content

All personal data, messages, passwords, and links are centralized in:
👉 [`src/config/birthdayConfig.js`](file:///d:/Birthday%20Wish/src/config/birthdayConfig.js)

```javascript
export const birthdayConfig = {
  passwords: {
    websitePasskey: "12072005",
    atmPin: "1207",
  },
  recipient: {
    name: "My Queen",
    age: 20,
    nickname: "Amar Shona",
    petName: "Jaan",
  },
  youtube: {
    videoId: "M9MweOLxGCU", // YouTube Video ID
    title: "A Special Surprise For My Queen 🎥",
  },
  // ...edit letter, coupons, music, and ATM memories here!
};
```

### Swapping Photos:
- Replace ATM photos in: `public/assets/images/atm/photo-1.jpg` through `photo-6.jpg`.
- Replace background music in: `public/assets/our-song.mp3`.

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🚀 Free Vercel Deployment Guide

### Option 1: Via GitHub (Recommended)
1. Initialize Git in the project:
   ```bash
   git init
   git add .
   git commit -m "Initial birthday surprise commit"
   ```
2. Push the repository to your GitHub account (make it private or public).
3. Go to [vercel.com](https://vercel.com) and log in.
4. Click **"Add New..."** → **"Project"**.
5. Select your GitHub repository.
6. Framework preset will automatically be detected as **Vite**.
7. Click **Deploy**. In under a minute, your public live surprise URL will be ready!

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the CLI prompts (accept default settings).

