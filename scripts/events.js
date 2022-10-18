function clickSign(evt) {
    if (evt.detail == 2 && hoveringUuid != null) {
        var root = getByUuid(config, hoveringUuid);
        if (root.inactive)
            delete root.inactive;
        else
            root.inactive = true;
        draw();
    }
}