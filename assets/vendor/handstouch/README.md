# Handstouch motion layer

Source: https://github.com/vikod3/handstouch
Revision: `0eeb9daea41569c0af3ac6b5e1a12773d69b1ef4`

`hand-renderer.js` is the **unchanged** upstream production bundle
`dist/assets/hand-renderer-Br7IWngq.js`, including Three.js and its license notice.
`hand-renderer.source.ts` is the corresponding upstream source for review.
No package installation or CDN is required to serve the portfolio.

The RGB picture and its alpha matte are encoded in the upper and lower halves
of the same video. The original shader combines them using the original
smoothstep thresholds, color space, pixel ratio and frame callback scheduling.
Rendering this asset directly in a visible video element would show the mask;
using only the poster would lose the hand movement.

The portfolio keeps the 3:1 full-width hand frame and unfiltered background.
It clips the effect inside a dedicated, text-free hero-art row between the heading
and introduction, so no animation frame can obscure any page text. It adds
pause, reduced-motion and offscreen lifecycle controls in `hero-motion.js`.

Original media SHA-256 (the local renamed files are identical):

- background.mp4: `92b529f02117d3cc9249f7aa9999a1d3bdca19abbdb9ab917167d22b34b4b451`
- hands-rgba.mp4: `5414059c57c139394d34630433d68f4be2529ff6d434baa4736f2b6cafdd2490`
- hands-poster.webp: `9a6217dc7fd8d9e5d3cf76f815e11cff725b751d1cd12e7f9228f469daefd2c6`
