// Function to scroll smoothly to the selected section
function scrollToSection(sectionId) {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => button.classList.remove('active'));
  
    const activeButton = document.getElementById(`btn-${sectionId}`);
    activeButton.classList.add('active');
  
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
  
    
      // Function to update active button based on scroll position
      function updateActiveButton() {
        const sections = document.querySelectorAll('.green-section, .yellow-section, .red-section');
        const buttons = {
          'introduction': document.getElementById('btn-introduction'),
          'education': document.getElementById('btn-education'),
          'projects': document.getElementById('btn-projects'),
          'tools': document.getElementById('btn-tools')
        };
    
        let activeButton = null;
    
        // Check each section to see which is currently in view
        sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
    
          // Check if the section is currently in view
          if (sectionTop < window.innerHeight && sectionTop >= 0) {
            activeButton = buttons[section.id];
          }
        });
    
        // Remove active class from all buttons and add to the active one
        for (const button of Object.values(buttons)) {
          button.classList.remove('active');
        }
        if (activeButton) {
          activeButton.classList.add('active');
        }
      }
    
      // Use Intersection Observer for better performance and real-time updates
      const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
      };
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When the section is in view, update the active button
            const activeButton = document.getElementById(`btn-${entry.target.id}`);
            const buttons = document.querySelectorAll('.buttons button');
    
            buttons.forEach(button => button.classList.remove('active')); // Remove active from all buttons
            if (activeButton) {
              activeButton.classList.add('active'); // Add active to the visible section's button
            }
          }
        });
      }, options);
    
      // Observe each section
      document.querySelectorAll('.green-section, .yellow-section, .red-section').forEach(section => {
        observer.observe(section);
      });