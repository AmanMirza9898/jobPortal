import React, { useState } from 'react';

const LazyImage = ({ src, alt, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton Placeholder (visible until image loads) */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md w-full h-full" />
            )}

            {/* The Image */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                {...props}
            />
        </div>
    );
};

export default LazyImage;
