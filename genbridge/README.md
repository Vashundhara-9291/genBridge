# Animated Cursor Project

This project implements an animated cursor effect featuring a playful cat or dog character that follows the mouse with smooth trailing motion. The cursor changes appearance based on user hover and includes customizable properties for character type, size, and learning mode.

## Features

- **Animated Cursor**: A playful character that follows the mouse cursor with smooth trailing motion.
- **Character Customization**: Users can choose between different character types (cat or dog) and adjust the size of the character.
- **Hover Effects**: The character changes appearance when the user hovers over it.
- **Settings Panel**: A user-friendly interface to customize cursor settings.
- **Learning Mode**: An optional mode that enhances the interaction experience.

## Project Structure

```
genbridge
├── index.html
├── src
│   ├── main.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── Cursor
│   │   │   ├── AnimatedCursor.tsx
│   │   │   ├── Character.tsx
│   │   │   └── cursor.css
│   │   ├── SettingsPanel.tsx
│   │   └── CharacterToggle.tsx
│   ├── hooks
│   │   └── useMouse.ts
│   ├── context
│   │   └── SettingsContext.tsx
│   ├── styles
│   │   └── globals.css
│   └── types
│       └── index.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd genbridge
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).
- Use the Settings Panel to customize the cursor character type and size.
- Hover over the character to see the playful animations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.