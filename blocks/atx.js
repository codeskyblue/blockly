'use strict';

goog.provide('Blockly.Blocks.atx');

goog.require('Blockly.Blocks');

Blockly.Blocks.atx.HUE = 140;

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gq8gdg
Blockly.Blocks['atx_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("连接安卓设备")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "M"));
    this.appendValueInput("HOST")
        .setCheck("String")
        .appendField("Host");
    this.appendValueInput("PORT")
        .setCheck("String")
        .appendField("Port");
    this.appendValueInput("SN")
        .setCheck("String")
        .appendField("SerialNo");
    this.appendDummyInput();
    this.setNextStatement(true);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2zccrz
Blockly.Blocks['atx_click'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("坐标点击")
        .appendField("X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.appendDummyInput();
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
        .appendField("点击图片")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"));
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
    this.appendDummyInput()
        .appendField("Pattern");
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
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['atx_image_file'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"))
        .appendField(new Blockly.FieldDropdown([["button.png", "btn.png"], ["option", "OPTIONNAME"], ["option", "OPTIONNAME"]]), "FILENAME");
    this.setOutput(true, "String");
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};