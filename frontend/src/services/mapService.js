export const openGoogleMaps = (location) => {
    window.open(
        'https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
        "_blank"
    );
};


