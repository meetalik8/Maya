export const sendMessage = async (question: string) => {
  try {
    const response = await fetch(
      "https://ef76-210-16-113-152.ngrok-free.app/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch response from the server");
    }

    const data = await response.json();

    if (data && data.response) {
      console.log(data.response); 
      return data.response;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};
