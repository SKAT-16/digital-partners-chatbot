<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once "./prompt.php";
include_once "./config.php";

// Function to send a query to OpenAI ChatGPT
function askChatGPT($userQuery)
{
    global $OPENAI_API_KEY;
    $apiKey = $OPENAI_API_KEY;
    $url = "https://api.openai.com/v1/chat/completions";

    // Load the chatbot prompt
    $prompt = CHATBOT_PROMPT;

    // Structure the full AI request
    $data = [
        "model" => "gpt-3.5-turbo",  // Change to "gpt-3.5-turbo" if you want a cheaper model
        "messages" => [
            ["role" => "system", "content" => $prompt],
            ["role" => "user", "content" => $userQuery]
        ],
        "temperature" => 0.7
    ];

    $options = [
        "http" => [
            "header"  => "Content-Type: application/json\r\nAuthorization: Bearer $apiKey",
            "method"  => "POST",
            "content" => json_encode($data)
        ]
    ];

    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result, true);

    $rawResponse = $response['choices'][0]['message']['content'] ?? "Sorry, I couldn't find relevant information.";

    // ✅ Remove unwanted markdown/code block formatting
    $cleanResponse = preg_replace('/^```html\s*/', '', $rawResponse);
    $cleanResponse = preg_replace('/\s*```$/', '', $cleanResponse);

    // ✅ Return cleaned response
    return json_encode(["response" => $cleanResponse]);
}

// Handle POST requests from frontend
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $userQuery = $_POST["query"] ?? "";
    echo askChatGPT($userQuery);
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
