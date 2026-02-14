const DEMO_IMAGE_DESCRIPTION = `This educational diagram shows the water cycle, a continuous process by which water circulates through the Earth's systems.

**Key Elements Identified:**
1. **Evaporation** - Water from oceans, lakes, and rivers transforms into water vapor due to solar heating (shown with upward arrows from water bodies)
2. **Condensation** - Water vapor cools and forms clouds in the atmosphere (illustrated by cloud formations at the top)
3. **Precipitation** - Water falls back to Earth as rain, snow, or hail (depicted by downward arrows from clouds)
4. **Collection** - Water gathers in oceans, rivers, and underground aquifers (shown at the base of the diagram)
5. **Transpiration** - Plants release water vapor into the atmosphere (indicated by arrows from vegetation)

**Accessibility Notes:**
- The diagram uses a circular flow pattern moving clockwise
- Blue arrows indicate water movement
- The sun is positioned in the upper right corner
- Terrain includes mountains, forests, and an ocean
- Labels are placed adjacent to each process with connecting lines`;

const DEMO_ADHD_SUMMARY = `## Key Points

- **Main Idea**: Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen
- **Where it happens**: In the chloroplasts of plant cells, specifically using chlorophyll pigments
- **Chemical equation**: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

## Quick Summary

1. Plants absorb **sunlight** through their leaves
2. They take in **carbon dioxide** from the air through stomata
3. **Water** travels up from the roots
4. These combine in chloroplasts to make **glucose** (food) and release **oxygen**

## Why It Matters

- Produces the **oxygen** we breathe
- Forms the **base of food chains** for nearly all life on Earth
- Removes **CO₂** from the atmosphere, helping regulate climate

## Key Terms

| Term | Definition |
|------|-----------|
| **Chlorophyll** | Green pigment that captures light energy |
| **Stomata** | Tiny pores on leaves for gas exchange |
| **Glucose** | Sugar produced as plant food |
| **Chloroplast** | Cell organelle where photosynthesis occurs |`;

const DEMO_CAPTION_SUMMARY = `## Lecture Summary: Introduction to Machine Learning

**Key Topics Covered:**
- Definition of machine learning as a subset of artificial intelligence
- Three main types: supervised, unsupervised, and reinforcement learning
- Real-world applications including image recognition, natural language processing, and recommendation systems

**Important Concepts:**
1. Training data is essential for model accuracy
2. Overfitting occurs when a model memorizes rather than generalizes
3. Cross-validation helps evaluate model performance

**Action Items:**
- Review Chapter 3 on supervised learning algorithms
- Complete the Python lab assignment by next Tuesday
- Form study groups for the midterm project`;

export async function describeImage(base64Image: string, apiKey?: string): Promise<string> {
  if (!apiKey) return DEMO_IMAGE_DESCRIPTION;

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "describe-image",
      image: base64Image,
      apiKey,
    }),
  });

  if (!response.ok) throw new Error("Failed to describe image");
  const data = await response.json();
  return data.result;
}

export async function summarizeForADHD(text: string, apiKey?: string): Promise<string> {
  if (!apiKey) return DEMO_ADHD_SUMMARY;

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "adhd-summary",
      text,
      apiKey,
    }),
  });

  if (!response.ok) throw new Error("Failed to summarize text");
  const data = await response.json();
  return data.result;
}

export async function summarizeLecture(transcript: string, apiKey?: string): Promise<string> {
  if (!apiKey) return DEMO_CAPTION_SUMMARY;

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "lecture-summary",
      text: transcript,
      apiKey,
    }),
  });

  if (!response.ok) throw new Error("Failed to summarize lecture");
  const data = await response.json();
  return data.result;
}
