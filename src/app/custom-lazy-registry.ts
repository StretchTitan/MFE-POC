import { LazyElementsRegistry } from '@angular-extensions/elements';

(window as any).LazyElementsRegistry = (window as any).LazyElementsRegistry ?
    (window as any).LazyElementsRegistry : new Map<string, Promise<void>>();

export class CustomLazyRegistry implements LazyElementsRegistry {
    get(url: string): Promise<void> {
        return (window as any).LazyElementsRegistry.get(url);
    }

    set(url: string, notifier: Promise<void>): void {
        (window as any).LazyElementsRegistry.set(url, notifier);
    }

    has(url: string): boolean {
        return (window as any).LazyElementsRegistry.has(url);
    }
}
