# Akrostech Consulting website

A production-ready, multi-page Vite/React website with smooth scrolling, page transitions, scroll reveals and a lightweight Three.js hero scene.

## Pages

- Home
- Services overview
- Four individual service pages
- Process
- About
- Contact
- Custom 404 page

## Deploy to GitHub and Vercel (no coding required)

### 1. Unzip this package

On your computer, right-click the ZIP and choose **Extract All** (Windows) or double-click it (macOS). Open the extracted `akrostech-vercel-site` folder. The files including `package.json`, `src`, `public`, and `vercel.json` should sit at the top level.

### 2. Upload it to GitHub

1. Sign in to GitHub and select **New repository**.
2. Name it `akrostech-website`.
3. Choose **Private** or **Public**, then select **Create repository**.
4. On the empty repository page, select **uploading an existing file**.
5. Drag all files and folders from inside the extracted folder into the upload area. Do not upload the ZIP itself and do not add an extra enclosing folder.
6. Wait for the file list to finish, type `Initial website` in the commit box, then select **Commit changes**.

If GitHub's web uploader will not accept a folder, install GitHub Desktop, choose **File → Add local repository**, select the extracted folder, then **Publish repository**.

### 3. Deploy on Vercel

1. Sign in to Vercel with GitHub.
2. Select **Add New → Project**.
3. Find `akrostech-website` and select **Import**.
4. Vercel should detect **Vite** automatically.
5. Leave these defaults in place:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
6. Select **Deploy**.

No environment variables are required for the website to build and go live.

## Connect the contact form

The contact form is ready for either Formspree or a regular email link. In Vercel, open **Project → Settings → Environment Variables** and add one of these:

- `VITE_FORMSPREE_ENDPOINT`: your full Formspree form endpoint (recommended)
- `VITE_CONTACT_EMAIL`: the inbox that should receive enquiries if Formspree is not used
- `VITE_BOOKING_URL`: optional full booking-page URL; when set, a booking link appears

After adding or changing an environment variable, open **Deployments**, select the latest deployment's menu, and choose **Redeploy**.

Without these optional values, the site still deploys normally. The contact form shows a safe configuration message instead of sending data to an unknown destination.

## Use a custom domain

In Vercel, open **Project → Settings → Domains**, add the domain, and follow the DNS records Vercel displays. Only change DNS after the Vercel preview looks correct.

## Run locally (optional)

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal. To test the production build:

```bash
npm run build
npm run preview
```

## Edit the content

- Main pages and copy: `src/App.jsx`
- Colors, layout and responsive design: `src/styles.css`
- Browser title and description: `index.html`
- Contact settings template: `.env.example`

## Launch checklist

- Add a verified contact email or Formspree endpoint.
- Add a booking URL if the company uses one.
- Review every service description with Akrostech.
- Replace the current-site link in the footer if the domain changes.
- Test the contact form from the final domain.
- Check the desktop and mobile Vercel previews.
- Connect the production domain only after approval.
