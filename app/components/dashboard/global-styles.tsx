"use client";

import React from "react";

export function GlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.18); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(128,128,128,0.3); }
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
          body { margin: 0; padding: 0; overflow-x: hidden; }
          ::selection { background: rgba(124,92,252,0.3); }
          :focus-visible { outline: 2px solid rgba(124,92,252,0.5); outline-offset: 2px; }
          button:focus:not(:focus-visible) { outline: none; }
          input[type="color"] { -webkit-appearance: none; appearance: none; border: none; padding: 0; cursor: pointer; }
          input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
          input[type="color"]::-webkit-color-swatch { border: none; border-radius: 6px; }
          /* Fix iOS input zoom */
          @media screen and (max-width: 900px) {
            input, select, textarea { font-size: 16px !important; }
          }
          /* Hide scrollbar on design picker for mobile */
          div::-webkit-scrollbar { width: 0; height: 0; }
        `,
      }}
    />
  );
}
