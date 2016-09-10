'use strict';

goog.provide('Blockly.Blocks.time');
goog.require('Blockly.Blocks');

Blockly.Blocks.time.HUE = 300;

Blockly.Blocks['time_sleep'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Sleep')
        .appendField(new Blockly.FieldNumber(0.01, 0, 9999, 0), "SECONDS")
        .appendField('s');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(300);
    this.setTooltip('');
  }
}

Blockly.Blocks['time_time'] = {
  init: function(){
    this.appendDummyInput()
        .appendField('Current Time');
    this.setColour(300);
    this.setOutput(true, "Number");
  }
}
