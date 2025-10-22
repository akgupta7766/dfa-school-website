// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.full-gallery .gallery-item');
    
    console.log('Filter buttons:', filterButtons.length);
    console.log('Gallery items:', galleryItems.length);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            console.log('Filter clicked:', filterValue);
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== LIGHTBOX FUNCTIONALITY =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    const images = [];
    
    console.log('Lightbox elements:', {
        lightbox: !!lightbox,
        lightboxImage: !!lightboxImage,
        lightboxClose: !!lightboxClose,
        galleryItems: galleryItems.length
    });
    
    // Collect all images for lightbox
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h3')?.textContent || 'School Image';
        const description = item.querySelector('.gallery-overlay p')?.textContent || '';
        
        console.log(`Image ${index}:`, img ? img.src : 'No image found');
        
        if (img && img.src) {
            images.push({
                src: img.src,
                title: title,
                description: description,
                index: index
            });
            
            // Add click event to each gallery item
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Gallery item clicked:', index);
                currentImageIndex = index;
                openLightbox(currentImageIndex);
            });
        }
    });
    
    // Open lightbox function
    function openLightbox(index) {
        if (images[index]) {
            console.log('Opening lightbox with image:', images[index].src);
            lightboxImage.src = images[index].src;
            lightboxCaption.textContent = images[index].title;
            currentImageIndex = index;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close lightbox function
    function closeLightbox() {
        console.log('Closing lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }
    
    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    // Close lightbox when clicking on background
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
    
    console.log('Lightbox setup complete. Total images:', images.length);
});