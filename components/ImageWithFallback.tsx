import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    alt,
    className,
    fallbackText,
    ...props
}) => {
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);

    useEffect(() => {
        if (!src) {
            setError(true);
            return;
        }

        // Handle relative paths from backend
        let finalSrc = src;
        if (src.startsWith('/uploads')) {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            // Remove /api if it exists in the base URL to avoid double /api/assets if the user configured it that way, 
            // but usually VITE_API_URL is http://localhost:5000/api. 
            // However, static files are served from root http://localhost:5000/.
            // So we need the origin.

            try {
                const url = new URL(apiUrl);
                finalSrc = `${url.origin}${src}`;
            } catch (e) {
                finalSrc = `http://localhost:5000${src}`;
            }
        }

        setImgSrc(finalSrc);
        setError(false);
    }, [src]);

    if (error || !imgSrc) {
        return (
            <div className={`flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-medium ${className}`} {...props}>
                {fallbackText || alt || 'No Image'}
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
};

export default ImageWithFallback;
