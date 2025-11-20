import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const token = async () => {
    const t = await fetch("/api/auth/token").then((r) => r.json());
    return t;
};
