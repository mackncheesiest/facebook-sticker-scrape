import math
import os, sys, shutil
from PIL import Image

save_intermediate_frames = False

img_dir = "../messenger_scrape/usagyuuun"
frames_dir = "../frames/usagyuuun"
gif_dir = "../gifs/usagyuuun"

# This changes depending on whether you download the low res sticker previews (64x64) or if you download the full stickers as they're shown in the messenger window (120x120)
frame_width = 120
frame_height = 120

# Seems to be a reasonable value derived from FB messenger JS
default_padding = (12, 12)

# Various stickers require various levels of padding regardless, though. Tweak and play with those here until they're right
padding_dict = {
    "img_6.png": (15, 15),
    "img_14.png": (15, 15),
    "img_15.png": (15, 15),
    "img_16.png": (15, 15),
    "img_17.png": (20, 20),
    "img_18.png": (15, 15),
    "img_19.png": (15, 15),
    "img_20.png": (20, 20),
    "img_21.png": (15, 12),
    "img_22.png": (15, 15),
    "img_23.png": (20, 20),
    "img_25.png": (12, 3),
    "img_32.png": (12, 3),
    "img_34.png": (15, 5.5),
    "img_35.png": (15, 15),
    "img_38.png": (15, 15)
}

for file in os.listdir(img_dir):
    if file.endswith(".png"):
        print(f"Cropping frames from file: {file}")
        imgList = []
        with Image.open(f"{img_dir}/{file}") as img:
            imgWidth = img.width
            imgHeight = img.height
            sprite_padding = padding_dict.get(file, default_padding)

            # i.e. images with 5 frames per row have a width of 720px => 720/120 = 6 - 1 = 5 
            framesPerRow = math.ceil(imgWidth / frame_width) - 1
            numRows = math.ceil(imgHeight / frame_height) - 1

            if save_intermediate_frames:
                current_frames_dir = f"{frames_dir}/{file[:-4]}"
                if os.path.exists(current_frames_dir):
                    #print(f"Removing existing frames directory {current_frames_dir}")
                    shutil.rmtree(current_frames_dir)
                #print(f"Creating frames directory {current_frames_dir}")
                os.mkdirs(current_frames_dir)

            frameNum = 0
            while frameNum <= framesPerRow * numRows:
                startX = (frameNum % framesPerRow) * (frame_width + sprite_padding[0] * 2) + sprite_padding[0]
                startY = math.floor(frameNum / framesPerRow) * (frame_height + sprite_padding[1] * 2) + sprite_padding[1]
                endX = startX + frame_width
                endY = startY + frame_height
                box = (startX, startY, endX, endY)

                #print(f"Cropping box: {box} from image with width {imgWidth} and height {imgHeight}")
                cropped_img = img.crop(box)
                # Check if the image is completely empty. If it is, ignore it
                extrema = cropped_img.convert("L").getextrema()
                if extrema == (0, 0) or extrema == (1, 1):
                    #print("Skipping empty frame...")
                    pass
                else:
                    if save_intermediate_frames:
                        cropped_img.save(f"{current_frames_dir}/{file[:-4]}_{frameNum}.png")
                    imgList.append(cropped_img)
                
                frameNum = frameNum + 1
            print("Saving output gif")
            imgList[0].save(f"{gif_dir}/{file[:-4]}.gif", save_all=True, append_images=imgList[1:], optimize=False, duration=60, loop=0)
    else:
        print(f"Ignoring file: {file}")