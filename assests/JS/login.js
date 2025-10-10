function signupForm() {
    // document.getElementById("formContainer").innerHTML = signup;
    let signup = `<form id="customForm" class="row g-3 needs-validation"  novalidate autocomplete="off" style=" background-color:rgb(99, 109, 114); margin-top:20px; padding:20px; border:1px solid black; border-radius:10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" >
      
      <!-- Name -->
      <div class="col-md-6">
        <label for="yourName" class="form-label">Your Name</label>
        <input type="text" class="form-control" id="yourName" name="yourName" required  placeholder="Enter your name">
        <div class="invalid-feedback" id="nameError"  class="text-danger";>Please enter your name </div>
      </div>
        <!-- Email -->
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input type="text" class="form-control" id="email" name="email" required placeholder="Enter your email">
        <div class="invalid-feedback" class="text-danger">Please enter a valid email</div>
      </div>

      <!-- password -->
      <div class="col-md-6">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" required placeholder="Enter password">
        <div class="invalid-feedback" id="passwordError"  class="text-danger">Please enter your password</div>
      </div>
      <!-- re-password -->
      <div class="col-md-6">
        <label for="repassword" class="form-label">Re-enter Password</label>
        <input type="password" class="form-control" id="repassword" name="repassword" required placeholder="Re-enter password">
        <div class="invalid-feedback" id="repasswordError"  class="text-danger">Passwords do not match</div>
      </div>
           <!-- Button -->
      <div class="col-12 d-grid justify-content-center">
        <button class="btn btn-dark "  type="submit">   Save    </button>
      </div>
    </form>`;
    
    document.getElementById('signupFormContainer').innerHTML=signup;
}




function loginForm() {
    
    let login = `<form id="customForm" class="row g-3 needs-validation"  novalidate autocomplete="off" style=" background-color:rgb(99, 109, 114); margin-top:20px; padding:20px; border:1px solid black; border-radius:10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" >
      
        <!-- Email -->
      <div class="col-md-6 justify-content-center">
        <label for="email" class="form-label">Email</label>
        <input type="text" class="form-control" id="email" name="email" required placeholder="Enter your email">
        <div class="invalid-feedback" class="text-danger">Please enter a valid email</div>

       
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" required placeholder="Enter password">
        <div class="invalid-feedback" id="passwordError"  class="text-danger">Please enter your password</div>
    
      </div>

     
           <!-- Button -->
      <div class="col-12 d-grid justify-content-center">
        <button class="btn btn-dark "  type="submit">   Save    </button>
      </div>
    </form>`;

    document.getElementById("loginFormContainer").innerHTML = login;
}
