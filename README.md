# ☀️ Weather Dashboard

A beautiful, real-time weather application built with React and Vite, featuring dynamic weather backgrounds and comprehensive weather information.

![Weather Dashboard](https://img.shields.io/badge/React-19.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-teal)

## ✨ Features

- 🔍 **Smart City Search** - Autocomplete suggestions as you type
- 🌡️ **Temperature Conversion** - Toggle between Celsius and Fahrenheit
- 🎨 **Dynamic Backgrounds** - Changes based on weather conditions
- 📊 **Comprehensive Data** - Humidity, wind speed, visibility, sunrise/sunset times
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Weather-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```
   
   Then open `.env` and add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (make sure `.env` is in `.gitignore`)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)** and sign in

3. **Click "New Project"** and import your repository

4. **Configure Environment Variables:**
   - Click on "Environment Variables"
   - Add: `VITE_OPENWEATHER_API_KEY` with your API key
   - Make sure it's available for Production, Preview, and Development

5. **Deploy!** Vercel will automatically:
   - Install dependencies
   - Build your project
   - Deploy to a production URL

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add your environment variable when asked
```

### Adding Environment Variables on Vercel

After deployment, you can manage environment variables:

1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add `VITE_OPENWEATHER_API_KEY` with your API key value
4. Redeploy if needed

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** TailwindCSS 4.1.18
- **API:** OpenWeatherMap API
- **Deployment:** Vercel

## 📁 Project Structure

```
Weather-Dashboard/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── App.jsx      # Main app component
│   └── index.css    # Global styles
├── .env.example     # Environment variables template
├── .gitignore       # Git ignore rules
├── vercel.json      # Vercel configuration
└── package.json     # Dependencies and scripts
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## 🔒 Security Notes

- ✅ API key is stored in environment variables
- ✅ `.env` files are excluded from Git
- ✅ All API calls use HTTPS
- ✅ No sensitive data in client-side code

## 🐛 Troubleshooting

### API Key Not Working
- Make sure your `.env` file exists and has the correct variable name: `VITE_OPENWEATHER_API_KEY`
- Restart the development server after adding environment variables
- Check that your API key is valid at [OpenWeatherMap](https://openweathermap.org/)

### Build Errors on Vercel
- Ensure `VITE_OPENWEATHER_API_KEY` is added in Vercel's environment variables
- Check that the variable is available for the correct environment (Production/Preview)

### Mixed Content Errors
- All API calls now use HTTPS - make sure you haven't modified them

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ using React and Vite**
