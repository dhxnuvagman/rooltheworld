
const btn = document.getElementById("btn");
btn.addEventListener('click',getRes);
async function getRes() {
  const Text = document.getElementById("input").value;

  if (Text === '') {
    return;
  }

  const parentDiv = document.getElementById("chat-area");
  const question = document.createElement('div');
  question.innerHTML =Text;
  question.classList.add("box");
    parentDiv.appendChild(question);
  document.getElementById("input").value = '';
  try {
    const apiKey = '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';
    const model = 'text-davinci-003';
    const res = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        prompt: Text,
        max_tokens: 150
      })
    });

    const data = await res.json();

    if (data.choices && data.choices.length > 0) {
      const answer = document.createElement('div');
      answer.innerHTML = data.choices[0].text;
      answer.classList.add("box", "answer");
      parentDiv.appendChild(answer);
    } else {
      console.error('Invalid response from OpenAI API:', data);
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}
