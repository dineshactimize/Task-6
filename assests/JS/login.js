signup();
function signup(){
  const signupform = document.getElementById("data");
  signupform.innerHTML = `
  <div class="container">
    <form id="customForm" class="needs-validation mx-auto" novalidate autocomplete="off" style="max-width:480px; background-color:rgb(99, 109, 114); margin:20px auto; padding:20px; border:1px solid #222; border-radius:10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div class="mb-3">
        <label for="yourName" class="form-label">Your Name</label>
        <input type="text" class="form-control" id="yourName" name="yourName" placeholder="Enter your name">
        <div class="invalid-feedback" id="nameError">Please enter your name</div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
        <div class="invalid-feedback" id="emailError">Please enter a valid email</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Enter password">
        <div class="invalid-feedback" id="passwordError">Please enter your password</div>
      </div>

      <div class="mb-3">
        <label for="repassword" class="form-label">Re-enter Password</label>
        <input type="password" class="form-control" id="repassword" name="repassword" placeholder="Re-enter password">
        <div class="invalid-feedback" id="repasswordError">Passwords do not match</div>
      </div>

      <div class="d-grid">
        
        <div style="padding-left: 45%;">
    
          <a  class="btn btn-primary" onclick="login()">Login</a> 
         <button class="btn btn-dark" type="button"  onclick="signup2()">Save</button>
        </div>
        
        
      </div>
    </form>
    </div>`;
}


function login(){
  const loginform = document.getElementById("data");
  loginform.innerHTML = `
  <div class="container">
    <form id="customForm" class="needs-validation mx-auto" novalidate autocomplete="off" style="max-width:480px; background-color:rgb(99, 109, 114); margin:20px auto; padding:20px; border:1px solid #222; border-radius:10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
        <div class="invalid-feedback" id="emailError">Please enter a valid email</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Enter password">
        <div class="invalid-feedback" id="passwordError">Please enter your password</div>
      </div>

      <div class="d-grid">
       
         <div style="padding-left: 45%;">
         <button class="btn btn-dark" type="button" onclick="login2()">Save</button>
            <a  class="btn btn-primary" onclick="signup()">Signup</a>
         </div>
    </form>
    </div>`;
}

function signup2(){
  const form = document.getElementById('customForm');
  if (!form) return;

  // Helper to clear previous validation states
  function clearValidation() {
    form.querySelectorAll('.is-invalid, .is-valid').forEach(el => el.classList.remove('is-invalid','is-valid'));
    ['nameError','emailError','passwordError','repasswordError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = el.dataset ? el.dataset.default || el.textContent : el.textContent;
    });
  }

  clearValidation();

  // Read fields
  const nameInput = form.querySelector('#yourName');
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const repasswordInput = form.querySelector('#repassword');

  // Validate name
  if (!nameInput || !nameInput.value.trim()) {
    nameInput?.classList.add('is-invalid');
    document.getElementById('nameError').textContent = 'Please enter your name';
    return;
  }
  if (/\d/.test(nameInput.value)) {
    nameInput.classList.add('is-invalid');
    document.getElementById('nameError').textContent = 'Name should not contain numbers';
    return;
  }
  if (nameInput.value.length < 3) {
    nameInput.classList.add('is-invalid');
    document.getElementById('nameError').textContent = 'Name must be at least 3 characters long';
    return;
  }
  nameInput.classList.add('is-valid');

  // Email
  const emailValue = emailInput?.value.trim() || '';
  const emailPattern = /^[^\s@]+@[a-zA-Z]+\.(com|in)$/;
  if (!emailPattern.test(emailValue)) {
    emailInput?.classList.add('is-invalid');
    document.getElementById('emailError').textContent = 'Please enter a valid email (example@domain.com)';
    return;
  }
  emailInput.classList.add('is-valid');

  // Password
  if (!passwordInput?.value) {
    passwordInput?.classList.add('is-invalid');
    document.getElementById('passwordError').textContent = 'Please enter your password';
    return;
  }
  if (passwordInput.value.length < 6) {
    passwordInput.classList.add('is-invalid');
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
    return;
  }
  if (!/[A-Z]/.test(passwordInput.value) || !/[a-z]/.test(passwordInput.value) || !/[0-9]/.test(passwordInput.value)) {
    passwordInput.classList.add('is-invalid');
    document.getElementById('passwordError').textContent = 'Password must have upper, lower and a digit';
    return;
  }

  // Confirm
  if (!repasswordInput?.value || repasswordInput.value !== passwordInput.value) {
    repasswordInput?.classList.add('is-invalid');
    document.getElementById('repasswordError').textContent = 'Passwords do not match';
    return;
  }

  // All good
  passwordInput.classList.add('is-valid');
  repasswordInput.classList.add('is-valid');
  form.classList.add('was-validated');
  const modal = new bootstrap.Modal(document.getElementById('modall'));
  modal.show();
}

function login2(){
  const form = document.getElementById('customForm');
  if (!form) return;

  // clear previous
  form.querySelectorAll('.is-invalid, .is-valid').forEach(el => el.classList.remove('is-invalid','is-valid'));

  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');

  const emailValue = (emailInput?.value || '').trim();
  const emailPattern = /^[^\s@]+@[a-zA-Z]+\.(com|in)$/;
  if (!emailPattern.test(emailValue)){
    emailInput?.classList.add('is-invalid');
    document.getElementById('emailError').textContent = 'Please enter a valid email';
    return;
  }
  emailInput.classList.add('is-valid');

  if (!passwordInput?.value){
    passwordInput?.classList.add('is-invalid');
    document.getElementById('passwordError').textContent = 'Please enter your password';
    return;
  }
  if (passwordInput.value.length < 6){
    passwordInput.classList.add('is-invalid');
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
    return;
  }
  passwordInput.classList.add('is-valid');

  form.classList.add('was-validated');
  const modal = new bootstrap.Modal(document.getElementById('modall'));
  modal.show();
}

// script.js

// To access the stars
let stars = 
    document.getElementsByClassName("star");
let output = 
    document.getElementById("output");

// Funtion to update rating
function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}
// To remove the pre-applied styling
function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}