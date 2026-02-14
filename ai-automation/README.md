# AI Workflow Automation Platform

🚀 An intelligent platform that analyzes manual business workflows and generates automated solutions using Claude AI and n8n.

## Features

- 🧠 **AI-Powered Analysis**: Uses Claude 3.5 Sonnet to analyze workflows and detect automation opportunities
- ⚙️ **Automation Engine**: Generates valid n8n workflow JSON files ready for import
- 📊 **ROI Calculator**: Calculates time and cost savings with detailed metrics
- 🎨 **Workflow Visualization**: Visual representation using React Flow
- 📄 **Smart Documentation**: Automated implementation guides and setup instructions
- 🔒 **Secure**: Input validation and API key protection

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Visualization**: React Flow
- **Automation**: n8n workflow generation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Enter Business Details** - Fill in company info and workflow description
2. **AI Analysis** - Claude analyzes and detects automation opportunities
3. **View Results** - See automation score, ROI, and recommendations
4. **Download** - Get n8n workflow JSON and documentation
5. **Import to n8n** - Use the workflow in your automation platform

## Environment Variables

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
