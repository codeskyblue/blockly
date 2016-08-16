'use strict';

goog.provide('Blockly.Python.atx');
goog.require('Blockly.Python');

Blockly.Python['atx_connect'] = function(block) {
  var dropdown_platform = block.getFieldValue('PLATFORM');
  var code = '# coding: utf-8\n' +
    'import os\nimport atx\n\n\n' +
    '__basename = os.path.basename(os.path.splitext(__file__)[0])\n' +
    'd = atx.connect(platform="'+ dropdown_platform + '")\n' +
    'd.image_path = [".", "images", os.path.join("images", __basename)]\n\n';
  return code;
};

Blockly.Python['atx_click'] = function(block) {
  var value_x = block.getFieldValue('X'),
      value_y = block.getFieldValue('Y'),
      code = 'd.click(' + value_x + ', ' + value_y + ')\n';
  return code;
};

Blockly.Python['atx_click_image'] = function(block) {
  var value_atx_pattern = Blockly.Python.valueToCode(block, 'ATX_PATTERN', Blockly.Python.ORDER_ATOMIC);
  var text_timeout = block.getFieldValue('TIMEOUT');
  var params = [value_atx_pattern];
  if (text_timeout) {
    params.push('timeout='+text_timeout)
  }
  var code = 'd.click_image('+params.join(', ') + ')\n';
  return code;
};

Blockly.Python['atx_image_pattern'] = function(block) {
  var value_filename = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var value_threshold = block.getFieldValue('THRESHOLD');
  var params = [value_filename];
  if (value_threshold) {
    params.push('threshold='+value_threshold);
  }
  var code = 'atx.Pattern(' + params.join(', ') + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['atx_image_pattern_offset'] = function(block) {
  var value_filename = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var value_threshold = block.getFieldValue('THRESHOLD');
  var value_offset_x = parseInt(block.getFieldValue('OX'));
  var value_offset_y = parseInt(block.getFieldValue('OY'));
  var params = [value_filename];
  if (value_threshold) {
    params.push('threshold='+value_threshold);
  }
  if (value_offset_x && value_offset_y) {
    params.push('offset=(' +  (value_offset_x/100.0) + ',' + (value_offset_y/100.0) + ')')
  }
  var code = 'atx.Pattern(' + params.join(', ') + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['atx_image_file'] = function(block) {
  var dropdown_filename = block.getFieldValue('FILENAME');
  if (dropdown_filename === Blockly.Blocks.atx.defaultImage) {
    throw 'No image file choosen for ATX_IMAGE_FILE!'
  }
  var code = '"' + dropdown_filename + '"';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['atx_screenshot'] = function(block) {
  var value_filename = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var code = 'd.screenshot(' + value_filename + ')\n';
  return code;
};

Blockly.Python['atx_image_crop'] =  function(block) {
  var x = block.getFieldValue('LEFT'),
      y = block.getFieldValue('TOP'),
      w = block.getFieldValue('WIDTH'),
      h = block.getFieldValue('HEIGHT'),
      filename = block.getFieldValue('FILENAME');
  if (filename === Blockly.Blocks.atx.defaultImage) {
    throw 'No image file choosen for FieldImageCrop!'
  }
  var code = 'atx.ImageCrop("'+filename+'", ' + 'bound=('+x+','+y+','+w+','+h+')' + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python['atx_image_crop_preview'] = function(block) {
  var value_imagecrop= Blockly.Python.valueToCode(block, 'IMAGE_CROP', Blockly.Python.ORDER_ATOMIC);
  return [value_imagecrop, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python['atx_blank'] = function(block) {
  return '\n';
}
