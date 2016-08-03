'use strict';

goog.provide('Blockly.Blocks.atx');

goog.require('Blockly.Blocks');

Blockly.Blocks.atx.HUE = 140;

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
    this.setHelpUrl('https://github.com/codeskyblue/AirtestX');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2zccrz
Blockly.Blocks['atx_click'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("点击坐标")
        .appendField("X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
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
    this.setHelpUrl('http://www.example.com/');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#vmxnmh
Blockly.Blocks['atx_image_pattern'] = {
  init: function() {
    this.appendValueInput("FILENAME")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("图片");
    this.appendValueInput("THRESHOLD")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("阈值");
    this.setOutput(true, "ATX_PATTERN");
    this.setColour(195);
    this.setTooltip('');
    this.setHelpUrl('http://www.baidu.com/');
  }
};

Blockly.Blocks['atx_image_file'] = {
  init: function() {
    var getImages = function(){
      return window.blocklyImageList || [["unknown.png", "https://www.gstatic.com/codesite/ph/images/star_on.gif"]];
    }
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 30, 30, "*"), 'IMAGE')
        .appendField(new Blockly.FieldDropdown(getImages), "FILENAME");
    this.setOutput(true, "String");
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  onchange: function(event) {
    var field_image = this.getField('IMAGE');
    var val_filename = this.getFieldValue('FILENAME')

    if (event.type == Blockly.Events.CHANGE || event.type == Blockly.Events.CREATE) {
      var baseURL = window.blocklyBaseURL || '';
      field_image.setValue(baseURL + val_filename)
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
    this.setHelpUrl('http://www.example.com/');
  }
};

// Image Crop
Blockly.Blocks['atx_image_crop'] = {
  init: function(){
    var getImages = function(){
      return window.blocklyImageList || [["unknown.png", "https://www.gstatic.com/codesite/ph/images/star_on.gif"], ["screen.png", "screen.png"]];
    }
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(getImages), "FILENAME");
    this.appendDummyInput()
        .appendField("Bounds: (")
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "LEFT")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "TOP")
        .appendField(")@(")
        .appendField(new Blockly.FieldNumber(10, 10, 9999, 1), "WIDTH")
        .appendField("x")
        .appendField(new Blockly.FieldNumber(10, 10, 9999, 1), "HEIGHT")
        .appendField(")");
    this.appendDummyInput()
        .appendField("Offset: (")
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "OX")
        .appendField(',')
        .appendField(new Blockly.FieldNumber(0, 0, 9999, 1), "OY")
        .appendField(")");
    this.setOutput(true, "IMAGE_CROP");
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['atx_image_crop_preview'] = {
  init: function(){
    this.appendDummyInput()
        .appendField(new Blockly.FieldImageCrop("https://www.gstatic.com/codesite/ph/images/star_on.gif", 72, "*"), 'IMAGE');
    this.appendValueInput("IMAGE_CROP")
        .setCheck("IMAGE_CROP")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  onchange: function(event) {
    if (event.element != 'field') {
      return;
    }
    console.log(111, event);
    var block = this.getField('IMAGE');
    if (event.name == 'FILENAME'){
      block.setValue(event.newValue);
    } else {
      var crop = this.getInput('IMAGE_CROP').connection.targetBlock();
      if (crop == null) {
        return;
      }
      var left = crop.getFieldValue('LEFT'),
          top = crop.getFieldValue('TOP'),
          width = crop.getFieldValue('WIDTH'),
          height = crop.getFieldValue('HEIGHT');
      block.setBound({left, top, width, height});
    }
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
  }
};
