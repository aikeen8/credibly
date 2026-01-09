require('dotenv').config();
const apiKey = process.env.GEMINI_API_KEY;

console.log("Testing API Key:", apiKey ? apiKey.substring(0, 10) + "..." : "NONE");

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
        console.error("❌ ERROR FROM GOOGLE:", data.error.message);
    } else if (data.models) {
        console.log("✅ SUCCESS! Here are your available models:");
        // Filter lang natin yung mga "generateContent" models
        const available = data.models
            .filter(m => m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name);
        console.log(available);
    } else {
        console.log("⚠️ No models found. Check your project settings.");
        console.log(data);
    }
  } catch (error) {
    console.error("❌ NETWORK ERROR:", error);
  }
}

listModels();