import { isIP } from "node:net";

export function isPublicAddress(address: string): boolean {
  const ip = address.toLowerCase().replace(/^\[|\]$/g, "");
  if (ip.startsWith("::ffff:")) return isPublicAddress(ip.slice(7));
  if (isIP(ip) === 4) {
    const [a, b, c] = ip.split(".").map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 168 || b === 0 || (b === 88 && c === 99))) || (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) || (a === 203 && b === 0 && c === 113));
  }
  if (isIP(ip) === 6) {
    const parts = ip.split(":"); const first = parseInt(parts[0] || "0", 16), second = parseInt(parts[1] || "0", 16);
    return first >= 0x2000 && first <= 0x3fff && first !== 0x2002 && !(first === 0x2001 && (second === 0 || second === 2 || second === 0xdb8 || second >= 0x10 && second <= 0x2f)) && !(first === 0x3fff && second <= 0xfff);
  }
  return false;
}

export function auditUrl(input: string): URL {
  let url: URL;
  try { url = new URL(input.includes("://") ? input : `https://${input}`); } catch { throw new Error("Enter a valid public website URL."); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("Use a public http or https website without credentials.");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("Only standard website ports can be checked.");
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "").replace(/^\[|\]$/g, "");
  if (!hostname.includes(".") && !isIP(hostname) || /(?:^|\.)(?:localhost|local|internal|lan|home|test|invalid)$/.test(hostname)) throw new Error("Use a publicly reachable website.");
  if (isIP(hostname) && !isPublicAddress(hostname)) throw new Error("Private or reserved network addresses cannot be checked.");
  url.hash = "";
  return url;
}
