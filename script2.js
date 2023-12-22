
const btn = document.getElementById("btn");
btn.addEventListener('click',getRes);
async function getRes() {
  var Text = document.getElementById("input").value;
  const parentDiv = document.getElementById("chat-area");
  if (Text === '') {
    Text = "remember Your name is matrix ai and your role is financial advisor";
  } else {
    const question = document.createElement('div');
    question.innerHTML = Text;
    question.classList.add("box");
    parentDiv.appendChild(question);
  }
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
