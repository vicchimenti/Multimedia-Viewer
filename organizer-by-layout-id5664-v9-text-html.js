function readMedia(mediaID) {
    let oMM = com.terminalfour.media.MediaManager.getManager();
    let oMedia = oMM.get(dbStatement, mediaID, language);
    let oMediaStream = oMedia.getMedia();
    let oScanner = new java.util.Scanner(oMediaStream).useDelimiter("\\A");
    let sMedia = "";
    while (oScanner.hasNext()) {
        sMedia += oScanner.next();
    }
    return sMedia;
}

try {
    // Import Organizer base from media library
    let base = readMedia(3923826);
    eval(String(base));

    let titleField = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="content" name="Title" output="selective-output" modifiers="striptags,htmlentities" format="$value" />'.toString().trim());

    // Set content wrapper, if any
    let header, midder, footer;



    header = '<div class="organizerWrapper outputOrganizer contentItem" id="id' + content.getID() + '" data-position-default="ZoneA" data-position-selected="ZoneA"> \
                <div class="titleWrapper standardContent col-xs-12"><h2 class="organizerTitle">' + titleField + '</h2></div> \
				<div class="clearfix"></div> \
                <div class="organizer standardContent"> \
                <div class="organizerExtra"></div>';
    midder = '<span></span>';
    footer = '</div> \
                <div class="organizerToggleExtra boxlinks" style="display:none">Show More</div> \
                </div>';


    // Sort content
    main(header, midder, footer);

} catch (err) {
    document.write(err.message);
}