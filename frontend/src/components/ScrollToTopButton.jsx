import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50 transition-opacity duration-300">
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    className="rounded-full w-12 h-12 bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6" />
                </Button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
