/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Cropped Image field.
 * @author wuxc08@gmail.com (Https://github.com/wuxc)
 */
'use strict';

goog.provide('Blockly.FieldImageCrop');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.math');
goog.require('goog.userAgent');

/**
 * Class for a cropped image.
 * @param {string} src The URL of the image.
 * @param {number} height Height of the displayed image.
 * @param {string=} opt_alt Optional alt text for when block is collapsed.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldImageCrop = function(src, height, opt_alt) {
  this.width_ = this.height_ = Number(height || 72);
  this.size_ = new goog.math.Size(this.width_,
      this.height_ + 2 * Blockly.BlockSvg.INLINE_PADDING_Y);
  // this.image_size_ = {width: this.width_, height: this.height_};
  this.text_ = opt_alt || '';
  this.bound_ = null;
  this.setValue(src);
};
goog.inherits(Blockly.FieldImageCrop, Blockly.Field);

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldImageCrop.prototype.EDITABLE = true;

/**
 * Install this image on a block.
 */
Blockly.FieldImageCrop.prototype.init = function() {
  if (this.fieldGroup_) {
    // ImageCrop has already been initialized once.
    return;
  }
  // Build the DOM.
  /** @type {SVGElement} */
  this.fieldGroup_ = Blockly.createSvgElement('g', {}, null);
  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none';
  }
  // add viewport
  /** @type {SVGElement} */
  this.svgElement_ = Blockly.createSvgElement('svg',
      {'width':this.width_ + 'px', 'height': this.height_ + 'px'}, this.fieldGroup_);
  /** @type {SVGElement} */
  this.imageElement_ = Blockly.createSvgElement('image',
      {'x':'0', 'y':'0',
       'width':this.width_ + '', 'height':this.height_ + '',
       'transform': "scale(1 1)"}, this.svgElement_);
  if (goog.userAgent.GECKO) {
    /**
     * Due to a Firefox bug which eats mouse events on image elements,
     * a transparent rectangle needs to be placed on top of the image.
     * @type {SVGElement}
     */
    this.rectElement_ = Blockly.createSvgElement('rect',
        {'height': '100%',
         'width': '100%',
         'fill-opacity': 0}, this.svgElement_);
  }
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
};

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldImageCrop.prototype.dispose = function() {
  goog.dom.removeNode(this.fieldGroup_);
  this.fieldGroup_ = null;
  this.svgElement_ = null;
  this.imageElement_ = null;
  this.rectElement_ = null;
};

/**
 * Set the alt text of this image.
 * @param {?string} alt New alt text.
 * @override
 */
Blockly.FieldImageCrop.prototype.setText = function(alt) {
  if (alt === null) {
    // No change if null.
    return;
  }
  this.text_ = alt;
};

/**
 * Get the source URL of this image.
 * @return {string} Current URL.
 * @override
 */
Blockly.FieldImageCrop.prototype.getValue = function() {
  return this.src_;
};

/**
 * Set the source URL of this image.
 * @param {?string} src New source.
 * @override
 */
Blockly.FieldImageCrop.prototype.setValue = function(src) {
  src = goog.isString(src) ? src : '';
  if (src == '' || src == this.src_) {
    return;
  }
  var self = this;
  var img = new Image();
  img.addEventListener('load', function(){
    self.src_ = src;
    // self.image_size_ = {'width': this.width, 'height': this.height};
    if (self.imageElement_) {
      self.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
      self.imageElement_.setAttribute('width', this.width + '');
      self.imageElement_.setAttribute('height', this.height + '');
      // update bound after image loaded.
      var bound;
      if (self.bound_ == null) {
        bound = {'left':0, 'top':0, 'width':Math.max(this.width, 10), 'height':Math.max(this.height, 10)};
      } else {
        bound = self.bound_;
        bound.width = Math.max(Math.min(this.width, bound.width), 10);
        bound.height = Math.max(Math.min(this.height, bound.height), 10);
        bound.left = (bound.left + bound.width < this.width) ? bound.left : 0;
        bound.top = (bound.top + bound.height < this.height) ? bound.top : 0;
      }
      self.setBound(bound);
    }
  });
  img.src = src;
};

/**
  * Update the bound of the crop area.
  */
Blockly.FieldImageCrop.prototype.setBound = function(bound) {
  if (bound === null) {
    return;
  }
  this.bound_ = bound;
  this.updateBound();
}

Blockly.FieldImageCrop.prototype.updateBound = function() {
  var scale = this.height_ / this.bound_.height;
  this.width_ = parseInt(this.bound_.width * scale);
  this.svgElement_.setAttribute('width', this.width_ + 'px');
  if (this.imageElement_) {
    this.imageElement_.setAttribute('x', '-' + this.bound_.left);
    this.imageElement_.setAttribute('y', '-' + this.bound_.top);
    scale = scale.toFixed(2);
    this.imageElement_.setAttribute('transform', 'scale(' + scale + ' ' + scale + ')');
  }
  this.size_.width = this.width_;
  // force update after width change.
  this.sourceBlock_.render();
}
