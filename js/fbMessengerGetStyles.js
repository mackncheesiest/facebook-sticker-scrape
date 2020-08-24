d.getWidth = function () {
    var a;
    return Math.floor((a = this.props.sourceWidth) != null ? a : 0)
};
d.getHeight = function () {
    var a;
    return Math.floor((a = this.props.sourceHeight) != null ? a : 0)
};

// Original
d.getStyle = function () {
    var a,
    c = 0,
    d = this.props.spriteURI;
    a = (a = this.props.scale) != null ? a : 1;
    var e = this.getHeight() * a;
    a = this.getWidth() * a;
    if (b('PaddedStickerConfig').ChatPaddedAnimatedStickerGK && this.props.paddedSpriteURI) {
      d = this.props.paddedSpriteURI;
      var f = 240 / Math.min(e, a);
      c = Math.floor(parseInt(b('StickerConstants').SPRITE_PADDING, 10) / f)
    }
    f = this.props.frameCount ? this.state.index % this.props.frameCount : 0;
    var g = this.props.framesPerRow ? f % this.props.framesPerRow * (a + c * 2) + c : 0;
    f = this.props.framesPerRow ? Math.floor(f / this.props.framesPerRow) * (e + c * 2) + c : 0;
    var h = this.props.frameCount && this.props.frameCount > 1 && this.props.animationTrigger === n.CLICK || this.$3(this.props.packID);
    h = this.props.forceCursorPointer || h ? 'pointer' : 'default';
    if (!this.state.hasAnimated || !this.props.spriteURI || !d || !this.props.framesPerRow || !this.props.framesPerCol) return {
      backgroundImage: this.$4() || !this.props.sourceURI ? null : 'url(' + this.props.sourceURI.toString() + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: a + 'px ' + e + 'px',
      cursor: h,
      height: e,
      width: a
    };
     else return {
      backgroundSize: (a + c * 2) * this.props.framesPerRow + 'px ' + (e + c * 2) * this.props.framesPerCol + 'px',
      backgroundImage: 'url(' + d.toString() + ')',
      backgroundPosition: - g + 'px ' + - f + 'px',
      cursor: h,
      height: e,
      width: a,
      imageRendering: '-webkit-optimize-contrast'
    }
};

// Renamed variables
d.getStyle = function () {
    var width;
    var c = 0;
    var spriteURI = this.props.spriteURI;
    
    width = (width = this.props.scale) != null ? width : 1;
    
    var height = this.getHeight() * width;
    
    width = this.getWidth() * width;
    
    if (b('PaddedStickerConfig').ChatPaddedAnimatedStickerGK && this.props.paddedSpriteURI) {
      spriteURI = this.props.paddedSpriteURI;
      var background_Y = 240 / Math.min(height, width);
      padding = Math.floor(parseInt(b('StickerConstants').SPRITE_PADDING, 10) / background_Y)
    }
    
    // Assigned as "which frame are we currently on?"
    background_Y = this.props.frameCount ? this.state.index % this.props.frameCount : 0;

    // background_Y % this.props.framesPerRow == "which column are we in?"
    var background_X = this.props.framesPerRow ? background_Y % this.props.framesPerRow * (width + padding * 2) + padding : 0;
    
    // Assign background_Y as the actual "which row are we in?"
    background_Y = this.props.framesPerRow ? Math.floor(background_Y / this.props.framesPerRow) * (height + padding * 2) + padding : 0;
    
    var h = this.props.frameCount && this.props.frameCount > 1 && this.props.animationTrigger === n.CLICK || this.$3(this.props.packID);
    
    h = this.props.forceCursorPointer || h ? 'pointer' : 'default';
    
    if (!this.state.hasAnimated || !this.props.spriteURI || !spriteURI || !this.props.framesPerRow || !this.props.framesPerCol) return {
      backgroundImage: this.$4() || !this.props.sourceURI ? null : 'url(' + this.props.sourceURI.toString() + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: width + 'px ' + height + 'px',
      cursor: h,
      height: height,
      width: width
    };
     else return {
      backgroundSize: (width + padding * 2) * this.props.framesPerRow + 'px ' + (height + padding * 2) * this.props.framesPerCol + 'px',
      backgroundImage: 'url(' + spriteURI.toString() + ')',
      backgroundPosition: - background_X + 'px ' + - background_Y + 'px',
      cursor: h,
      height: height,
      width: width,
      imageRendering: '-webkit-optimize-contrast'
    }
  };