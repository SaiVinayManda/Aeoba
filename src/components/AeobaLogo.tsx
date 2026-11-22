import { useId } from "react";
import { site } from "@/config/site";

export function AeobaLogo() {
  const maskId = `aeoba-weave-mask-${useId().replaceAll(":", "")}`;

  return <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="36" height="36" fill="none" role="img" aria-label={`${site.name} Logo`}>
      <defs>
        <mask id={maskId}>
          <rect width="320" height="320" fill="white" />
          <path d="M 92 178 C 120 198, 165 170, 218 158" stroke="black" strokeWidth="19" strokeLinecap="round" />
          <path d="M 225 162 C 205 178, 175 180, 152 174" stroke="black" strokeWidth="19" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`} stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 96 268 C 118 205, 138 66, 160 66 C 182 66, 206 205, 226 268" />
        <path d="M 110 268 C 130 212, 148 92, 161 92 C 174 92, 194 212, 212 268" />
        <path d="M 96 268 L 110 268" strokeWidth="9" />
        <path d="M 212 268 C 218 273, 224 273, 226 268" strokeWidth="8" />
      </g>
      <path d="M 118 168 C 94 166, 94 184, 118 188 C 148 193, 186 154, 214 152 C 230 151, 232 164, 212 171 C 188 179, 148 169, 118 168 Z" stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="tracking-tight font-semibold">{site.name}</span>
  </>;
}
