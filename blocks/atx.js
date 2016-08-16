'use strict';

// diagonal-stripe, ref: http://iros.github.io/patternfills/sample_svg.html
var defaultImage = "data:image/svg+xml;utf8,<svg height='100px' width='100px' xmlns='http://www.w3.org/2000/svg'>" +
        "<defs><pattern id='diagonal-stripe-1' patternUnits='userSpaceOnUse' width='10' height='10'>" +
        "<rect width='10' height='10' fill='white'/><path d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='black' stroke-width='1'/>" +
        "</pattern></defs>" +
        "<rect style='fill: url(#diagonal-stripe-1) #fff;' x='0' y='0' height='100%' width='100%'></rect></svg>";
var helpUrl = 'https://github.com/codeskyblue/AirtestX';

goog.provide('Blockly.Blocks.atx');

goog.require('Blockly.Blocks');

Blockly.Blocks.atx.HUE = 140;
Blockly.Blocks.atx.defaultImage = defaultImage;

// OLD: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gq8gdg
// NEW: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yfa7gg
Blockly.Blocks['atx_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("连接设备")
        .appendField(new Blockly.FieldDropdown([["Android", "android"], ["Windows", "windows"]]), "PLATFORM");
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2zccrz
Blockly.Blocks['atx_click'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("点击坐标 (")
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "X")
        .appendField(',')
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "Y")
        .appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#jv7ky8
Blockly.Blocks['atx_click_image'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("点击图片");
    this.appendValueInput("ATX_PATTERN")
        .setCheck(["String", "ATX_PATTERN"])
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .appendField("超时时间")
        .appendField(new Blockly.FieldTextInput("20.0"), "TIMEOUT")
        .appendField("s");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#vmxnmh
Blockly.Blocks['atx_image_pattern'] = {
  init: function() {
    this.appendValueInput("FILENAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("图片");
    this.appendDummyInput()
        .appendField("阈值")
        .appendField(new Blockly.FieldNumber(0.8, 0, 1, 0.01), "THRESHOLD");
    this.setInputsInline(true);
    this.setOutput(true, "ATX_PATTERN");
    this.setColour(195);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};

Blockly.Blocks['atx_image_pattern_offset'] = {
  init: function() {
    this.appendValueInput("FILENAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("图片");
    this.appendDummyInput()
        .appendField("偏移(")
        .appendField(new Blockly.FieldNumber(0, -1000, 1000, 1), "OX")
        .appendField(',')
        .appendField(new Blockly.FieldNumber(0, -1000, 1000, 1), "OY")
        .appendField(")")
        .appendField("阈值")
        .appendField(new Blockly.FieldNumber(0.8, 0, 1, 0.01), "THRESHOLD");
    this.setInputsInline(true);
    this.setOutput(true, "ATX_PATTERN");
    this.setColour(195);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};

Blockly.Blocks['atx_image_file'] = {
  init: function() {
    var getImages = function(){
      //return window.blocklyImageList || [["unknown.png", "https://www.gstatic.com/codesite/ph/images/star_on.gif"]];
      return window.blocklyImageList || [["unknown.svg", defaultImage]];//, ['screen.png', 'screen.png']];
    }
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(defaultImage, 30, 30, "*"), 'IMAGE')
        .appendField(new Blockly.FieldDropdown(getImages), "FILENAME");
    this.setOutput(true, "String");
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  },
  onchange: function(event) {
    if (event.type == Blockly.Events.CREATE) {
      var found = false;
      for (var i = 0; i < event.ids.length; i++) {
        if (event.ids[i] == this.id) {
          found = true;
          break;
        }
      }
      if (!found) {return;}
    } else if (event.blockId != this.id) {
      return;
    }
    var field_image = this.getField('IMAGE');
    var val_filename = this.getFieldValue('FILENAME')

    if (event.type == Blockly.Events.CHANGE || event.type == Blockly.Events.CREATE) {
      if (val_filename == defaultImage) {
        field_image.setValue(defaultImage);
      } else {
        var baseURL = window.blocklyBaseURL || '';
        field_image.setValue(baseURL + val_filename)
      }
    }
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#jamchn
Blockly.Blocks['atx_screenshot'] = {
  init: function() {
    this.appendValueInput("FILENAME")
        .setCheck("String")
        .appendField("保存截图");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};

// Image Crop
Blockly.Blocks['atx_image_crop'] = {
  init: function(){
    var getImages = function(){
      return window.blocklyCropImageList || [["unknown.svg", defaultImage]];//, ['screen.png', 'screen.png']];
    }
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(getImages), "FILENAME");
    this.appendDummyInput()
        .appendField("Offset: (")
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "LEFT")
        .appendField(',')
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "TOP")
        .appendField(")");
    this.appendDummyInput()
        .appendField("Size:  (")
        .appendField(new Blockly.FieldNumber(50, 10, 9999, 1), "WIDTH")
        .appendField("x")
        .appendField(new Blockly.FieldNumber(50, 10, 9999, 1), "HEIGHT")
        .appendField(")");
    this.setOutput(true, "IMAGE_CROP");
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};

Blockly.Blocks['atx_image_crop_preview'] = {
  init: function(){
    this.appendDummyInput()
        .appendField(new Blockly.FieldImageCrop(defaultImage, 72, "*"), 'IMAGE');
    this.appendValueInput("IMAGE_CROP")
        .setCheck("IMAGE_CROP")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  },
  onchange: function(event) {
    switch (event.type) {
      case Blockly.Events.CREATE:
        var found = false;
        for (var i = 0; i < event.ids.length; i++) {
          if (event.ids[i] == this.id) {
            found = true;
            break;
          }
        }
        if (!found) {return;}
        break;
      case Blockly.Events.MOVE:
        if (event.blockId != this.id && event.newParentId != this.id && event.oldParentId != this.id) {
          return;
        }
        break;
      case Blockly.Events.UI:
      case Blockly.Events.CHANGE:
        if (event.element != 'field') {return;}
        break;
      default:
        return;
    }
    var field = this.getField('IMAGE'),
        crop = this.getInput('IMAGE_CROP').connection.targetBlock();
    if (crop == null) {
      field.setValue(defaultImage);
      return;
    }
    var baseURL = window.blocklyBaseURL || '',
        filename = crop.getFieldValue('FILENAME');
    if (filename == defaultImage) {
      field.setValue(defaultImage);
    } else {
      field.setValue(baseURL + filename);
    }
    var left = parseInt(crop.getFieldValue('LEFT')),
        top = parseInt(crop.getFieldValue('TOP')),
        width = parseInt(crop.getFieldValue('WIDTH')),
        height = parseInt(crop.getFieldValue('HEIGHT'));
    field.setBound({left, top, width, height});
  },
};

// An blank line for separate blocks of code
Blockly.Blocks['atx_blank'] = {
  init: function(){
    this.appendDummyInput()
        .appendField("                            ");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#FFFFFF');
    this.setTooltip('');
    this.setHelpUrl(helpUrl);
  }
};
