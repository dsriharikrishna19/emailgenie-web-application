# EmailGenie AI - Email Scenario Generator

A modern, AI-powered email scenario generator built with Next.js 14, OpenAI GPT-4, and Framer Motion.

## Features

- **10+ Email Scenarios**: From job applications up to cold outreach.
- **Dynamic Tones**: Select between Professional, Formal, Basic, or provide custom AI instructions.
- **Live Generation**: Real-time generation using GPT-4o.
- **History Tracking**: Automatically saves your last 5 generations locally.
- **Export Options**: Download generated emails as `.txt` files.
- **Premium Design**: Dark mode UI with glassmorphism and smooth animations.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Architecture**: `src` directory structure
- **Styling**: Vanilla Tailwind CSS (No ShadCN)
- **Animations**: Framer Motion
- **AI**: OpenAI API (GPT-4o)
- **Icons**: Lucide React

## Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Customization

- Scenarios can be extended in `src/components/ScenarioSelector.tsx`.
- Tones can be modified in `src/components/ToneSelector.tsx`.
- The AI prompt structure is located in `src/app/api/generate-email/route.ts`.
