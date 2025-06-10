# ShadowCoding Portfolio Website

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. This website showcases professional skills, projects, and provides a contact interface.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional design with smooth animations
- **Interactive Elements**: 
  - Animated skill gauges with water-like effects
  - Smooth scrolling navigation
  - Interactive project cards
- **Performance Optimized**: Built with vanilla technologies for optimal performance
- **Cross-browser Compatible**: Works across all modern browsers

## 🛠️ Technical Stack

- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: 
  - Flexbox and Grid for layouts
  - CSS Variables for consistent theming
  - CSS Animations and Transitions
  - Media Queries for responsive design
- **JavaScript (ES6+)**:
  - Intersection Observer API for scroll animations
  - DOM manipulation
  - Event handling
  - Dynamic content loading

## 📁 Project Structure

```
shadowcoding/
├── index.html              # Home page
├── portfolio.html          # Portfolio page
├── contact.html            # Contact page
├── projects                # Contains projects
├── assets/
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── js/
│   │   └── script.js      # Main JavaScript file
│   └── images/            # Image assets
└── README.md              # Documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Basic understanding of HTML, CSS, and JavaScript (for development)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/xShadowCodingx/xShadowCodingx.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd xShadowCodingx.github.io
   ```

3. Open `index.html` in your browser or use a local development server.

### Deployment

This website is automatically deployed using GitHub Pages. Any push to the master branch will trigger a new deployment.

## 🎨 Customization

### Colors and Theme

The website uses CSS variables for easy customization. Main colors are defined in `styles.css`:

```css
:root {
    --primary-color: #333;
    --secondary-color: #666;
    --accent-color: #4a90e2;
    --background-color: #fff;
    --text-color: #333;
}
```

### Adding New Projects

To add a new project to the portfolio:

1. Add project images to `assets/images/`
2. Update `portfolio.html` with new project details
3. Follow the existing project card structure:
   ```html
   <div class="project-card">
       <img src="assets/images/your-project.jpg" alt="Project Name">
       <h3>Project Name</h3>
       <p>Project description</p>
       <div class="tech-stack">
           <span>HTML</span>
           <span>CSS</span>
           <span>JavaScript</span>
       </div>
       <a href="project-link" class="btn" target="_blank">View Project</a>
   </div>
   ```

## 📱 Responsive Design

The website is built with a mobile-first approach and includes breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## 🔧 Performance Optimizations

- Optimized images for web
- Minified CSS and JavaScript
- Lazy loading for images
- Efficient CSS selectors
- Minimal DOM manipulation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

- GitHub: [@xShadowCodingx](https://github.com/xShadowCodingx)
- Portfolio: [xShadowCodingx.github.io](https://xShadowCodingx.github.io)

## 🙏 Acknowledgments

- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Inspiration from modern web design trends 