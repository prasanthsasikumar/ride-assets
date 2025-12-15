# Ride Assets - Media Hosting

This repository hosts media assets (images and videos) for prasanthsasikumar.com ride pages.

## Structure

```
media/
  ├── stories/     # Instagram stories organized by date
  ├── reels/       # Instagram reels
  ├── profile/     # Profile pictures
  └── garage/      # Vehicle + garage media (cars, motorcycles, tours)
```

## Usage

Assets are accessible via:
```
https://[your-netlify-url]/media/stories/202501/filename.mp4
```

## Deployment

This is deployed as a static site on Netlify with CORS enabled for cross-origin requests from the main website.

## Garage media

Put vehicle/garage images & videos under `media/garage/` (any subfolder structure is fine).
Then run the manifest generator so the browser UI and `manifest.json` include the new category.

## Local Development

Simply open `index.html` in a browser to browse the media library.
