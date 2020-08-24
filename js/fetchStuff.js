function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchStickersFromPreviewWindow() {
    // Use the class name to get the table (plz only have one result...)
    let elem = document.getElementsByClassName("uiGrid _51mz _5f0n")[0]

    // Get the inner tbody node (plz only have one...)
    let tbody = elem.childNodes[0]

    // Each element of the tbody's child list is a row
    for (var i = 0; i < tbody.childNodes.length; i++) {
        let row = tbody.childNodes[i]
        // Each row child is a column
        for (var j = 0; j < row.childNodes.length; j++) {
            let sticker = row.childNodes[j]
            // Each sticker is two child-nodes deep and grab their style attribute as the sticker is the "background_url" of it
            let style = sticker.childNodes[0].childNodes[0].getAttribute("style")
            // Isolate the URL from the rest of the inline CSS
            let url = style.substring(style.indexOf("(")+2, style.indexOf(")")-1)
            console.log(`Attempting to fetch ${url}`)
            window.open(url, "_blank")
            await sleep(500)
        }
    }
}

async function fetchStickersFromConversation() {
    // Note: This version is useful if the messages in question are themselves in a standalone div apart from the other messages. I believe FB does this for messages sent in the current session
    // Upon reloading the page, you'll probably need to use version V2

    // Use the class name to get the table (plz only have one result...)
    let messengerConvo = document.getElementById("js_1")

    // We only want the last child of this messenger conversation as it contains all the nodes within the last "timestamp" (i.e. sibling nodes are from different dates/etc)
    let lastConvo = messengerConvo.childNodes[messengerConvo.childNodes.length - 1]

    //Get the thing that holds all of the conversation elements
    convoElems = lastConvo.getElementsByClassName("_41ud")[0]

    //Ignore the first one by grabbing only the children that have a class indicating they're a real message
    stickerElems = convoElems.getElementsByClassName("clearfix _o46 _3erg")

    console.log(`There are ${stickerElems.length} sticker elements`)
    for (var i = 0; i < 5; i++) {
        let sticker = stickerElems[i].childNodes[0].childNodes[0].childNodes[0]
        let style = sticker.getAttribute("style")
        // Isolate the URL from the rest of the inline CSS
        let url = style.substring(style.indexOf("(")+2, style.indexOf(")")-1)
        console.log(`Attempting to fetch ${url}`)
        window.open(url, "_blank")
        await sleep(500)
    }
}

async function fetchStickersFromConversationV2() {
    // Adjust the number of sticker messages to scrape
    const numMessages = 39

    // Grab the table that contains all the individual messages
    let messengerConvo = document.getElementById("js_1")

    // Iterate over the last "numMessages" messages in the conversation
    for (var i = 0; i < numMessages; i++) {
        let currMsg = messengerConvo.childNodes[messengerConvo.childNodes.length - numMessages + i]
        
        // Grab specifically the part containing the sticker
        let stickerMsg = currMsg.getElementsByClassName("_2poz _ui9")[0]

        // Grab the style attribute and isolate the URL from the other inline CSS
        let style = stickerMsg.getAttribute("style")
        let url = style.substring(style.indexOf("(")+2, style.indexOf(")")-1)

        console.log(`Attempting to fetch ${url}`)
        window.open(url, "_blank")
        await sleep(500)
    }
}

//fetchStickersFromPreviewWindow()
fetchStickersFromConversationV2()