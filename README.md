# 🍪 Fulltime Cookie

Welcome to Fulltime Cookie, a modern, feature-rich e-commerce application for a delightful online bakery. This project is built from the ground up using a professional-grade tech stack, focusing on a great user experience, scalability, and a clean codebase.

## ✨ Core Features

- **Dynamic Product Catalog**: Browse a wide array of baked goods with multi-image carousels on each product card.
- **Advanced Filtering**: Easily find products using a tag-based filtering system on the shop page (e.g., "Vegan", "Chocolate", "Classic").
- **Detailed Product Pages**: Each product has its own page showcasing variations (like toppings), package types, and other key details.
- **Recipe Viewer**: Some products have associated recipes that users can view. Premium recipes are elegantly hidden behind a paywall.
- **Multi-Step Special Orders**: A wizard-style form guides users through creating custom orders, complete with type selection, descriptions, and inspiration links.
- **Global Cart**: A persistent shopping cart powered by Zustand for robust client-side state management.
- **Theming**: Seamlessly switch between Light, Dark, and System themes for optimal viewing comfort.
- **Localization**: Supports multiple languages (English, Hebrew, Arabic) with a context-based provider.
- **Modern UI/UX**: Built with Shadcn UI and styled with Tailwind CSS for a clean, responsive, and aesthetically pleasing interface. Animations powered by Framer Motion add a touch of elegance.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

The application follows a clean, organized structure:

```
src/
├── components/          # Shared UI components
│   ├── ui/             # Shadcn UI components
│   └── sections/       # Page-specific sections
├── lib/                # Utilities and services
│   ├── auth/           # Authentication service
│   ├── api/            # API client
│   └── utils/          # Helper functions
├── stores/             # Zustand state management
├── app/                # Next.js app router
│   ├── (public)/       # Public routes
│   ├── (protected)/    # Protected routes
│   └── (admin)/        # Admin routes
└── styles/             # Global styles
```

The application uses Next.js Route Groups to organize routes based on their access level:

- `app/(public)/`: Routes accessible to everyone (e.g., homepage, shop, recipes).
- `app/(protected)/`: Routes that require user authentication (e.g., account, order history).
- `app/(admin)/`: Routes reserved for administrative access (e.g., dashboard, content management).

## 🏁 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/OmarYuss/FulltimeCookie.git
    cd FulltimeCookie
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) (or your specified port) with your browser to see the result.
