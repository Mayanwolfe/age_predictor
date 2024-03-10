async function getPredictedAge() {
  const name = document.getElementById('name').value.trim();
  const country = document.getElementById('country').value.trim().toUpperCase();
  let apiUrl = `https://api.agify.io/?name=${name}`;

  if (country) {
    apiUrl += `&country_id=${country}`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const resultDiv = document.getElementById('result');
    if (data.age) {
      resultDiv.innerText = `Predicted Age for ${data.name}${country ? ` from ${country}` : ''}: ${data.age}`;
      askUserAgeComparison(); // Ask the user if they are younger, older, or the same age
    } else {
      resultDiv.innerText = 'Age prediction not available.';
    }
  } catch (error) {
    console.error('Error fetching the age data:', error);
    document.getElementById('result').innerText = 'Failed to retrieve age prediction.';
  }
}

function askUserAgeComparison() {
  const questionDiv = document.createElement('div');
  questionDiv.innerText = 'Are you younger, older, or the same age as the prediction?';
  const buttons = ['Younger', 'Older', 'Same Age'].map(ageRelation => {
    const button = document.createElement('button');
    button.innerText = ageRelation;
    button.onclick = () => displayJoke(ageRelation.toLowerCase());
    return button;
  });
  buttons.forEach(button => questionDiv.appendChild(button));
  document.getElementById('result').appendChild(questionDiv);
}

function displayJoke(relation) {
  let joke = '';
  switch (relation) {
    case 'younger':
      joke = 'Hey, it would have been right if you lived on the planet Venus!';
      break;
    case 'older':
      joke = "You got the high score, so you win!";
      break;
    case 'same age':
      joke = "Spot on! That means that the data is always correct and never ever wrong!";
      break;
  }

  const jokeDiv = document.getElementById('joke') || document.createElement('div');
  jokeDiv.id = 'joke';
  jokeDiv.innerText = joke;
  if (!document.getElementById('joke')) {
    document.getElementById('result').appendChild(jokeDiv);
  }
}

function resetForm() {
  document.getElementById('name').value = ''; // Clear the name input field
  document.getElementById('country').value = ''; // Clear the country input field

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // Remove any text from the result div

  // Optionally, if you want to remove the question and joke sections entirely, you can do this:
  // while (resultDiv.firstChild) {
  //   resultDiv.removeChild(resultDiv.firstChild);
  // }
}