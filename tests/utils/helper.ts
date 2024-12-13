import { BrowserContext } from '@playwright/test'

export async function setupGeolocationContext(context: BrowserContext, allow: boolean, location: { latitude: number, longitude: number }) {
    // This will handle the permission prompt automatically
    if (allow) {
        await context.grantPermissions(['geolocation']);
        await context.setGeolocation(location);
    } else {
        await context.grantPermissions([]);
    }
}