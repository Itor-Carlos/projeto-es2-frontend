export const handleCarouselScroll = () => {
    const carousel = document.querySelector('.carousel');
    
    if (carousel) {
        carousel.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                carousel.scrollLeft += e.deltaY;
            }
        });
    }
};