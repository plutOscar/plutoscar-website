# Review of your original HTML and CSS

Your first attempt has a sound basic idea: the header is divided into three Flexbox areas — brand, navigation and search. That is a reasonable structure to learn with. The main problems are sizing, positioning, missing behaviour and some missing accessibility details.

## `index(1).html`

- The page links to `styles/General.css` and `styles/Header.css`, while the uploaded files were separate files. The folder and filenames must match the links exactly.
- `images/plutoscar-logo.svg` and `images/search.svg` were referenced, but those image files were not included with the supplied HTML/CSS. Broken image icons would appear until the correct files are added.
- Every navigation link used `href="#"`. Those links do not open real pages or jump to meaningful sections. The new site uses separate page files: `index.html`, `services.html`, `portfolio.html`, `about.html`, `certificates.html` and `contact.html`.
- The search input and button were visual only. The new search form sends its query to the Portfolio page, where JavaScript filters project cards.
- The logo image needs meaningful alternative text or should be marked decorative when the brand name beside it already identifies the brand. The new logo is decorative beside the wordmark.
- Use a semantic `<header>` and `<nav>` rather than only generic `<div>` elements. The revised website does this.

## `Header.css`

- `.header { width: 1370px; }` forces a fixed width. On many laptop viewports and nearly all phones, that is wider than the screen and can create horizontal scrolling. Use a responsive width such as `width: 100%` with an inner max-width container.
- `position: fixed` was set without `top`, `left`, or a `z-index`. That makes the header's placement and stacking less predictable. The rebuilt site uses `position: sticky; top: 0; z-index: 50`.
- The header itself did not use `align-items: center`, so its children were not guaranteed to sit vertically centred.
- The left brand container was limited to `150px`, which is tight for a logo plus the full PLUTOSCAR wordmark.
- The navigation list kept the browser's default padding and margins. Reset these and use `gap` to space links consistently.
- The hover rule added padding only when the pointer entered a link. That can make the navigation jump. Put the padding in the normal rule and animate background/colour only.
- `transition: opacity 1s` was declared only in the hover rule. Put transitions in the base rule so hover-in and hover-out both animate smoothly.
- `opacity: 0.5` makes the hovered text fade. A clear colour/background change is easier to read.
- The search field and button had small fixed heights, but their outer alignment and flexible sizing were not fully defined. The new search form has a predictable height and shrink behaviour.

## `General.css`

The colour variables are a good start and already describe a consistent dark-blue theme. The file only needed a stronger global foundation: `box-sizing: border-box`, readable default text, responsive container sizing, image defaults, focus states and layout rules.

## PictoBlox hand-gesture screenshot (`scriptnumbers.png`)

The screenshot shows a useful experiment: camera video and detections are enabled, a `Finger Count` variable is used, the hand landmarks are checked, and costumes `Glow-0` through `Glow-5` represent the number of detected fingers.

There are important logic issues to test before describing it as a finished working project:

1. `Finger Count` is set to `0` before the `forever` loop, but it is not reset for each new camera frame. The count can keep increasing across frames. Reset it inside the loop before analysing each frame.
2. `play sound Grunt until done` runs on every loop pass. That can make the script pause repeatedly and slow down detection. Trigger the sound only when a recognised result changes, or remove it while testing.
3. The thumb test compares the hand x-position with the top of the thumb. Test this on both left and right hands and with the camera's mirrored/non-mirrored view. A single direction test may not recognise both orientations correctly.
4. Each recognised count uses `stop this script`. That stops the continuous detection script after the first match. If the goal is continuous tracking, show the costume/result, wait briefly if needed, reset the counter, and let the loop continue instead.
5. Add a clear no-hand behaviour: when no hand is detected, set the displayed result back to the neutral state and avoid leaving an old finger count visible.
6. Test one finger at a time, then two through five, and test a closed hand. Record which gestures pass; do not assume the code works simply because the blocks are connected.

The portfolio therefore labels this screenshot as **In progress / logic review**, not as a finished product.

## What is included in this rebuilt project

- Six separate pages with shared navigation and styling.
- Responsive desktop and mobile layouts.
- A working mobile navigation menu.
- Portfolio category filters and project search.
- Click-to-enlarge project screenshots.
- Three original STEMpedia certificate PDFs and their previews.
- Your own blue-outfit photograph and PLUTOSCAR shirt photograph.
- Contact form validation that prepares an email using `mailto:`. It does not pretend to save form submissions on a server.

Before publishing, add a graphic-design sample you approve for public display, review the public use of your photographs and confirm that the email address is correct.
