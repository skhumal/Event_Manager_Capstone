const cache = new Map();

const CACHE_DURATION = 60 * 1000; // 60 seconds

const eventCache = {
    get(key) {
        const cachedItem = cache.get(key);

        if (!cachedItem) {
            return null;
        }

        if (Date.now() > cachedItem.expiry) {
            cache.delete(key);
            return null;
        }

        return cachedItem.data;
    },

    set(key, data) {
        cache.set(key, {
            data,
            expiry: Date.now() + CACHE_DURATION
        });
    },

    clear(key) {
        cache.delete(key);
    }
};

module.exports = eventCache;