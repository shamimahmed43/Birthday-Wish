/**
 * Centralized Birthday Surprise Configuration
 * 
 * Edit this file to easily personalize texts, dates, passwords,
 * photos, music, and the YouTube video without touching UI components.
 */

export const birthdayConfig = {
  // Passwords
  passwords: {
    // 1. Initial website entry password (DDMMYYYY format)
    websitePasskey: "12072005",
    // 2. ATM PIN (4-digit format)
    atmPin: "1207",
  },

  // Recipient Identity
  recipient: {
    name: "My Queen",
    age: 20,
    nickname: "Amar Shona",
    petName: "Jaan",
    title: "Happiest 20th Birthday, My Queen",
  },

  // Relationship Context & Tone (Bangladeshi boyfriend)
  context: {
    senderName: "Your Boyfriend",
    signOff: "Always & Forever Yours ❤️",
  },

  // Music configuration
  music: {
    src: "/assets/our-song.mp3",
    title: "Mujhe Tumse Bahut Hai Pyar",
    autoPlayPrompt: "Play our song 🎵",
  },

  // YouTube Video Integration
  youtube: {
    videoId: "M9MweOLxGCU",
    title: "A Special Surprise For My Queen 🎥",
    subtitle: "Watch this special birthday video made just for you",
    url: "https://youtu.be/M9MweOLxGCU?si=XEyHIvBGCqEKpkTL",
  },

  // Assets paths
  assets: {
    atmBg: "/assets/atm-booth.jpg",
    happyBirthday: "/assets/happy-birthday.png",
    cheekLove: "/assets/cheek-love.mp4",
    hugBears: "/assets/hug-bears.mp4",
    iLoveYou: "/assets/i-love-you.mp4",
    bearCake: "/assets/bear-cake.jpeg",
    giftBox: "/assets/gift-box.mp4",
    thankYou: "/assets/thank-you.png",
  },

  // Chapter 1: Welcome Screen
  welcome: {
    eyebrow: "Happiest Birthday, My Queen",
    heading: "A 6-Chapter Surprise Journey",
    message: "Today is all about you, my love. I built this tiny corner of the internet exclusively for you. Walk through each chapter, smile as much as you can, and know how much you are cherished.",
    buttonText: "Begin Our Journey ❤️",
  },

  // Chapter 2: The Heartfelt Letter
  letter: {
    envelopeTitle: "A special handwritten letter for My Queen",
    envelopeHint: "Tap the wax seal to open",
    salutation: "My Dearest Queen,",
    paragraphs: [
      "Subho Jonmodin, Amar Shona! As you turn 20 today, I just want you to pause for a quiet second and realize how truly extraordinary and precious you are to me.",
      "From the moment you entered my life, every ordinary day became brighter, warmer, and full of joy. You are not only my girlfriend—you are my peace, my happiest notification, and my sweetest prayer.",
      "Thank you for your adorable smiles, your cute little tantrums, your caring heart, and for always being my biggest comfort. Through every high and low, I promise to stand by you, hold your hand, make you laugh, and love you more with every passing day.",
      "May this new year of your life bring endless blessings, peaceful smiles, and all the success in the world. Enjoy every second of your day, Queen.",
    ],
    closing: "With all my heart and infinite love,",
    signature: "Yours forever & always ❤️",
  },

  // Chapter 3: Play Section
  play: {
    scratch: {
      title: "Scratch & Win",
      subtitle: "Use your finger or mouse to scratch the golden card!",
      revealedPrize: "🎉 Congratulations, My Queen! You've officially won my entire heart for a lifetime, plus unlimited cuddle passes and endless pampering whenever you demand! ❤️",
      proceedText: "Continue to Love Meter →",
    },
    meter: {
      title: "The Love Calculator",
      subtitle: "Click the button below to scientifically measure how much I love you.",
      buttonText: "Calculate My Love ❤️",
      completedMessage: "Result confirmed: 100% is not enough. My love for you is off the charts and mathematically infinite! ∞ ❤️",
    },
  },

  // Chapter 4: Memory ATM ("PHOTO BANK")
  atm: {
    topperText: "PHOTO BANK",
    cardBank: "PHOTO BANK",
    cardName: "My Queen • ∞ Love",
    memories: [
      { img: "/assets/images/atm/photo-1.jpg", caption: "Favorite Photo ❤️" },
      { img: "/assets/images/atm/photo-2.jpg", caption: "Looking Good ✨" },
      { img: "/assets/images/atm/photo-3.jpg", caption: "Just Vibing 🌙" },
      { img: "/assets/images/atm/photo-4.jpg", caption: "Today, Your Big Day 🎂" },
      { img: "/assets/images/atm/photo-5.jpg", caption: "That Look ✨" },
      { img: "/assets/images/atm/photo-6.jpg", caption: "Effortless 🖤" },
    ],
    balance: [
      { label: "Sweet Smile", value: "100%", pct: 100 },
      { label: "Funny Moments", value: "97%", pct: 97 },
      { label: "Late Replies", value: "89%", pct: 89 },
      { label: "Kindness & Cuteness", value: "∞", pct: 100 },
      { label: "Boyfriend's Love", value: "∞", pct: 100 },
    ],
  },

  // Chapter 5: Cut the Cake
  cake: {
    eyebrow: "A sweet birthday ritual",
    title: "Blow out the candles first",
    blowCandlesText: "Blow out the candles 🕯️",
    candlesBlownText: "Now drag the knife to cut the birthday cake! 🎂",
    doneButtonText: "Cake is served, open your gift 🎁",
  },

  // Chapter 6: Final Gift & Coupons
  gift: {
    eyebrow: "A little surprise for you",
    title: "One last thing, accept your gift",
    hint: "Tap the box to open your gift 🎁",
    revealTitle: "Happy 20th Birthday, My Queen ❤️",
    revealMessage: "The real gift is not in this box. It is every memory we have made, every laugh we have shared, the locked door only you could open, the letter written with all my soul, and a future where I always stand by you.",
    coupons: [
      "Unlimited Warm Hugs",
      "Late Night Chai & Fuchka Date",
      "One Wish, Granted Unconditionally",
      "Immunity from Any Argument for 24h",
      "Me, Beside You Always & Forever",
    ],
  },
};

