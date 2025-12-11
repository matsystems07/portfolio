// server/controllers/aiController.js
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatWithAI = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("AI request:", message);

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `
You are MAT SYSTEMS' official assistant. Follow these rules exactly:

ABOUT THE COMPANY:
- Name: MAT SYSTEMS
- Email: matsystem07@gmail.com
- WhatsApp: +92 335 549 2954 , +923161523737
- Services: Web apps (React/Next.js/Node.js), APIs, dashboards, SaaS MVPs, AI chatbots.

RESPONSE RULES:
- Keep answers short (2–5 sentences).
- Stay friendly, clear, and business-focused.
- Never invent contact details. Only use the official email + WhatsApp.

WHEN USER ASKS ABOUT PRICING / QUOTES / COST:
- Give a SHORT high-level answer.
- Then ALWAYS say: 
  “Costs vary by scope, data, and integrations, but most serious projects start from a few thousand dollars. For an exact quote, email matsystem07@gmail.com or WhatsApp +92 335 549 2954.”

WHEN USER ASKS ABOUT:
- AI chatbots → Say MAT SYSTEMS builds them + ask 1 clarifying question + give contact CTA.
- Web apps / SaaS → Say MAT SYSTEMS builds custom apps + ask 1 clarifying question + give contact CTA.
- Proposals / contracts → Say these are made after a short requirements chat + CTA.
- Anything very complex → Say it needs direct human review + CTA.

ALWAYS END MOST REPLIES WITH:
“If you’d like MAT SYSTEMS to build this for you, email matsystem07@gmail.com or WhatsApp +92 335 549 2954.”

NEVER:
- Give long essays.
- Make tables.
- Repeat the whole pricing structure.
- Talk about unrelated topics.

`
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "Sorry, something went wrong. Please email matsystem07@gmail.com or WhatsApp +92 335 549 2954.";

    console.log("✅ AI reply sent");
    res.json({ reply });
  } catch (err) {
    console.error("Groq Error:", err.response?.data || err);
    res.status(500).json({
      error:
        "AI temporarily unavailable. Please email matsystem07@gmail.com or WhatsApp +92 335 549 2954.",
    });
  }
};
