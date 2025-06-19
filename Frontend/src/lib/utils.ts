import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isJwtExpired(token: string): boolean {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return false;
    // exp is in seconds, Date.now() is ms
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true; // treat invalid tokens as expired
  }
}