# Deployment Guide for Vercel

## Quick Deploy Steps

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to your project directory:
```bash
cd nap-advisor
```

3. Run the deploy command:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - What's your project's name? **nap-advisor** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

5. Your app will be deployed! You'll get a URL like: `https://nap-advisor-xxxxx.vercel.app`

6. For production deployment:
```bash
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard

1. Initialize Git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Nap Advisor app"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/nap-advisor.git
git branch -M main
git push -u origin main
```

4. Go to [vercel.com](https://vercel.com) and sign in

5. Click "Add New Project"

6. Import your GitHub repository

7. Vercel will auto-detect Next.js settings:
   - Framework Preset: **Next.js**
   - Build Command: **npm run build**
   - Output Directory: **.next**
   - Install Command: **npm install**

8. Click "Deploy"

9. Wait for the build to complete (usually 1-2 minutes)

10. Your app is live!

### Method 3: Vercel Desktop App

1. Download Vercel Desktop from [vercel.com/download](https://vercel.com/download)

2. Install and sign in

3. Drag and drop your project folder into Vercel Desktop

4. Click "Deploy"

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables (If Needed)

Currently, this app doesn't require any environment variables, but if you add features that need them:

1. Go to project "Settings" > "Environment Variables"
2. Add your variables
3. Redeploy the project

## Verifying Deployment

After deployment, test these features:

- [ ] Page loads correctly
- [ ] Time slider works
- [ ] Tiredness slider works
- [ ] Age input accepts numbers
- [ ] "Should I Nap?" button generates recommendations
- [ ] Recommendations display correctly
- [ ] Dark mode works (if system preference is dark)
- [ ] Responsive design works on mobile

## Troubleshooting

### Build Fails

- Check the build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### App Doesn't Load

- Check browser console for errors
- Verify the deployment completed successfully
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in `layout.tsx`
- Verify PostCSS configuration

## Updating Your Deployment

### With Vercel CLI
```bash
vercel --prod
```

### With GitHub Integration
Just push to your main branch:
```bash
git add .
git commit -m "Update description"
git push
```

Vercel will automatically redeploy!

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
