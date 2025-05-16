# Joke Central 🎭

A modern Vue.js application that serves up a collection of dad jokes, including both general and programming-related humor. Built with Vue 3, TypeScript, and Vite for optimal performance and developer experience.

## ✨ Features

- 🌗 Dark/Light mode support
- 🔄 Dynamic joke loading from Official Joke API
- 📊 Category-based filtering (General/Programming)
- 🔍 Multiple sorting options (Alphabetical, Length, Category)
- ⭐ Rate your favorite jokes with persistent storage
- 📱 Fully responsive design
- 📄 Pagination for better content organization

## 🚀 Tech Stack

- Vue 3
- TypeScript
- Vite
- Pinia (State Management)
- Vue Router
- TailwindCSS
- Axios
- HeadlessUI/HeroIcons

## 🛠️ Setup and Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd qubeyond-jokes
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

## 🔧 Configuration

The application can be configured through various configuration files:

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - TailwindCSS theme and styling
- `tsconfig.json` - TypeScript configuration

## 📦 Project Structure

```
src/
├── components/          # Reusable Vue components
├── views/              # Page components
├── stores/             # Pinia state management
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🌟 Features in Detail

### Joke Management
- Fetches jokes from multiple endpoints (general and programming)
- Ensures unique IDs for each joke
- Maintains user ratings in localStorage

### User Interface
- Responsive design for all screen sizes
- Dark/Light mode with system preference detection
- Loading states and error handling
- Smooth transitions and animations

### Interaction
- Filter jokes by category
- Sort by multiple criteria
- Rate jokes with a star rating system
- Adjust jokes per page
- Navigate through paginated results

## 📝 License

MIT License - feel free to use this project for your own learning and development!
