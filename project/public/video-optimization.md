# Video Optimization Guide

To ensure videos load quickly and don't lag across devices, follow these optimization steps for all video files:

## Video Compression Commands

For optimal performance, create multiple versions of each video:

### High Quality (for desktop/fast connections)
Use this FFmpeg command:
```bash
ffmpeg -i input.mp4 -vf "scale=1280:-1" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output-high.mp4
```

### Low Quality (for mobile/slow connections)
Use this FFmpeg command:
```bash
ffmpeg -i input.mp4 -vf "scale=640:-1" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k output-low.mp4
```

## Video Structure

Ensure each video:
1. Is under 2MB for low quality and 5MB for high quality
2. Has a proper poster image (first frame or representative still)
3. Uses the MP4 format with H.264 encoding

## Implementation Best Practices

1. Always include width and height attributes on video elements
2. Use preload="metadata" or preload="none" for videos not in the initial viewport
3. Include poster images to display before videos load
4. Use the IntersectionObserver to only play videos when they're visible
5. Implement proper fallbacks for older browsers

## Video Placement

For the sections with multiple videos, consider:
1. Using a carousel instead of showing all videos at once
2. Implementing click-to-play for non-hero videos
3. Ensuring videos autoplay only when fully in the viewport

Following these guidelines will significantly improve loading time and prevent lag across all devices. 