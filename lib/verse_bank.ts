// Verse bank for Geeta Marg.
// Stores only references, our plain meanings and topic tags.
// Translation text (Edwin Arnold 1885) is added only after verification
// (see Verse_of_the_Day_Master in Drive). Never invent a verse here.

export type Verse = {
  ref: string;        // e.g. "2.47"
  meaning: string;    // our plain-language meaning
  tags: string[];     // topic and Hindi/English keywords used for retrieval
};

export const VERSE_BANK: Verse[] = [
  { ref: "2.3", meaning: "Do not give in to weakness when your duty calls.", tags: ["courage", "fear", "dar", "weak", "himmat"] },
  { ref: "2.11", meaning: "Wise people do not grieve over what cannot be changed.", tags: ["grief", "loss", "gham", "dukh", "death", "sorrow"] },
  { ref: "2.14", meaning: "Joy and sorrow come and go like seasons; endure them calmly.", tags: ["anxiety", "worry", "chinta", "sad", "pain", "bura", "time", "pass"] },
  { ref: "2.38", meaning: "Treat gain and loss, success and failure, alike, then act.", tags: ["failure", "success", "result", "haar", "jeet", "exam", "fear"] },
  { ref: "2.47", meaning: "Your right is to act well, not to control the results.", tags: ["work", "career", "job", "naukri", "result", "exam", "effort", "anxiety", "chinta", "future"] },
  { ref: "2.48", meaning: "Act with an evenly balanced mind; that is the heart of yoga.", tags: ["balance", "calm", "stress", "pressure", "work"] },
  { ref: "2.62", meaning: "Brooding on objects of desire breeds attachment, and then desire.", tags: ["desire", "lust", "craving", "wanting", "attachment", "addiction"] },
  { ref: "2.63", meaning: "From desire comes anger, then confusion, then loss of memory and judgement.", tags: ["anger", "gussa", "relationship", "fight", "shout", "temper", "judgement"] },
  { ref: "2.70", meaning: "A steady mind takes in desires as the ocean takes in rivers, and stays full.", tags: ["peace", "desire", "restless", "shanti", "calm"] },
  { ref: "3.8", meaning: "Doing your work is better than doing nothing.", tags: ["laziness", "procrastination", "action", "start", "lazy", "motivation"] },
  { ref: "3.19", meaning: "Work without clinging to its fruit.", tags: ["work", "attachment", "result", "detachment"] },
  { ref: "3.35", meaning: "Your own duty, done imperfectly, is better than another's done perfectly.", tags: ["career", "choice", "confusion", "path", "comparison", "naukri", "dharma", "duty"] },
  { ref: "4.38", meaning: "Nothing purifies like knowledge.", tags: ["study", "learning", "knowledge", "gyan", "doubt"] },
  { ref: "5.10", meaning: "Act like a lotus leaf in water: touched, but not soaked.", tags: ["involvement", "burnout", "stress", "detach", "family"] },
  { ref: "6.5", meaning: "Lift yourself by yourself; do not let yourself fall.", tags: ["self", "confidence", "self-doubt", "doubt", "motivation", "khud", "worth", "giving up"] },
  { ref: "6.6", meaning: "The self can be your friend or your enemy.", tags: ["self", "comparison", "self-doubt", "habits", "addiction", "mind"] },
  { ref: "6.16", meaning: "Balance in eating and sleeping is the foundation of steady practice.", tags: ["habits", "sleep", "food", "routine", "discipline"] },
  { ref: "6.35", meaning: "The mind is restless, but practice and detachment can steady it.", tags: ["mind", "restless", "focus", "distraction", "phone", "habit", "anxiety"] },
  { ref: "9.26", meaning: "Offer a leaf, a flower, a fruit or water with a sincere heart.", tags: ["devotion", "prayer", "bhakti", "gratitude", "simple"] },
  { ref: "9.22", meaning: "Those who are devoted find their needs carried for them.", tags: ["trust", "faith", "provision", "money", "fear", "support"] },
  { ref: "10.20", meaning: "The Self is present in the heart of every being.", tags: ["oneness", "respect", "others", "equality", "belonging"] },
  { ref: "12.13", meaning: "Be friendly and compassionate to all, free of ego.", tags: ["kindness", "compassion", "ego", "anger", "relationship", "friend"] },
  { ref: "12.15", meaning: "Do not agitate others, and do not be agitated by them.", tags: ["peace", "others", "criticism", "gossip", "anger", "fight", "relationship"] },
  { ref: "16.21", meaning: "Desire, anger and greed are three gates to ruin.", tags: ["greed", "money", "desire", "anger", "ruin", "temptation"] },
  { ref: "18.47", meaning: "Your own duty, even imperfect, is better than another's.", tags: ["career", "comparison", "duty", "path", "naukri", "dharma"] },
  { ref: "18.63", meaning: "Reflect fully, then act as you choose.", tags: ["decision", "choice", "confusion", "clarity", "dilemma", "faisla"] },
  { ref: "18.66", meaning: "Let go of anxious control and take refuge in what is higher.", tags: ["surrender", "control", "fear", "burden", "worry", "trust", "faith"] },
];
