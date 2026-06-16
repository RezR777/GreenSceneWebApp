export const sendMessage = async (req, res) => {

    const { message } = req.body;

    res.json({
        success: true,
        userMessage: message,
        botResponse:
            "Hello! I am Scrappy-AI. How can I help you find campus events today?"
    });

};

export const getChatHistory = async (req, res) => {

    res.json({
        success: true,
        messages: []
    });

};
