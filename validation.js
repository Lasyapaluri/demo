
        const form = document.getElementById('myForm');
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');

        form.addEventListener('submit', function(event) {
            // Prevent form submission
            event.preventDefault();
            
            // Reset error messages
            usernameError.textContent = '';
            emailError.textContent = '';

            // Validate username
            if (usernameInput.value.trim() === '') {
                usernameError.textContent = 'Username is required';
                return;
            }

            // Validate email
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                return;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    emailError.textContent = 'Invalid email format';
                    return;
                }
            }

            // If validation passes, submit the form
            form.submit();
        });
   
