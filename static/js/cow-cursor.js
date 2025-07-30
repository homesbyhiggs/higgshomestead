// Animal Emoji Fireworks for Higgs Homestead
class AnimalEmojiFireworks {
    constructor() {
        this.animals = ['🐄', '🐴', '🐓', '🐔', '🐣'];
        this.init();
    }

    init() {
        this.addStyles();
        this.addEventListeners();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .emoji-firework {
                position: fixed;
                pointer-events: none;
                user-select: none;
                z-index: 99999;
                font-size: 28px;
                animation: fireworkArc ease-out forwards;
                overflow: visible !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            @keyframes fireworkArc {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 1;
                }
                30% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(90deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0.8) rotate(180deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        const selectors = [
            '.nav-book-btn',
            '.banner-cta-button',
            '.listing-book-btn',
            '.content-button',
            'a[href*="book.higgshomestead.com"]'
        ];

        document.addEventListener('click', (e) => {
            if (selectors.some(selector => e.target.matches(selector))) {
                e.preventDefault(); // Stop the immediate navigation

                const originalHref = e.target.href;
                const target = e.target.target || '_self';

                // Start the fireworks from click point
                this.createFireworks(e.clientX, e.clientY);

                // Navigate after seeing the effect
                setTimeout(() => {
                    if (target === '_blank') {
                        window.open(originalHref, '_blank');
                    } else {
                        window.location.href = originalHref;
                    }
                }, 600); // Shorter delay since it's just one explosion
            }
        });
    }

    createFireworks(clickX, clickY) {
        console.log('createFireworks called with:', clickX, clickY);
        // Create a single large explosion at click point
        this.explodeAt(clickX, clickY);
    }

    explodeAt(x, y) {
        const particleCount = 8; // More particles for better effect

        for (let i = 0; i < particleCount; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'emoji-firework';
            emoji.textContent = this.animals[Math.floor(Math.random() * this.animals.length)];

            // Calculate upward arc trajectory (45° to 135° for wider spread)
            const minAngle = Math.PI * (45 / 180);  // 45 degrees
            const maxAngle = Math.PI * (135 / 180); // 135 degrees

            // Distribute angles evenly in the upward range
            const angle = minAngle + (i / (particleCount - 1)) * (maxAngle - minAngle);

            // MUCH higher velocity for dramatic effect
            const velocity = Math.random() * 150 + 250; // 250-400px velocity!
            const timeToFall = 2.5; // Longer time for bigger arcs

            // Calculate arc trajectory with much larger distances
            const horizontalDistance = Math.cos(angle) * velocity;
            const verticalLift = Math.sin(angle) * velocity;
            const gravity = 300; // Stronger gravity for longer arcs

            const finalX = x + horizontalDistance;
            const finalY = y - verticalLift + gravity;

            // Append to body first to ensure it's not constrained
            document.body.appendChild(emoji);

            // Set initial position exactly at click point
            emoji.style.left = x + 'px';
            emoji.style.top = y + 'px';
            emoji.style.animationDuration = timeToFall + 's';
            emoji.style.animationDelay = (i * 0.08) + 's'; // Slightly more stagger

            // More dramatic easing for firework effect
            emoji.style.transition = `left ${timeToFall}s cubic-bezier(0.17, 0.67, 0.35, 1), top ${timeToFall}s cubic-bezier(0.17, 0.67, 0.35, 1)`;

            // Trigger the arc movement immediately
            setTimeout(() => {
                emoji.style.left = finalX + 'px';
                emoji.style.top = finalY + 'px';
            }, 20);

            // Remove after animation completes
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, (timeToFall + 0.5) * 1000);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing fireworks...');
    const fireworks = new AnimalEmojiFireworks();
    console.log('Fireworks initialized:', fireworks);
});