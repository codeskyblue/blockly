'use strict';

goog.provide('Blockly.Python.atx');

goog.require('Blockly.Python');


Blockly.Python['atx_connect'] = function(block) {
  var dropdown_platform = block.getFieldValue('PLATFORM');
  // TODO: Assemble Python into code variable.
  var code = '# coding: utf-8\n' +
    'import os\nimport atx\n\n\n' +
    '__basename = os.path.basename(os.path.splitext(__file__)[0])\n' +
    'd = atx.connect(platform="'+ dropdown_platform + '")\n' +
    'd.image_path = [".", "images", os.path.join("images", __basename)]\n\n';
  return code;
};

// Blockly.Python['atx_connect'] = function(block) {
//   var value_host = Blockly.Python.valueToCode(block, 'HOST', Blockly.Python.ORDER_ATOMIC);
//   var value_port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC);
//   var value_sn = Blockly.Python.valueToCode(block, 'SN', Blockly.Python.ORDER_ATOMIC);
//   // TODO: Assemble Python into code variable.
//   var params = [value_sn ? value_sn : 'None'];
//   if (value_host) {
//     params.push('host='+value_host);
//   }
//   if (value_port) {
//     params.push('port='+value_port);
//   }
//   var code = 'd = atx.connect(' + params.join(', ') + ')\n';
//   return code;
// };

Blockly.Python['atx_click'] = function(block) {
  var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'd.click(' + value_x + ', ' + value_y + ')\n';
  return code;
};

Blockly.Python['atx_click_image'] = function(block) {
  var value_atx_pattern = Blockly.Python.valueToCode(block, 'ATX_PATTERN', Blockly.Python.ORDER_ATOMIC);
  var text_timeout = block.getFieldValue('TIMEOUT');
  // TODO: Assemble Python into code variable.
  var params = [value_atx_pattern];
  if (text_timeout) {
    params.push('timeout='+text_timeout)
  }
  var code = 'd.click_image('+params.join(', ') + ')\n';
  return code;
};

// Blockly.Python['atx_image_pattern'] = function(block) {
//   var dropdown_filename = block.getFieldValue('FILENAME');
//   var value_threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_ATOMIC);
//   // TODO: Assemble Python into code variable.
//   var params = ['"'+dropdown_filename+'"'];
//   var code = 'atx.Pattern(' + params.join(', ') + ')';
//   // TODO: Change ORDER_NONE to the correct strength.
//   return [code, Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Python['atx_image_pattern'] = function(block) {
  var value_filename = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var value_threshold = Blockly.Python.valueToCode(block, 'THRESHOLD', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var params = [value_filename];
  if (value_threshold) {
    params.push('threshold='+value_threshold);
  }
  var code = 'atx.Pattern(' + params.join(', ') + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['atx_image_file'] = function(block) {
  var dropdown_filename = block.getFieldValue('FILENAME');
  // TODO: Assemble Python into code variable.
  var code = '"' + dropdown_filename + '"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['atx_screenshot'] = function(block) {
  var value_filename = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'd.screenshot(' + value_filename + ')\n';
  return code;
};

Blockly.Python['atx_image_crop'] =  function(block) {
  var x = block.getFieldValue('LEFT'),
      y = block.getFieldValue('TOP'),
      w = block.getFieldValue('WIDTH'),
      h = block.getFieldValue('HIGHT'),
      ox = block.getFieldValue('OX'),
      oy = block.getFieldValue('OY'),
      filename = block.getFieldValue('FILENAME');
  console.log(x, y, w, h, ox, oy, filename);
  return ['atx_image_crop', Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python['atx_blank'] = function(block) {
  return '\n';
}
