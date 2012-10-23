
(function(Weebly, $) {


Weebly.Slideshow = window.wSlideshow = {
	getSlideshowImages: getSlideshowImages,
	updateSize: updateSize,
	generateHTML: generateHTML,
	init: init,
	updatePhotos: updatePhotos,
	render: render
};


var slideshowOptions = {};
var slideshows = {};
var isTouch = 'ontouchstart' in document.documentElement;


function getSlideshowImages(elementID) {
	return slideshows[elementID].getPhotos();
}


function updateSize() { // TODO: rename to updateSizes
	var changed = false;
	$.each(slideshows, function(i, slideshow) {
		whenThemeCSSLoaded(function() {
			slideshow.updateSize();
		});
		changed = true;
	});
	return changed;
}


function generateHTML(elementID, rawOptions) {
	slideshowOptions[elementID] = processElementOptions(rawOptions);
	return "<div id='" + elementID + "-slideshow' style='height:1000px'></div>"; // to maintain scroll state
}


function init(elementID) {
	var e = $('#' + elementID + '-slideshow');
	var slideshow = new Slideshow(e, slideshowOptions[elementID]);
	slideshows[elementID] = slideshow;
	whenThemeCSSLoaded(function() {
		slideshow.render();
		e.height('');
	});
}


function updatePhotos(elementID, photos) { // TODO: rename to updateImages
	if (slideshows[elementID]) {
		slideshows[elementID].destroy();
		var options = slideshowOptions[elementID];
		options.images = photos;
		slideshows[elementID] = new Slideshow($('#' + elementID + '-slideshow'), options);
		slideshows[elementID].render();
	}
}


function render(rawOptions) {
	var options = processElementOptions(rawOptions);
	var elementID = options.elementID;
	var slideshow = new Slideshow($('#' + elementID + "-slideshow"), options);
	slideshows[elementID] = slideshow;
	whenThemeCSSLoaded(function() {
		slideshow.render();
	});
}


function processElementOptions(rawOptions) {
	var links = rawOptions.nav;
	var linkTiers = 1;
	if (links == 'double_thumbnails') {
		links = 'thumbnails';
		linkTiers = 2;
	}
	else if (links == 'none') {
		links = false;
	}
	return {
		elementID: rawOptions.elementID,
		links: links,
		linkLocation: rawOptions.navLocation,
		linkTiers: linkTiers,
		captionLocation: rawOptions.captionLocation,
		slide: rawOptions.transition == 'slide',
		autoplay: parseInt(rawOptions.autoplay),
		speed: parseInt(rawOptions.speed),
		aspectRatio: rawOptions.aspectRatio || 'auto',

		// If property entries are not in DB, old version of element-content-producing
		// code (before element php refactor) don't replace anything.
		// Thus, these properties could have values of "%%SHOWCONTROLS%%" or "%%RANDOMSTART%%".
		// Or old published slideshows might not have these entries as all (undefined).
		showControls: rawOptions.showControls !== 'false', // default is true
		randomStart: rawOptions.randomStart === 'true', // default is false

		images: rawOptions.images || []
	};
}



var PRELOAD = 5;
var ASPECT_RATIOS = {
	'16:9' : 16/9,
	'3:2'  : 3/2,
	'4:3'  : 4/3
};
var LINK_MOVE_EDGES = .40;
var LINK_ACCELERATION = 1;
var LINK_MAX_VELOCITY_SQRT = 4;


function Slideshow(element, options) {
	var t = this;
	t.render = render;
	t.destroy = destroy;
	t.getPhotos = function() { return photos };
	t.updateSize = updateSize;


	element = $(element);
	options = options || {};


	var photos = options.images || [];
	var content;
	var slideContainer;
	var slides = [];
	var slideImgs = [];
	var slideImgWidths = [];
	var slideImgHeights = [];
	var slideImgWraps = [];
	var linkContainer;
	var linkContainerInner;
	var links;

	var slideIndex;
	var prevButton;
	var nextButton;
	var horizontalLinks; // bool
	var overlayTopLeft, overlayTopRight, overlayLeft, overlayRight;
	var allOverlays;
	var playing = false;
	var playPauseID = 0;
	var playButton;
	var pauseButton;
	var playTimeoutID;
	var controlsVisible = true;
	var controlsFadeEffect;
	var mouseActionID = 0;
	var contentWidth;
	var contentHeight;
	var thumbnailWidth;
	var thumbnailHeight;

	var linkContainerX;
	var linkContainerY;
	var linkContainerWidth;
	var linkContainerHeight;
	var linkContainerInnerWidth;
	var linkContainerInnerHeight;
	var linkX = 0;
	var linkY = 0;
	var linkMin;
	var linkMax;
	var isMouseOverLinks = false;
	var linkHoverID = 0;
	var linkTargetVelocity = 0;
	var linkVelocity = 0;
	var linkIntervalID;
	
	var dummyAnimElm = $("<div/>").css('opacity', 0);




	/* rendering
	-------------------------------------------------------------------------------*/


	function render() {
		element
			.addClass('wslide')
			.html(
				"<table class='wslide-main'><tbody></tbody></table>"
			);
		var table = element.find('table');
		var tbody = element.find('tbody');
		var content = renderContent()
			.on('mousemove', mouseAction)
			.on('mousedown', mouseAction);
		if (!options.links || !photos.length) {
			var tr = $("<tr/>");
			var td = $("<td/>");
			td.append(content);
			tr.append(td);
			tbody.append(tr);
		}else{
			links = [];
			var linkLocation = options.linkLocation;
			horizontalLinks = linkLocation == 'top' || linkLocation == 'bottom';
			var linkContainer = renderLinks();
			var linkCell = $("<td class='wslide-link-cell'/>").append(linkContainer);
			var contentCell = $("<td/>").append(content);
			if (horizontalLinks) {
				linkCell.width('auto'); // for IE
				var tr1 = $("<tr/>");
				var tr2 = $("<tr/>");
				if (linkLocation == 'top') {
					tr1.append(linkCell);
					tr2.append(contentCell);
				}else{
					tr1.append(contentCell);
					tr2.append(linkCell);
				}
				tbody.append(tr1);
				tbody.append(tr2);
			}else{
				var tr = $("<tr/>");
				if (linkLocation == 'left') {
					tr.append(linkCell);
					tr.append(contentCell);
				}else{
					tr.append(contentCell);
					tr.append(linkCell);
				}
				tbody.append(tr);
			}
		}
		initSize();
		if (photos.length) {
			if (options.randomStart) {
				go(Math.floor(Math.random() * photos.length));
			}else{
				go(0);
			}
		}
		hideControls();
		if (options.autoplay) {
			play();
		}
		$(window).on('resize', windowResize);
	}


	function destroy() {
		element.empty();
		_destroy();
	}


	function _destroy() {
		playing = false;
		if (playTimeoutID) {
			clearTimeout(playTimeoutID);
			playTimeoutID = null;
		}
		$(window).on('resize', windowResize);
	}


	function renderContent() {
		content = $(
			"<div class='wslide-content'>" +
				"&nbsp;" + // for IE
				"<div class='wslide-content-inner'>" +
					"<div class='wslide-slides'></div>" +
				"</div>" +
				"<div class='wslide-overlay-top-left'></div>" +
				"<div class='wslide-overlay-top-right'></div>" +
				"<div class='wslide-overlay-left'></div>" +
				"<div class='wslide-overlay-right'></div>" +
			"</div>"
		);
		slideContainer = content.find('div.wslide-slides');
		overlayTopLeft = content.find('div.wslide-overlay-top-left');
		overlayTopRight = content.find('div.wslide-overlay-top-right');
		overlayLeft = content.find('div.wslide-overlay-left');
		overlayRight = content.find('div.wslide-overlay-right');
		allOverlays = overlayTopLeft.add(overlayTopRight).add(overlayLeft).add(overlayRight);
		if (photos.length > 1) {
			overlayTopLeft
				.append(renderPlay())
				.append(renderPause());
			if (!options.links) {
				if (options.slide) {
					overlayLeft.append(renderPrev());
					overlayRight.append(renderNext());
				}else{
					overlayTopRight
						.append(renderPrev())
						.append('&nbsp;')
						.append(renderNext());
				}
			}
		}
		return content;
	}


	function renderPlay() {
		playButton = $(
			"<span class='wslide-play wslide-button'>" +
				"<span class='wslide-button-inner'>Play <span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>" +
			"</span>"
			)
			.on('click', play);
		return playButton;
	}


	function renderPause() {
		pauseButton = $(
			"<span class='wslide-pause wslide-button'>" +
				"<span class='wslide-button-inner'>Pause <span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>" +
			"</span>"
			)
			.on('click', pause);
		return pauseButton;
	}


	function renderPrev() {
		prevButton = $(
			"<span class='wslide-prev wslide-button'>" +
				"<span class='wslide-button-inner'><span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>" +
			"</span>"
			)
			.on('click', function() {
				pause();
				prev();
			});
		return prevButton;
	}


	function renderNext() {
		nextButton = $(
			"<span class='wslide-next wslide-button'>" +
				"<span class='wslide-button-inner'><span class='wslide-button-icon'></span></span>" +
				"<span class='wslide-button-bg'></span>" +
			"</span>"
			)
			.on('click', function() {
				pause();
				next();
			});
		return nextButton;
	}


	function renderLinks() {
		var linkLocation = options.linkLocation;
		var linkTiers = options.linkTiers;
		var classes = 'wslide-links wslide-links-' + options.linkLocation;
		if (options.links) {
			if (options.links == 'thumbnails') {
				classes += ' wslide-thumbnail-links';
			}else{
				classes += ' wslide-number-links';
			}
		}
		linkContainer = $(
			"<div class='" + classes + "'>" +
				"<div class='wslide-links-inner'>" +
					"<table><tbody></tbody></table>" +
				"</div>" +
			"</div>"
		);
		if (!isTouch) {
			linkContainer
				.on('mouseover', linkContainerMouseover)
				.on('mousemove', linkContainerMousemove)
				.on('mouseout', linkContainerMouseout);
		}
		linkContainerInner = linkContainer.children().first();
		initLinkSwiping(linkContainerInner);
		var tbody = linkContainer.find('tbody');
		if (horizontalLinks) {
			var trs = [];
			for (var i=0; i<linkTiers; i++) {
				trs[i] = $("<tr/>");
				tbody.append(trs[i]);
			}
			for (var i=0; i<photos.length; i++) {
				trs[i % linkTiers].append(renderLink(photos[i], i));
			}
		}else{
			var photoCnt = photos.length;
			for (var r=0, i=0; i<photoCnt; r++) {
				var tr = $("<tr/>");
				for (var c=0; c<linkTiers && i<photoCnt; c++, i++) {
					tr.append(renderLink(photos[i], i));
				}
				tbody.append(tr);
			}
		}
		if (isTouch) {
			whenPhotoSwipeLoaded(function() {
				Code.PhotoSwipe.attach(
					linkContainer.find('a').toArray(),
					{
						captionAndToolbarFlipPosition: true,
						captionAndToolbarAutoHideDelay: 0, // always show
						loop: false
					}
				);
			});
		}
		return linkContainer;
	}


	function renderLink(photo, i) {
		var td = $("<td/>");
		if (options.links == 'numbers') {
			td.append(
				"<a class='wslide-link wslide-link-number'>" +
					"<div class='wslide-link-inner1'>" +
						"<div class='wslide-link-inner2'>" +
							(i + 1) +
						"</div>" +
					"</div>" +
				"</a>"
			);
		}else{
			td.append(
				"<a class='wslide-link wslide-link-thumbnail'>" +
					"<div class='wslide-link-inner1'>" +
						"<div class='wslide-link-inner2'>" +
							"<img style='visibility:hidden' />" +
						"</div>" +
					"</div>" +
				"</a>"
			);
			var img = td.find('img');
			setTimeout(function() {
				loadImage(img[0], thumbnailURL(photo), function() {
					sizeThumbnail(img, photo);
					img.css('visibility', '');
				});
			},0); // let the first slide load first
		}
		var a = td.find('a');
		if (isTouch) {
			a.attr('href', largeURL(photo))
			 .attr('title', photo.caption || '');
		}
		else {
			a.on('click', function() {
				pause();
				go(i);
			});
		}
		initLinkSwiping(a);
		links[i] = a;
		return td;
	}


	function addSlide(photo, i) {
		var linkNewWindow = false;
		var link = photo.link;
		if (link) {
			var origLink = link;
			link = link.replace('weeblylink_new_window', '');
			if (link != origLink) {
				linkNewWindow = true;
			}
		}
		var slide = $(
			"<div class='wslide-slide wslide-slide-loading'>" +
				"<div class='wslide-slide-inner1'>" +
					"<div class='wslide-slide-inner2' style='visibility:hidden'>" +
						(link ? "<a>" : '') +
						"<img />" +
						(photo.caption ?
							"<div class='wslide-caption " +
								(options.captionLocation=='top' ? 'wslide-caption-top' : 'wslide-caption-bottom') + "'>" +
								"<div class='wslide-caption-text'>" + photo.caption + "</div>" + // already escaped
								"<div class='wslide-caption-bg'></div>" +
							"</div>"
							: '') +
						(link ? "</a>" : '') +
					"</div>" +
				"</div>" +
			"</div>"
		);
		slide.css('left', '-101%'); // "hide"
		slideContainer.append(slide);
		var img = slide.find('img');
		var imgWrap = img.up('.wslide-slide-inner2');
		slides[i] = slide;
		slideImgs[i] = img;
		slideImgWraps[i] = imgWrap;
		slide.find('a').each(function(i, a) {
			a = $(a);
			if (window.currentSite) {
				// in editor
				a.attr('href', '#');
				a.on('click', function() { return false });
				a.attr('title', /*tl(*/"Links active once published"/*)tl*/);
			}else{
				if (link) {
					a.attr('href', link);
					if (linkNewWindow) {
						a.attr('target', '_blank');
					}
				}
			}
		});
		loadImage(img[0], largeURL(photo), function() {
			slide.removeClass('wslide-slide-loading');
			slideImgWidths[i] = img[0].width;
			slideImgHeights[i] = img[0].height;
			sizeImage(i);
			if (i == slideIndex) { // is current slide
				sizeOverlays(i);
				if (playing) {
					timedNext();
				}
			}
			imgWrap.css('visibility', '');
		});
		return slide;
	}




	/* sizing
	------------------------------------------------------------------------------------*/


	function initSize() {
		calcThumbnailDims();
		updateSize();
	}


	function updateSize() {

		if (isDead() || !content) {
			return;
		}

		if (linkContainer && !horizontalLinks) {
			// need to set width of vertical link container
			linkContainerWidth = linkContainerInner.outerWidth();
			linkContainer.width(linkContainerWidth);
		}

		contentWidth = content.outerWidth();
		contentHeight = Math.round(contentWidth / getAspectRatio());
		content.height(contentHeight);

		if (linkContainer) {
			linkContainerInnerWidth = linkContainerInner.outerWidth();
			linkContainerInnerHeight = linkContainerInner.outerHeight();
			if (horizontalLinks) {
				linkContainerWidth = contentWidth;
				linkContainerHeight = linkContainerInner.outerHeight();
				linkContainer.height(linkContainerHeight);
				linkMin = linkContainerWidth - linkContainerInnerWidth;
				linkMax = 0;
				/* center
				if (linkContainerInnerWidth < linkContainerWidth) {
					linkContainerInner.css('left', linkContainerWidth/2 - linkContainerInnerWidth/2);
				}
				*/
			}else{
				// (linkContainerWidth calculated above)
				linkContainerHeight = contentHeight;
				linkContainer.height(linkContainerHeight);
				linkMin = linkContainerHeight - linkContainerInnerHeight;
				linkMax = 0;
			}
		}

		if (slideImgWidths[slideIndex] && slideImgHeights[slideIndex]) { // is current image loaded?
			sizeImage(slideIndex);
			sizeOverlays(slideIndex);
		}

	}


	function getAspectRatio() {
		if (options.aspectRatio == 'auto') {
			if (!photos.length) {
				return 16/9;
			}
			var scores = {};
			for (var i=0; i<photos.length; i++) {
				var photoRatio = photos[i].width / photos[i].height;
				var bestKey;
				var bestDiff = false;
				$.each(ASPECT_RATIOS, function(key, aspectRatio) {
					var diff = Math.abs(aspectRatio - photoRatio);
					if (bestDiff === false || diff < bestDiff) {
						bestDiff = diff;
						bestKey = key;
					}
				});
				scores[bestKey] = (scores[bestKey] || 0) + 1;
			}
			var winnerKey;
			var winnerScore = false;
			$.each(scores, function(key, score) {
				if (winnerScore === false || score > winnerScore) {
					winnerScore = score;
					winnerKey = key;
				}
			});
			return ASPECT_RATIOS[winnerKey];
		}else{
			return ASPECT_RATIOS[options.aspectRatio];
		}
	}


	function calcThumbnailDims() {
		thumbnailWidth = 0;
		thumbnailHeight = 0;
		if (linkContainer) {
			var thumbnails = linkContainer.find('a.wslide-link-thumbnail').first();
			if (thumbnails.length) {
				var inner = thumbnails.children().first();
				thumbnailWidth = inner.outerWidth();
				thumbnailHeight = inner.outerHeight();
			}
		}
	}


	function sizeThumbnail(img, photo) {
		var naturalWidth = parseInt(photo.width);
		var naturalHeight = parseInt(photo.height);
		var sx = thumbnailWidth / naturalWidth;
		var sy = thumbnailHeight / naturalHeight;
		var s = Math.max(sx, sy);
		var w = Math.ceil(naturalWidth * s);
		var h = Math.ceil(naturalHeight * s);
		img.attr('width', w);
		img.attr('height', h);
		img.css('top', -Math.round(h/2) + 'px');
		img.css('left', -Math.round(w/2) + 'px');
	}


	function sizeImage(i) {
		var imgWrap = slideImgWraps[i];
		var img = slideImgs[i];
		var scale = Math.min(
			contentWidth / slideImgWidths[i],
			contentHeight / slideImgHeights[i],
			1
		);
		var w = Math.ceil(slideImgWidths[i] * scale);
		var h = Math.ceil(slideImgHeights[i] * scale);
		if (w+1 <= slideImgWidths[i]) {
			w++;
			h++;
		}
		img.width(w);
		imgWrap.css('width', w);
		imgWrap.css('left', -Math.round(w / 2));
		imgWrap.css('top', -Math.round(h / 2));
	}


	var indentLeft = 0;
	var indentRight = 0;
	var indentTop = 0;
	var indentBottom = 0;


	function sizeOverlays(i) {
		var slide = slides[i];
		var slideOffset = slide.offset();
		var slideWidth = slide.outerWidth();
		var slideHeight = slide.outerHeight();
		var img = slideImgs[i];
		var imgOffset = img.offset();
		var imgWidth = img.outerWidth();
		var imgHeight = img.outerHeight();
		indentLeft = Math.max(0, imgOffset.left - slideOffset.left);
		indentRight = Math.max(0, (slideOffset.left + slideWidth) - (imgOffset.left + imgWidth));
		indentTop = Math.max(0, imgOffset.top - slideOffset.top);
		if (photos[i].caption && options.captionLocation == 'top') {
			indentTop += slides[i].find('div.wslide-caption').outerHeight();
		}
		indentBottom = Math.max(0, (slideOffset.top + slideHeight) - (imgOffset.top + imgHeight));
	}




	/* slide transition
	-----------------------------------------------------------------------------------*/


	function _go(newIndex) {

		var needSizeOverlays = false;
		var oldIndex = slideIndex;
		slideIndex = newIndex;

		if (slides[newIndex]) {
			if (slideImgWidths[newIndex] && slideImgHeights[newIndex]) { // is loaded?
				sizeImage(newIndex);
				needSizeOverlays = true;
				if (playing) {
					timedNext();
				}
			}
		}

		preloadSlides(newIndex);

		if (links) {
			if (oldIndex !== undefined) {
				links[oldIndex].removeClass('wslide-link-active');
			}
			links[newIndex].addClass('wslide-link-active');
		}

		if (prevButton) {
			if (newIndex > 0) {
				prevButton.show();
			}else{
				prevButton.hide();
			}
		}

		updatePlayPauseButtons();

		return needSizeOverlays;
	}


	function go(newIndex, transitionForward) {

		if (newIndex != slideIndex) {

			var oldIndex = slideIndex;
			var needSizeOverlays = _go(newIndex);

			if (options.slide) {

				if (oldIndex === undefined) {

					slides[newIndex].css('left', 0); // "show"
					if (needSizeOverlays) {
						sizeOverlays(newIndex);
					}

				}else{

					var sign = (transitionForward || newIndex > oldIndex) ? 1 : -1;
					dummyAnimElm.animate({ opacity: 1 }, { // opacity not actually used. `n` is all we want
						duration: 500,
						step: function(n) {
							slides[newIndex].css('left', sign * Math.round(contentWidth * (1 - n)));
							if (oldIndex !== undefined) {
								slides[oldIndex].css('left', -sign * Math.round(contentWidth * n));
							}
						},
						complete: function() {
							if (needSizeOverlays) {
								sizeOverlays(newIndex);
							}
							if (oldIndex !== undefined) {
								slides[oldIndex].css('left', '-101%'); // "hide"
							}
							dummyAnimElm.css('opacity', 0);
						}
					});

				}

			}else{

				var newSlideInner = slides[newIndex].find('.wslide-slide-inner2');
				var oldSlideInner;
				if (oldIndex !== undefined) {
					oldSlideInner = slides[oldIndex].find('.wslide-slide-inner2');
				}
				
				dummyAnimElm.animate({ opacity: 1 }, { // opacity not actually used. `n` is all we want
					duration: 500,
					step: function(n) {
						newSlideInner.css('opacity', n);
						slides[newIndex].css('left', 0); // "show"
						if (oldIndex !== undefined) {
							oldSlideInner.css('opacity', 1 - n);
						}
					},
					complete: function() {
						if (needSizeOverlays) {
							sizeOverlays(newIndex);
						}
						if (oldIndex !== undefined) {
							slides[oldIndex].css('left', '-101%'); // "hide"
						}
						dummyAnimElm.css('opacity', 0);
					}
				});

			}
		}
	}


	function preloadSlides(startingAt) {
		for (var i=startingAt; i<=startingAt+PRELOAD && i<photos.length; i++) {
			if (i>=0 && !slides[i]) {
				addSlide(photos[i], i); // populates slides[i]
			}
		}
	}




	/* 	navigation methods
	-----------------------------------------------------------------------*/


	function prev() {
		var i = slideIndex - 1;
		if (i >= 0) {
			go(i);
			putLinkInView(i, false);
		}
	}


	function next() {
		var i = (slideIndex + 1) % photos.length;
		go(i, true);
		putLinkInView(i, true);
	}


	function timedNext() {
		playTimeoutID = setTimeout(
			function() {
				if (!isDead()) {
					next();
				}
			},
			options.speed * 1000
		);
	}



	/* link mouseover sliding
	--------------------------------------------------------------------------*/


	function linkContainerMouseover(ev) {
		isMouseOverLinks = true;
		linkHoverID++;
		if (horizontalLinks) {
			linkContainerX = linkContainer.offset().left;
		}else{
			linkContainerY = linkContainer.offset().top;
		}
	}


	function linkContainerMousemove(ev) {
		if (horizontalLinks && linkContainerInnerWidth < linkContainerWidth ||
			!horizontalLinks && linkContainerInnerHeight < linkContainerHeight) {
				return;
			}
		var n;
		if (horizontalLinks) {
			n = (ev.pageX - linkContainerX) / linkContainerWidth;
		}else{
			n = (ev.pageY - linkContainerY) / linkContainerHeight;
		}
		var v;
		if (n < LINK_MOVE_EDGES) {
			v = (1 - (n / LINK_MOVE_EDGES)) * LINK_MAX_VELOCITY_SQRT;
			v *= v;
		}
		else if (n > (1-LINK_MOVE_EDGES)) {
			v = ((n - (1-LINK_MOVE_EDGES)) / LINK_MOVE_EDGES) * LINK_MAX_VELOCITY_SQRT;
			v *= -v;
		}
		else {
			v = 0;
		}
		v = Math.round(v);
		if (linkTargetVelocity != v) {
			linkTargetVelocity = v;
			if (!linkIntervalID) {
				linkIntervalID = setInterval(linkMove, 35);
			}
		}
	}


	function linkMove() {
		if (linkVelocity < linkTargetVelocity) {
			linkVelocity += LINK_ACCELERATION;
		}
		else if (linkVelocity > linkTargetVelocity) {
			linkVelocity -= LINK_ACCELERATION;
		}
		if (!linkVelocity && !linkTargetVelocity) {
			clearInterval(linkIntervalID);
			linkIntervalID = null;
		}else{
			if (horizontalLinks) {
				linkX = Math.min(linkMax, Math.max(linkMin, linkX + linkVelocity));
				linkContainerInner.css('left', linkX);
			}else{
				linkY = Math.min(linkMax, Math.max(linkMin, linkY + linkVelocity));
				linkContainerInner.css('top', linkY);
			}
		}
	}


	function linkContainerMouseout(ev) {
		var savedID = ++linkHoverID;
		setTimeout(function() {
			if (savedID == linkHoverID) {
				linkTargetVelocity = 0;
				isMouseOverLinks = false;
			}
		}, 10);
	}




	/* putting links in view
	---------------------------------------------------------------------------*/


	function putLinkInView(i, toFront) {
		if (links && !isMouseOverLinks) {
			var link = links[i];
			if (horizontalLinks) {
				var localLeft = link.position().left;
				var left = localLeft + linkContainerInner.position().left;
				var width = link.outerWidth();
				if (left < 0 || left + width > linkContainerWidth) {
					if (toFront) {
						tweenLinkX(-localLeft);
					}else{
						tweenLinkX(-(localLeft + width - linkContainerWidth));
					}
				}
			}else{
				var localTop = link.position().top;
				var top = localTop + linkContainerInner.position().top;
				var height = link.outerHeight();
				if (top < 0 || top + height > linkContainerHeight) {
					if (toFront) {
						tweenLinkY(-localTop);
					}else{
						tweenLinkY(-(localTop + height - linkContainerHeight));
					}
				}
			}
		}
	}


	function tweenLinkX(newX) {
		newX = Math.min(linkMax, Math.max(linkMin, newX));
		linkContainerInner.animate({ left: newX }, 500);
	}


	function tweenLinkY(newY) {
		newY = Math.min(linkMax, Math.max(linkMin, newY));
		linkContainerInner.animate({ top: newY }, 500);
	}



	function isDead() {
		if (!element.parents('body').length) {
			// element is gone now (might have switched to a different page in editor)
			_destroy();
			return true;
		}
		return false;
	}



	/* playing / pausing
	-------------------------------------------------------------------------*/


	function play() {
		if (photos.length > 1 && !playing) {
			element.addClass('wslide-playing');
			playing = true;
			updatePlayPauseButtons();
			var savedID = ++playPauseID;
			setTimeout(function() {
				if (savedID == playPauseID) {
					fadeControls();
				}
			}, 1000);
			if (slideImgWidths[slideIndex] && slideImgHeights[slideIndex]) { // current slide already loaded
				timedNext();
			}
		}
	}


	function pause() {
		if (playing) {
			element.removeClass('wslide-playing');
			playing = false;
			updatePlayPauseButtons();
			clearTimeout(playTimeoutID);
			playTimeoutID = null;
			playPauseID++;
		}
	}


	function updatePlayPauseButtons() {
		if (photos.length > 1) {
			if (playing) {
				playButton.css('opacity', 0).hide();
				pauseButton.css('opacity', 1).show();
			}else{
				playButton.css('opacity', 1).show();
				pauseButton.css('opacity', 0).hide();
			}
		}
	}



	/* control fading
	---------------------------------------------------------------------------*/


	function showControls(skipIndent) {
		stopFadeControls();
		if (!skipIndent) {
			indentControls();
		}
		allOverlays.show().css('opacity', 1);
		controlsVisible = true;
	}


	function indentControls() {
		overlayTopLeft.css('padding-top', indentTop);
		overlayTopLeft.css('padding-left', indentLeft);
		overlayTopRight.css('padding-top', indentTop);
		overlayTopRight.css('padding-right', indentRight);
		overlayLeft.css('padding-left', indentLeft);
		overlayRight.css('padding-right', indentRight);
	}


	function hideControls() {
		stopFadeControls();
		allOverlays.hide();
		controlsVisible = false;
	}


	function fadeControls() {
		if (controlsVisible) {
			controlsVisible = false;
			allOverlays.animate({ opacity: 0 }, {
				duration: 1000,
				complete: function() {
					hideControls();
				}
			});
		}
	}


	function stopFadeControls() {
		allOverlays.stop(true); // true = clear queue
	}


	function mouseAction() {
		if (options.showControls) {
			if (!controlsVisible) {
				showControls(
					allOverlays.queue().length // skipIndent? = if any animations in the queue
				);
			}
			var savedID = ++mouseActionID;
			setTimeout(function() {
				if (savedID == mouseActionID) {
					if (controlsVisible) {
						fadeControls();
					}
				}
			}, 1000);
		}
	}



	/* Touchscreen Swiping
	-----------------------------------------------------------------------------*/

	var IS_DEBUGGING = false;
	var TOUCHSTART = IS_DEBUGGING ? 'mousedown' : 'touchstart';
	var TOUCHMOVE = IS_DEBUGGING ? 'mousemove' : 'touchmove';
	var TOUCHEND = IS_DEBUGGING ? 'mouseup' : 'touchend';
	var TOUCHCANCEL = IS_DEBUGGING ? 'xxx' : 'touchcancel';

	// fuck: http://code.google.com/p/android/issues/detail?id=19827

	function initLinkSwiping(elm) {

		function touchstart(ev) {

			pause();

			if (linkIntervalID) {
				clearInterval(linkIntervalID);
				linkIntervalID = null;
				linkVelocity = 0;
			}

			var origCoord = getCoord(ev);
			var origLinkX = linkX;
			var origLinkY = linkY;
			var delta;
			var p0 = null;
			var p1 = null;
			var simulateClick = true;

			function touchmove(ev) {
				var coord = getCoord(ev);
				p0 = p1;
				p1 = coord;
				delta = coord - origCoord;
				if (Math.abs(delta) > 15) {
					simulateClick = false;
				}
				if (horizontalLinks) {
					linkX = origLinkX + delta;
					linkX = Math.max(linkMin, linkX);
					linkX = Math.min(linkMax, linkX);
					linkContainerInner.css('left', linkX);
				}else{
					linkY = origLinkY + delta;
					linkY = Math.max(linkMin, linkY);
					linkY = Math.min(linkMax, linkY);
					linkContainerInner.css('top', linkY);
				}
			}

			function touchend(ev) {
				if (simulateClick && elm.is('a')) {
					// make photoswipe show up
					window.Code.Util.Events.fire(elm[0], 'click');
				}
				if (p1 === null || p0 === null) {
					linkVelocity = 0;
				}else{
					linkVelocity = p1 - p0;
					linkVelocity = Math.max(-15, linkVelocity);
					linkVelocity = Math.min(15, linkVelocity);
				}
				linkTargetVelocity = 0;
				if (!linkIntervalID) {
					linkIntervalID = setInterval(linkMove, 35);
				}
				$(document)
					.off(TOUCHMOVE, touchmove)
					.off(TOUCHEND, touchend)
					.off(TOUCHCANCEL, touchend);
			}

			$(document)
				.off(TOUCHMOVE, touchmove)
				.off(TOUCHEND, touchend)
				.off(TOUCHCANCEL, touchend);

			return false;

		}

		elm.on(TOUCHSTART, touchstart);

	}


	function getCoord(ev) {
		if (horizontalLinks) {
			return touchCoordObj(ev).pageX;
		}else{
			return touchCoordObj(ev).pageY;
		}
	}


	function touchCoordObj(ev) {
		if (IS_DEBUGGING) {
			return ev;
		}
		return ev.touches[0];
	}




	/* window resizing
	--------------------------------------------------------------*/

	var windowResizeID = 0;

	function windowResize() {
		var savedID = ++windowResizeID;
		setTimeout(function() {
			if (savedID == windowResizeID) {
				if (!isDead()) {
					updateSize();
				}
			}
		}, 500);
	}


}



function thumbnailURL(photo) {
	var url = photo.url;
	if (!url.match("/weebly/images/")) {
		url = '/uploads/' + url;
	}
	return url;
}


function largeURL(photo) {
	var url = photo.url;
	if (!url.match("/weebly/images/")) {
		url = '/uploads/' + url;
		url = url.replace(/^(.*)\.([^\.]+)$/, "$1_orig.$2");
	}
	return url;
}


function loadImage(imgNode, src, onload) {
	var intervalID = null;
	var called = false;
	function done() {
		if (intervalID) {
			clearInterval(intervalID);
			intervalID = null;
		}
		if (!called) {
			called = true;
			onload();
		}
	};
	imgNode.onload = done;
	imgNode.src = src;
	if (imgNode.complete) {
		done();
	}else{
		intervalID = setInterval(function() {
			if (imgNode.complete) {
				done();
			}
		}, 500);
	}
}



/************************** helpers for theme-css-loaded detection ***********************/
// ripped from flyout_menus.js


function isThemeCSSLoaded() {
	var stylePrefix = window.STYLE_PREFIX || 'weebly';
	if (window.isMobileTheme) {
		return true; // hack
	}
	for (var i=0; i<document.styleSheets.length; i++) {
		try {
			if (document.styleSheets[i].title == stylePrefix+'-theme-css') {
				var sheet = document.styleSheets[i];
				var rules = sheet.cssRules || sheet.rules;
				return rules && rules.length > 0;
			}
		}
		catch (err) {}
	}
	if (window.currentSite) {
		// in the editor
		// there will always be a weebly-theme-css, so if it isn't in the DOM yet, it is coming
		return false;
	}else{
		// on published site
		// if there is no weebly-theme-css stylesheet at this point, there will never be, so we are done
		return true;
	}
}


function whenThemeCSSLoaded(callback) {
	if (isThemeCSSLoaded()) {
		callback();
	}else{
		var intervalID = setInterval(function() {
			if (isThemeCSSLoaded()) {
				clearInterval(intervalID);
				callback();
			}
		}, 200);
	}
}


})(Weebly, Weebly.jQuery);
