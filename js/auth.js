// Authentication JavaScript functionality
class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupPasswordValidation();
        this.setupUserTypeToggle();
    }

    setupEventListeners() {
        // Password toggle functionality
        const passwordToggles = document.querySelectorAll('.password-toggle');
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePasswordVisibility(toggle);
            });
        });

        // Form submission
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Real-time password validation
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.validatePassword());
        }

        // Confirm password validation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', () => this.validatePasswordMatch());
        }
    }

    setupPasswordValidation() {
        const passwordInput = document.getElementById('password');
        if (!passwordInput) return;

        // Initial validation state
        this.validatePassword();
    }

    setupUserTypeToggle() {
        const userTypeSelect = document.getElementById('userType');
        const matricGroup = document.getElementById('matricGroup');
        const phoneGroup = document.getElementById('phoneGroup');

        if (!userTypeSelect) return;

        userTypeSelect.addEventListener('change', (e) => {
            const userType = e.target.value;
            
            // Show/hide matriculation number field for students
            if (matricGroup) {
                matricGroup.style.display = userType === 'student' ? 'block' : 'none';
                const matricInput = document.getElementById('matricNumber');
                if (matricInput) {
                    matricInput.required = userType === 'student';
                }
            }

            // Show/hide phone number field for alumni and external users
            if (phoneGroup) {
                phoneGroup.style.display = (userType === 'alumni' || userType === 'external') ? 'block' : 'none';
                const phoneInput = document.getElementById('phoneNumber');
                if (phoneInput) {
                    phoneInput.required = (userType === 'alumni' || userType === 'external');
                }
            }
        });
    }

    togglePasswordVisibility(toggle) {
        const input = toggle.parentElement.querySelector('input');
        const icon = toggle.querySelector('svg');
        
        if (input.type === 'password') {
            input.type = 'text';
            // Change to eye-slash icon
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88" />
            `;
        } else {
            input.type = 'password';
            // Change back to eye icon
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            `;
        }
    }

    validatePassword() {
        const passwordInput = document.getElementById('password');
        if (!passwordInput) return;

        const password = passwordInput.value;
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password)
        };

        // Update requirement indicators
        this.updateRequirement('length-req', requirements.length);
        this.updateRequirement('uppercase-req', requirements.uppercase);
        this.updateRequirement('number-req', requirements.number);

        // Validate password match if confirm password exists
        this.validatePasswordMatch();

        return Object.values(requirements).every(req => req);
    }

    updateRequirement(requirementId, isValid) {
        const requirement = document.getElementById(requirementId);
        if (!requirement) return;

        if (isValid) {
            requirement.classList.add('valid');
        } else {
            requirement.classList.remove('valid');
        }
    }

    validatePasswordMatch() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (!passwordInput || !confirmPasswordInput) return true;

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.classList.add('error');
            return false;
        } else {
            confirmPasswordInput.classList.remove('error');
            return true;
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('.btn-primary');
        const formData = new FormData(form);
        
        // Show loading state
        this.setLoadingState(submitButton, true);
        
        try {
            // Simulate API call
            await this.simulateApiCall();
            
            // Get form data
            const credentials = {
                username: formData.get('username'),
                password: formData.get('password'),
                rememberMe: formData.get('rememberMe') === 'on'
            };

            // Basic validation
            if (!this.validateLoginForm(credentials)) {
                throw new Error('Please fill in all required fields');
            }

            // Simulate successful login
            console.log('Login attempt:', credentials);
            this.showSuccessMessage('Login successful! Redirecting...');
            
            // In a real app, you would redirect to dashboard
            // window.location.href = '/dashboard';
            
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            this.setLoadingState(submitButton, false);
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('.btn-primary');
        const formData = new FormData(form);
        
        // Show loading state
        this.setLoadingState(submitButton, true);
        
        try {
            // Simulate API call
            await this.simulateApiCall();
            
            // Get form data
            const userData = {
                userType: formData.get('userType'),
                matricNumber: formData.get('matricNumber'),
                email: formData.get('email'),
                phoneNumber: formData.get('phoneNumber'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
                agreeTerms: formData.get('agreeTerms') === 'on'
            };

            // Validate form
            if (!this.validateSignupForm(userData)) {
                throw new Error('Please fill in all required fields correctly');
            }

            // Simulate successful signup
            console.log('Signup attempt:', userData);
            this.showSuccessMessage('Account created successfully! Please check your email for verification.');
            
            // In a real app, you would redirect to verification page
            // window.location.href = '/verify-email';
            
        } catch (error) {
            this.showErrorMessage(error.message);
        } finally {
            this.setLoadingState(submitButton, false);
        }
    }

    validateLoginForm(credentials) {
        return credentials.username && credentials.password;
    }

    validateSignupForm(userData) {
        // Check required fields
        if (!userData.userType || !userData.email || !userData.password) {
            return false;
        }

        // Check password requirements
        if (!this.validatePassword()) {
            return false;
        }

        // Check password match
        if (!this.validatePasswordMatch()) {
            return false;
        }

        // Check terms agreement
        if (!userData.agreeTerms) {
            return false;
        }

        // Check user type specific requirements
        if (userData.userType === 'student' && !userData.matricNumber) {
            return false;
        }

        if ((userData.userType === 'alumni' || userData.userType === 'external') && !userData.phoneNumber) {
            return false;
        }

        return true;
    }

    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    async simulateApiCall() {
        // Simulate network delay
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `auth-message auth-message-${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        if (type === 'success') {
            messageEl.style.backgroundColor = '#22c55e';
        } else {
            messageEl.style.backgroundColor = '#ef4444';
        }

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to page
        document.body.appendChild(messageEl);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => messageEl.remove(), 300);
            }
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
