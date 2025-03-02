<?php
header("Content-Type: application/json");
include_once "prompt.php";
include_once 'config.php';

// Function to send a query to Gemini AI
function askGemini($userQuery)
{
    global $GEMINI_API_KEY;
    $apiKey = $GEMINI_API_KEY;
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$apiKey";

    // Load the chatbot prompt
    $prompt = CHATBOT_PROMPT;

    // Structure the full AI request
    $fullPrompt = "$prompt\n\nUser Query: $userQuery\nAI Response:";

    $data = [
        "contents" => [
            ["role" => "user", "parts" => [["text" => $fullPrompt]]]
        ]
    ];

    $options = [
        "http" => [
            "header"  => "Content-Type: application/json",
            "method"  => "POST",
            "content" => json_encode($data)
        ]
    ];

    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result, true);

    $rawResponse = $response['candidates'][0]['content']['parts'][0]['text'] ?? "Sorry, I couldn't find relevant information.";

    // ✅ Remove unwanted markdown/code block formatting
    $cleanResponse = preg_replace('/^```html\s*/', '', $rawResponse);
    $cleanResponse = preg_replace('/\s*```$/', '', $cleanResponse);

    // ✅ Return cleaned response
    return json_encode(["response" => $cleanResponse]);
}

// Handle POST requests from frontend
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $userQuery = $_POST["query"] ?? "";
    echo askGemini($userQuery);
} else {
    echo json_encode(["error" => "Invalid request"]);
}
