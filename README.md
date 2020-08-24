# Hacky Utilities for Scraping Stickers from Messenger

* [js](js): hacky JS to get all the sticker URLs and open them for you to download
* [python](python): hacky python to convert the sprite sheets to gifs with Pillow

Not going to work on generalizing it, but basic workflow:
* Enable "popups" in your browser because we're going to be opening a lot of tabs
* Tweak [fetchStuff.js](js/fetchStuff.js) based on whether you're grabbing from the sticker preview window or the messenger conversation window (the important part are to make sure that the class names used to select the elements haven't changed)
* Copy and paste the relevant functions from `fetchStuff.js` into the browser console
* At this point you should have tabs open with all the spritesheets and you can save them individually (if you know how to trigger automatically make a PR. or try [download.js](http://danml.com/download.html))
* Regardless, save them all to the messenger_scrape folder
* Adjust [spritesheet2gif.py](python/spritesheet2gif.py) to point to (i) where the scraped spritesheets are located, (ii) where to save intermediate cropped frames if you want, and (iii) where to save the output gifs
* Run the script and check the output. If the frames aren't being cropped correctly, adjust either the default padding value used when striding over the frames or make an image-specific adjustment by adding an entry to the padding_dict. This is also passed in as a prop when facebook is animating (see [fbMessengerGetStyles.js](js/fbMessengerGetStyles.js) and it might be nice to scrape it someday too, but for now manual tweaking works.