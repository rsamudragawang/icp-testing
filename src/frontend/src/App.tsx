import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('');
  const [response, setResponse] = useState(null);
  function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/greet?name=${name}`)
      .then(response => response.json()).then((json) => {
        setGreeting(json.greeting)
      });
  }

  function handleSubmitTitle(event: any) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const data = { title, description };
   fetch(`${import.meta.env.VITE_CANISTER_URL}/create`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   })
     .then((response) => response.json())
     .then((data) => {
       setResponse(data);
       console.log("Success:", data);
     })
     .catch((error) => {
       console.error("Error:", error);
     });
  }

  return (
    <main>
      <img src='/logo2.svg' alt='DFINITY logo' />
      <br />
      <br />
      <form action='#' onSubmit={handleSubmit}>
        <label htmlFor='name'>Enter your name: &nbsp;</label>
        <input id='name' alt='Name' type='text' />
        <button type='submit'>Click Me!</button>
      </form>
      <section id='greeting'>{greeting}</section>
      <form action='#' onSubmit={handleSubmitTitle}>
        <label htmlFor='name'>Enter your title: &nbsp;</label>
        <input id='title' alt='Title' type='text' />
        <input id='description' alt='Description' type='text' />

        <button type='submit'>Click Me!</button>
      </form>
      <section id=''></section>
    </main>
  );
}

export default App;
