from PIL import Image, ImageDraw
import numpy as np

# Create a 16:9 image (1920x1080)
width, height = 1920, 1080
image = Image.new('RGB', (width, height))

# Convert hex colors to RGB
start_color = tuple(int("590D22"[i:i+2], 16) for i in (0, 2, 4))  # #590D22
end_color = tuple(int("FF758F"[i:i+2], 16) for i in (0, 2, 4))    # #FF758F

# Create gradient
pixels = []
for y in range(height):
    for x in range(width):
        # Calculate the diagonal gradient factor (0 to 1)
        # From top-left (0,0) to bottom-right (width-1, height-1)
        factor = (x + y) / (width + height - 2)
        
        # Interpolate between start and end colors
        r = int(start_color[0] + (end_color[0] - start_color[0]) * factor)
        g = int(start_color[1] + (end_color[1] - start_color[1]) * factor)
        b = int(start_color[2] + (end_color[2] - start_color[2]) * factor)
        
        pixels.append((r, g, b))

# Apply pixels to image
image.putdata(pixels)

# Save the image
image.save('public/gradient-bg.png')
print("Gradient image saved as 'public/gradient-bg.png'") 