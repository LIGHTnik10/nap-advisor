# Nap Advisor 💤

A smart web application that provides personalized nap recommendations based on the current time, your tiredness level, and age. Built with Next.js 15 and deployed on Vercel.

🔗 **Live Demo:** https://nap-advisor-lzr446veh-bmsdocs-admins-projects.vercel.app

## Features

- **Intelligent Nap Recommendations**: Get science-backed advice on whether you should nap
- **Personalized Duration**: Calculates optimal nap duration based on your age and tiredness
- **Flexible Ranges**: Provides minimum and maximum nap durations you can get away with
- **Time-Based Logic**: Considers the current time to optimize your sleep schedule
- **Beautiful UI**: Modern, responsive design with dark mode support
- **Real-time Updates**: Interactive sliders for instant feedback

## How It Works

The app uses a sophisticated algorithm that considers:

1. **Current Time**: Different times of day have different napping impacts
   - Morning (before 11 AM): Generally not recommended unless very tired
   - Midday (11 AM - 3 PM): Optimal nap window
   - Late Afternoon (3 PM - 5 PM): Short naps only
   - Evening (after 5 PM): Not recommended

2. **Tiredness Level**: Scale of 1-10 to adjust nap duration and necessity
   - Higher tiredness = longer recommended nap
   - Minimum tiredness thresholds vary by time of day

3. **Age**: Different age groups have different sleep needs
   - Children: Longer naps (45-90 minutes)
   - Teenagers: Moderate naps (30 minutes)
   - Adults: Power naps (20-25 minutes)
   - Seniors: Slightly longer naps (30 minutes)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

### Option 3: Deploy with One Click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Runtime**: React 19

## Project Structure

```
nap-advisor/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with form and results
│   └── globals.css         # Global styles
├── lib/
│   └── napLogic.ts         # Nap recommendation algorithm
├── public/                 # Static assets
└── vercel.json            # Vercel configuration
```

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
