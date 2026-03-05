# LLM Quest: Interactive Learning Game

## Project Overview

**Project Name:** LLM Quest
**Type:** Interactive educational web game (Single Page App)
**Deploy:** GitHub Pages (static HTML/JS)
**Target Users:** Developers learning about LLMs and AI agents

## Game Concept

**Theme:** "Train Your AI Wizard" - Each level teaches a concept, user must pass a quiz to level up and unlock new abilities for their wizard.

**Tone:** Friendly, encouraging, playful. Not intimidating like a test - more like a fun challenge.

## Visual Style

- **Aesthetic:** Pixel art meets modern UI, retro-gaming vibes
- **Colors:** Deep purples, neon blues, warm oranges (magic/tech feel)
- **Animations:** Smooth transitions, confetti on correct answers, gentle shake on wrong
- **Sound:** Optional - soft chimes for success, can be muted

## Core 8 Levels (Revised Order)

Reordered for better difficulty progression - easier concepts first:

```
🌱 Level 1: The Spark (Intro to LLMs)
   └─ What is an LLM? Basic concept

📜 Level 2: The Scroll (Context Window)
   └─ Context limits, how much AI can "remember"

🧮 Level 3: The Gem (Tokens & Pricing)
   └─ Tokenization, costs, rate limits

⚙️ Level 4: The Transformer (Architecture)
   └─ How transformers work, attention mechanism

💎 Level 5: The Embedding (Vector Space)
   └─ How AI understands meaning

🔗 Level 6: The Protocol (MCP)
   └─ Model Context Protocol, tool use

🧙 Level 7: The Master (Skills & Subagents)
   └─ Agent patterns, skill orchestration

🔮 Level 8: The Spellbook (Prompt Engineering)
   └─ Prompt structure, chain of thought, few-shot
```

### Level Details

#### Level 1: The Spark (LLM Fundamentals)
**Story:** "Every wizard needs to understand their power source. Learn what makes Large Language Models tick!"

**Content:**
- LLM = Large Language Model
- How LLMs predict the next word
- Training vs inference
- Why they seem "smart"

**Quiz (Multiple Choice):**
1. What does LLM stand for?
   - A) Large Language Model ✓
   - B) Long Learning Machine
   - C) Local Language Memory
   - D) Linear Logic Matrix

2. How do LLMs typically generate text?
   - A) By copying from training data
   - B) By predicting the next most likely word ✓
   - C) By using hard-coded responses
   - D) By connecting to a search engine

3. What is the difference between training and inference?
   - A) They are the same thing
   - B) Training = learning from data, inference = using the model ✓
   - C) Inference is more expensive
   - D) Training requires more memory

---

#### Level 2: The Scroll (Context Window)
**Story:** "The Scroll has limits - your AI can only read so much at once!"

**Content:**
- Context window = max text AI can see at once
- Typical sizes: 4K, 8K, 32K, 128K, 1M tokens
- What happens when you exceed it (truncation)
- Implications: summarize long docs, chat history limits

**Quiz:**
1. What is a context window?
   - A) The UI where you type messages
   - B) The maximum amount of text an LLM can see at once ✓
   - C) The response length limit
   - D) A scrolling text animation

2. What happens when you exceed the context limit?
   - A) The model crashes
   - B) It starts hallucinating more
   - C) The oldest text gets truncated ✓
   - D) It automatically upgrades

3. Why might a shorter context be better?
   - A) It's not - always better to have more
   - B) Faster and cheaper ✓
   - C) It improves accuracy
   - D) It reduces hallucinations

---

#### Level 3: The Gem (Tokens & Pricing)
**Story:** "Gems are precious - each token costs! Learn to use them wisely."

**Content:**
- Token = ~4 characters or 0.75 words
- Pricing: per 1M tokens
- Input vs output costs
- Rate limits

**Quiz:**
1. What is a "token" in LLM terms?
   - A) A special authentication key
   - B) A chunk of text (roughly 4 characters) ✓
   - C) A complete sentence
   - D) An API key

2. How are tokens usually counted?
   - A) By words (1 word = 1 token)
   - B) Roughly 0.75 words per token ✓
   - C) By characters
   - D) By sentences

3. Why do longer prompts cost more?
   - A) They don't
   - B) Because the model processes more tokens ✓
   - C) Only responses cost money
   - D) It's a fixed price

---

#### Level 4: The Transformer (Architecture)
**Story:** "The Transformer is the ancient spell that changed everything. Master its secrets!"

**Content:**
- Attention mechanism: what to focus on
- Self-attention: words relate to other words
- Why parallel processing is fast
- Encoder vs Decoder (brief mention)

**Quiz:**
1. What is the attention mechanism?
   - A) How the AI pays attention to user instructions
   - B) A way to identify important words in context ✓
   - C) The focus mode in training
   - D) A type of neural network layer

2. What can attention "attend" to?
   - A) Only the previous word
   - B) Any position in the input sequence ✓
   - C) Only user messages
   - D) External databases

3. Why are transformers efficient?
   - A) They use less memory than older models
   - B) They can process all words in parallel ✓
   - C) They don't need GPUs
   - D) They're smaller than RNNs

---

#### Level 5: The Embedding (Vector Space)
**Story:** "Everything exists as a point in the magical embedding space!"

**Content:**
- Words converted to number vectors
- Similar meanings = similar directions
- Enables semantic search
- Dimensions (typically 384-4096)

**Quiz:**
1. What is an embedding?
   - A) A type of API call
   - B) A list of numbers representing meaning ✓
   - C) A memory compression technique
   - D) A text format

2. Why do embeddings enable semantic search?
   - A) They're faster than text
   - B) Similar meanings have similar vectors ✓
   - C) They compress data
   - D) They're encrypted

3. What's the typical dimensionality of embeddings?
   - A) 1-10
   - B) 100
   - C) 384-4096 ✓
   - D) 1M+

---

#### Level 6: The Protocol (MCP)
**Story:** "MCP is the Universal Translator between your AI and the world!"

**Content:**
- MCP = Model Context Protocol
- Enables tool use
- Standardized communication
- Skills as capabilities

**Quiz:**
1. What does MCP stand for?
   - A) Multi-Component Processing
   - B) Model Context Protocol ✓
   - C) Memory Cache Protocol
   - D) Message Control Program

2. What can MCP enable for an LLM?
   - A) Only text generation
   - B) Calling external tools and APIs ✓
   - C) Reducing costs
   - D) Faster training

3. Why is MCP standardization valuable?
   - A) It's not important
   - B) It lets any AI use any tool consistently ✓
   - C) It's required by law
   - D) It reduces token usage

---

#### Level 7: The Master (Skills & Subagents)
**Story:** "A true wizard commands an army of assistants!"

**Content:**
- Skills: reusable capability definitions
- Subagents: delegate to specialized agents
- Orchestration patterns
- Use cases: parallel tasks, specialized expertise

**Quiz:**
1. What is a "skill" in agent frameworks?
   - A) A programming language
   - B) A reusable capability definition ✓
   - C) A type of model
   - D) An API endpoint

2. What are subagents used for?
   - A) Making the main agent faster
   - B) Delegating to specialized, smaller agents ✓
   - C) Storing conversation history
   - D) Reducing costs

3. What's the benefit of agent delegation?
   - A) It's more accurate
   - B) Parallel processing and specialized expertise ✓
   - C) It costs less
   - D) It requires no setup

---

#### Level 8: The Spellbook (Prompt Engineering)
**Story:** "A wizard's power lies in their words. Master the art of prompting!"

**Content:**
- Prompt structure: system + user
- Chain of thought: "think step by step"
- Few-shot: examples in prompt
- Clear instructions matter

**Quiz:**
1. What's the difference between system and user prompts?
   - A) They're the same
   - B) System sets behavior, user provides the task ✓
   - C) User is more important
   - D) System is hidden from users

2. What is "chain of thought" prompting?
   - A) Writing very long prompts
   - B) Asking the model to show its reasoning ✓
   - C) A specific prompting library
   - D) A type of token

3. What are "few-shot" examples?
   - A) Using the model only a few times
   - B) Including examples in the prompt ✓
   - C) A low-cost tier
   - D) Training with few data points

---

## Advanced Topics (8 More Levels)

These can be unlocked after completing core 8:

| # | Level | Topic |
|---|-------|-------|
| 9 | The Grimoire | Tool Use / Function Calling |
| 10 | The Library | RAG |
| 11 | The Cache | KV Cache |
| 12 | The Forge | Fine-tuning / RLHF |
| 13 | The Crystal Ball | Multimodal |
| 14 | The Ledger | Cost Optimization |
| 15 | The Shield | Security |
| 16 | The Compass | Evaluation |

---

## Gameplay Flow

1. **Welcome Screen**
   - Title: "LLM Quest: Become an AI Wizard"
   - Play button
   - "Learn the magic of LLMs, one spell at a time!"

2. **Level Screen**
   - Story intro (fun context)
   - Educational content
   - "Cast Your Spell" - Quiz (3 questions, multiple choice)
   - Must get all 3 correct to advance
   - "Try Again" shows if wrong (no punishment, just retry)

3. **Progress**
   - Saved in localStorage
   - Shows levels completed / total
   - Can replay any unlocked level

4. **Victory**
   - "You're now an AI Wizard!"
   - Summary of knowledge gained

---

## Technical Implementation

- **Single HTML file:** No build step
- **GitHub Pages:** Push to main, enable Pages
- **Responsive:** Works on mobile
- **localStorage:** Progress saved automatically

## Review Notes Addressed

✅ Prompt Engineering moved to core (Level 8)
✅ RAG in advanced (Level 10)
✅ Fine-tuning in advanced (Level 12)
✅ Reordered: KV cache moved to Level 11 (was too technical early)
✅ All quiz questions now have clear A/B/C/D options
✅ Difficulty: Easy → Medium → Advanced progression
