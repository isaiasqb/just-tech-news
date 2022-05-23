//HANDLING REQUEST FOR LOG-IN
async function loginFormHandler(event) {
  event.preventDefault();
  // grabbing the data from the form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    //error handling & checking reponse status
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}



// HANDLING REQUEST FOR SIGN-UP
async function signupFormHandler(event) {
  event.preventDefault();

  // grabbing the data from the form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // POST the username, email, and password from the form to our server via: /api/users
  if(username && email && password) {
    //assign the result of the promise to a variable. "reponse"
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' } 
    });
    //error handling & checking reponse status
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

// listener for the submit event in the log in page

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
