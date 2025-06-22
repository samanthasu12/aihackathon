export const GROQ_API_KEY = "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";

export async function recordAndTranscribe(): Promise<string> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    return await new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", blob, "voice.wav");
        formData.append("model", "whisper-large-v3");

        try {
          const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
            },
            body: formData,
          });

          const data = await res.json();
          resolve(data.text || "");
        } catch (err) {
          console.error("Transcription failed:", err);
          reject("");
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // Auto-stop
    });
  } catch (err) {
    console.error("Mic error:", err);
    return "";
  }
}
