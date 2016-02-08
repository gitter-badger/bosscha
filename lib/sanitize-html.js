// https://github.com/spalger/marked-sanitized/blob/master/lib/markedSanitize.js

var allowedTags = [
  /* headings */ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8',
  /* prose */ 'p', 'div', 'blockquote', 'summary', 'details',
  /* formatted */ 'pre',
  /* inline */ 'a', 'img', 'b', 'i', 'strong', 'em', 'tt', 'code', 'ins', 'del', 'sup', 'sub', 'kbd', 'samp', 'q', 'var', 's', 'strike',
  /* lists */ 'ol', 'ul', 'li', 'dl', 'dt', 'dd',
  /* tables */ 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th',
  /* breaks */ 'br', 'hr',
  /* Ruby (East Asian) */ 'ruby', 'rt', 'rp'
];

var allowedSchemes = [ 'http', 'https', 'mailto' ];

var allowedAttributes = {
  a: [ 'href' ],
  img: [ 'src' ],
  div: [ 'itemscope', 'itemtype' ]
};

var alwaysAllowed = [
  'abbr', 'accept', 'accept-charset', 'accesskey', 'action', 'align', 'alt', 'axis',
  'border', 'cellpadding', 'cellspacing', 'char', 'charoff', 'charset', 'checked',
  'cite', 'clear', 'cols', 'colspan', 'color', 'compact', 'coords', 'datetime', 'dir',
  'disabled', 'enctype', 'for', 'frame', 'headers', 'height', 'hreflang', 'hspace',
  'ismap', 'label', 'lang', 'longdesc', 'maxlength', 'media', 'method', 'multiple',
  'name', 'nohref', 'noshade', 'nowrap', 'prompt', 'readonly', 'rel', 'rev', 'rows',
  'rowspan', 'rules', 'scope', 'selected', 'shape', 'size', 'span', 'start', 'summary',
  'tabindex', 'target', 'title', 'type', 'usemap', 'valign', 'value', 'vspace', 'width',
  'itemprop'
];

allowedTags.forEach(function (tag) {
  var existingAllowed = allowedAttributes[tag] || [];
  allowedAttributes[tag] = existingAllowed.concat(alwaysAllowed)
});

sanitizeOpts = {
  allowedTags: allowedTags,
  allowedSchemes: allowedSchemes,
  allowedAttributes: allowedAttributes
};
