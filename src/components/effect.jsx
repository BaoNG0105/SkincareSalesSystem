import { useEffect } from 'react';

function Effect() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://web.nvnstatic.net/js/events/newyear.js';
        //Link effect: https://manual.nhanh.vn/pos/website/quan-ly-ma-nhung-tren-website/them-hieu-ung-bong-tuyet-hoa-dao-roi-tren-website
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
}

export default Effect;