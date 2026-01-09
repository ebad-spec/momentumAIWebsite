# Momentum Pitch Deck

A premium, investor-grade pitch deck built with Next.js, TypeScript, and Tailwind CSS. Features smooth transitions, strong typography, and a clean Apple-style design.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser
4. Navigate to [http://localhost:3000/deck](http://localhost:3000/deck) to view the pitch deck

## Project Structure

```
app/
  deck/
    components/          # Reusable layout components
      TitleSlideLayout.tsx
      TwoColumnLayout.tsx
      MetricsLayout.tsx
      BulletLayout.tsx
    slides/             # Individual slide components
      Slide1Title.tsx
      Slide2Problem.tsx
      ... (12 total slides)
    page.tsx            # Main deck page with navigation
    slideRegistry.tsx   # Central registry of all slides
```

## Editing Slides

### To Edit Slide Content

1. Navigate to `app/deck/slides/`
2. Open the slide file you want to edit (e.g., `Slide1Title.tsx`)
3. Modify the content within the component
4. Save and the changes will hot-reload automatically

### To Add a New Slide

1. Create a new component in `app/deck/slides/` (e.g., `Slide13New.tsx`)
2. Add the slide to the `slides` array in `app/deck/slideRegistry.tsx`:
```typescript
{
  id: 13,
  title: 'New Slide',
  component: Slide13New,
}
```

### To Reorder Slides

Edit the `slides` array in `app/deck/slideRegistry.tsx`. The order in the array determines the slide order.

## Navigation

- **Arrow Keys**: Left/Right arrows to navigate between slides
- **Spacebar**: Advance to next slide
- **Click Controls**: Use Prev/Next buttons at the bottom
- **Slide Indicators**: Click dots to jump to specific slides

## Layout Components

The deck uses four reusable layout components:

1. **TitleSlideLayout**: For title slides with centered content
2. **TwoColumnLayout**: For side-by-side content
3. **MetricsLayout**: For displaying key metrics/numbers
4. **BulletLayout**: For bullet point lists

## Building for Production

```bash
npm run build
npm start
```

## Customization

### Colors

Edit `app/globals.css` to change the color scheme. The default uses a dark theme with blue/cyan accents.

### Typography

Font sizes and weights can be adjusted in the layout components or via Tailwind classes.

### Animations

Add transitions by modifying the slide components or adding CSS transitions in `globals.css`.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## License

Private project for Momentum pitch deck.

