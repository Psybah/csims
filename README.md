# CSIMS - University Registry & Records System

A modern, secure authentication system for university document management and verification.

## Features

### Authentication Pages
- **Split-screen design** with form on left, illustration on right
- **Login page** with username/email and password
- **Signup page** with role-based registration (Student, Alumni, External User, Third-Party Verifier)
- **Real-time form validation** with password strength indicators
- **Responsive design** that works on all devices
- **Accessibility compliant** (WCAG 2.1 AA standards)

### Design System
- **Typography**: Aeonik font family
- **Icons**: Heroicons SVG icons
- **Color Palette**: Professional blue and gray scheme
- **Consistent spacing** and component styling
- **Smooth animations** and transitions

## File Structure

```
csims-auth/
├── index.html              # Login page
├── signup.html             # Registration page
├── styles/
│   └── main.css            # Main stylesheet
├── js/
│   └── auth.js             # Authentication functionality
└── README.md               # This file
```

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser to view the login page
3. **Open `signup.html`** to view the registration page
4. **Customize** the placeholder illustrations and content as needed

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features Implemented

### Login Page (`index.html`)
- Username/email input with icon
- Password input with show/hide toggle
- Remember me checkbox
- Forgot password link
- Form validation and error handling
- Loading states during submission

### Signup Page (`signup.html`)
- Account type selection (Student, Alumni, External, Verifier)
- Dynamic form fields based on user type:
  - Students: Matriculation number required
  - Alumni/External: Phone number required
- Email and password inputs
- Password strength validation with visual indicators
- Confirm password matching
- Terms of service agreement
- Real-time form validation

### Responsive Design
- **Desktop**: Full split-screen layout
- **Tablet**: Stacked layout with adjusted proportions
- **Mobile**: Single column with optimized spacing
- **Touch-friendly** buttons and inputs

### Accessibility
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** mode support
- **Focus indicators** for all interactive elements
- **Semantic HTML** structure

## Customization

### Colors
Edit the CSS custom properties in `styles/main.css`:

```css
:root {
    --primary-500: #0ea5e9;  /* Main brand color */
    --primary-600: #0284c7;  /* Hover states */
    --gray-900: #0f172a;     /* Text color */
    /* ... more color variables */
}
```

### Typography
The Aeonik font is loaded from Google Fonts. To change:

1. Update the font import in HTML files
2. Modify the `--font-family` variable in CSS

### Icons
All icons use Heroicons. To change icons:

1. Visit [heroicons.com](https://heroicons.com)
2. Copy the SVG code
3. Replace the icon in the HTML

## Integration Notes

This is a frontend-only implementation. For production use, you'll need to:

1. **Backend API** for authentication
2. **Database** for user storage
3. **Email service** for verification
4. **Security measures** (rate limiting, CSRF protection)
5. **SSL certificate** for HTTPS

## User Stories Addressed

Based on the CSIMS user stories, this implementation covers:

- **US-001**: Student registration with matriculation number
- **US-002**: Alumni/External registration with email/phone
- **US-003**: 2FA preparation (UI ready for backend integration)
- **US-014**: Role-based access control foundation
- **US-034**: WCAG 2.1 AA accessibility compliance

## Next Steps

1. **Add illustrations** to replace placeholders
2. **Integrate with backend** authentication API
3. **Add 2FA** implementation
4. **Implement password reset** flow
5. **Add email verification** process
6. **Connect to user dashboard** after login

## License

This project is part of the CSIMS University Registry & Records System.
