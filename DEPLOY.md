# Free Deployment

This site can be hosted for free as a static app.

## GitHub Pages

1. Push this repository to GitHub.
2. Keep the default branch as `main`.
3. In GitHub, open `Settings` -> `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to `main` or run the `Deploy GitHub Pages` workflow manually.

The workflow builds `dist/public`, sets the correct base path automatically, and publishes the site.

## Local static build

Run:

```bash
npm install
npm run build:static
```

The deployable output is in `dist/public`.

## Other free hosts

This same `dist/public` folder also works on Vercel or Netlify as a static site.

Use:

- Build command: `npm run build:static`
- Publish directory: `dist/public`

## Important note

The booking form is still a frontend-only demo form. It does not send submissions to email or a backend yet.
