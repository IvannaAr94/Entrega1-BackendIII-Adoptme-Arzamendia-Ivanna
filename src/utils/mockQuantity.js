export const MAX_MOCK_RECORDS = 1000;

// GET: query string opcional; por defecto se generan 50 registros.
export function parseQueryQuantity(raw, defaultValue = 50) {
    if (raw === undefined) return defaultValue;
    if (typeof raw !== 'string' || !/^\d+$/.test(raw)) return null;

    const quantity = Number(raw);
    return Number.isSafeInteger(quantity) && quantity <= MAX_MOCK_RECORDS
        ? quantity
        : null;
}

// POST: el JSON debe traer ambos valores numéricos (0 también es válido).
export function isValidQuantity(value) {
    return typeof value === 'number'
        && Number.isSafeInteger(value)
        && value >= 0
        && value <= MAX_MOCK_RECORDS;
}
