// @ts-nocheck
export const PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;

export function initPixel() {
    if (!PIXEL_ID) return;

    // @ts-ignore
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');

    // @ts-ignore
    window.fbq('init', PIXEL_ID);
    // @ts-ignore
    window.fbq('track', 'PageView');
}

export function trackPageView() {
    // @ts-ignore
    if (typeof window.fbq !== 'undefined') {
        // @ts-ignore
        window.fbq('track', 'PageView');
    }
}

export function trackViewContent(product: any) {
    // @ts-ignore
    if (typeof window.fbq !== 'undefined') {
        // @ts-ignore
        window.fbq('track', 'ViewContent', {
            content_ids: [product.id],
            content_type: 'product',
            value: product.price,
            currency: 'DZD'
        });
    }
}

export function trackAddToCart(product: any) {
    // @ts-ignore
    if (typeof window.fbq !== 'undefined') {
        // @ts-ignore
        window.fbq('track', 'AddToCart', {
            content_ids: [product.id],
            content_type: 'product',
            value: product.price,
            currency: 'DZD'
        });
    }
}

export function trackLead(order: any) {
    // @ts-ignore
    if (typeof window.fbq !== 'undefined') {
        // @ts-ignore
        window.fbq('track', 'Lead', {
            value: order.total,
            currency: 'DZD'
        });
    }
}
