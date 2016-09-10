'use strict';

goog.provide('Blockly.Python.time');
goog.require('Blockly.Python');

Blockly.Python['time_sleep'] = function(block) {
  Blockly.Python.provideFunction_('import_time', ['import time']);
  var seconds = block.getFieldValue('SECONDS');
  return 'time.sleep(' + seconds + ')\n';
}

Blockly.Python['time_time'] = function(block) {
  Blockly.Python.provideFunction_('import_time', ['import time']);
  return ['time.time()', Blockly.Python.ORDER_NONE];
}
