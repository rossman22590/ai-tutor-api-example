# AI Story Generator & Chat Platform 🤖✨

A powerful Next.js application that combines AI story generation, chat functionality, and streaming capabilities using the AI Tutor API.

![AI Story Generator Demo](https://img.mytsi.org/i/wH2z935.png)

## 🌟 Features

- **Story Generation**: Create unique stories using AI with custom prompts
- **Interactive Chat**: Real-time chat interface with AI
- **Streaming Responses**: Stream AI responses for a more natural conversation flow
- **Token Management**: Built-in token generation and management
- **Beautiful UI**: Modern, responsive design with glass-morphism effects
- **Multiple Modes**: Switch between different interaction modes:
  - 🔧 Workflow Mode
  - 💬 Chat Mode
  - 📡 Streaming Mode
  - 🔑 Token Generation

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- pnpm (recommended) or npm
- AI Tutor API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-story-generator.git
cd ai-story-generator
```

Install dependencies:
```bash
pnpm install
```

Create a .env.local file in the root directory:
```env
AITUTOR_API_KEY=xxxxxxxxx
WORKFLOW_ID=xxxxxxxxx
CHATBOT_ID=xxxxxxxxx
NEXT_PUBLIC_AITUTOR_TOKEN=xxxxxxxxxx
```

Run the development server:
```bash
pnpm dev
```

Visit http://localhost:3000 to see the application.

## 🛠️ Tech Stack
- Framework: Next.js 13
- Styling: Tailwind CSS
- AI Integration: AI Tutor API
- Icons: React Icons
- Markdown: marked
- Type Safety: TypeScript

## 📦 Project Structure
```
ai-story-generator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   ├── run/
│   │   │   └── token/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── StoryDisplay.tsx
│   │   └── StreamingChat.tsx
│   └── styles/
│       └── globals.css
├── public/
├── .env.local
└── package.json
```

## 🔥 Key Features Explained
### Story Generation
The workflow mode provides an intuitive interface for story creation with AI. Simply enter your prompt and get creative stories in response.

### Real-time Chat
Engage in dynamic conversations with AI using the chat mode. Features include:
- Streaming responses for natural conversation flow
- Message history tracking
- Markdown formatting support
- Error handling and recovery

### Token Management
Generate and manage API tokens directly from the interface:
- One-click token generation
- Secure token storage
- Token refresh capabilities
- Clear token display and management

## 🎨 UI/UX Features
- Responsive Design: Works seamlessly on desktop and mobile
- Glass Morphism: Modern, translucent UI elements
- Gradient Themes: Beautiful color schemes throughout
- Loading States: Clear feedback during operations
- Error Handling: User-friendly error messages
- Smooth Transitions: Polished mode switching
- Accessibility: Keyboard navigation support

## 🔧 API Integration
The application integrates with the AI Tutor API for various functionalities:

### Story Generation
```typescript
POST /api/run
body: { story: string }
```

### Chat Streaming
```typescript
POST /api/chat
body: { messages: Message[] }
```

### Token Generation
```typescript
POST /api/token
response: { success: boolean, token: string }
```

## 🚀 Deployment
Deploy your own version of the AI Story Generator:
- Fork this repository
- Set up environment variables in your deployment platform
- Deploy to your preferred hosting service (Vercel recommended)

### Deploy with Vercel

## 📝 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
- Fork the repository
- Create your feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## 📫 Support
For support, email your-email@example.com or open an issue in this repository.

## 🙏 Acknowledgments
- AI Tutor API for providing the AI capabilities
- Next.js team for the amazing framework
- All contributors who help improve this project
- Made with ❤️ by TSI

