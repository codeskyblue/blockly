'use strict';

goog.provide('Blockly.Python.atx');
goog.require('Blockly.Python');

Blockly.Python['atx_connect'] = function(block) {
  Blockly.Python.provideFunction_('atx_import_basic', ['import os', 'import atx']);
  var dropdown_platform = block.getFieldValue('PLATFORM'),
      identifier = block.getFieldValue('IDENTIFIER'),
      connect_code;
  if (identifier == '') {
    connect_code = 'd = atx.connect(platform="' + dropdown_platform + '")';
  } else {
    connect_code = 'd = atx.connect("' + identifier + '", platform="' + dropdown_platform + '")';
  }
  var code = 'if not globals().get("d"): ' + connect_code + '\n' +
    '__basename = os.path.basename(os.path.splitext(__file__)[0])\n' +
    'd.image_path = [".", "images", os.path.join("images", __basename)]\n\n';
  return code;
};

Blockly.Python['atx_start_app'] = function(block) {
  var dropdown_appid = block.getFieldValue('APPID')
  return 'd.start_app("' + dropdown_appid +'")\n';
}

Blockly.Python['atx_stop_app'] = function(block) {
  var dropdown_appid = block.getFieldValue('APPID')
  return 'd.stop_app("' + dropdown_appid +'")\n';
}

Blockly.Python['atx_click'] = function(block) {
  var value_x = block.getFieldValue('X'),
      value_y = block.getFieldValue('Y'),
      code = 'd.click(' + value_x + ', ' + value_y + ')\n';
  return code;
};

Blockly.Python['atx_click_image'] = function(block) {
  var value_atx_pattern = Blockly.Python.valueToCode(block, 'ATX_PATTERN', Blockly.Python.ORDER_ATOMIC);
  if (value_atx_pattern == '') {
    throw 'No pattern choosen!';
  }
  if (value_atx_pattern != '' && (value_atx_pattern[0] == '"' || value_atx_pattern[0] == "'")) {
    value_atx_pattern = 'u' + value_atx_pattern;
  }
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
  if (value_filename!= '' && (value_filename[0] == '"' || value_filename[0] == "'")) {
    value_filename = 'u' + value_filename
  }
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
  if (value_filename!= '' && (value_filename[0] == '"' || value_filename[0] == "'")) {
    value_filename = 'u' + value_filename
  }
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
  var code = 'u"' + dropdown_filename + '"';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['atx_screenshot'] = function(block) {
  var value_filename = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_ATOMIC);
  var code = 'd.screenshot(u' + value_filename + ')\n';
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
  var code = 'atx.ImageCrop(u"'+filename+'", ' + 'bound=('+x+','+y+','+w+','+h+')' + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python['atx_image_crop_preview'] = function(block) {
  var value_imagecrop= Blockly.Python.valueToCode(block, 'IMAGE_CROP', Blockly.Python.ORDER_ATOMIC);
  if (value_imagecrop == '') {
    throw 'No ImageCrop connection found for ImageCropPreview!'
  }
  return [value_imagecrop, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python['atx_swipe'] = function(block) {
  var sx = block.getFieldValue('SX'),
      sy = block.getFieldValue('SY'),
      ex = block.getFieldValue('EY'),
      ey = block.getFieldValue('EY');
  var code = 'd.swipe(' + sx +','+ sy +','+ ex +','+ ey +')\n';
  return code
}

Blockly.Python['atx_blank'] = function(block) {
  return '\n';
}

Blockly.Python['atx_delay'] = function(block) {
  var seconds = block.getFieldValue('SECONDS');
  return 'd.delay(' + seconds + ')\n';
}

Blockly.Python['atx_exists'] = function(block) {
  var value_atx_pattern = Blockly.Python.valueToCode(block, 'ATX_PATTERN', Blockly.Python.ORDER_ATOMIC);
  if (value_atx_pattern == '') {
    throw 'No pattern choosen!';
  }
  if (value_atx_pattern != '' && (value_atx_pattern[0] == '"' || value_atx_pattern[0] == "'")) {
    value_atx_pattern = 'u' + value_atx_pattern;
  }
  var code = '(d.exists(' + value_atx_pattern + ') is not None)';
  return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python['atx_wait'] = function(block) {
  var value_atx_pattern = Blockly.Python.valueToCode(block, 'ATX_PATTERN', Blockly.Python.ORDER_ATOMIC);
  if (value_atx_pattern == '') {
    throw 'No pattern choosen!';
  }
  if (value_atx_pattern != '' && (value_atx_pattern[0] == '"' || value_atx_pattern[0] == "'")) {
    value_atx_pattern = 'u' + value_atx_pattern;
  }
  var text_timeout = block.getFieldValue('TIMEOUT');
  var safe = block.getFieldValue('SAFE');
  console.log(111, value_atx_pattern, safe, typeof safe);
  return 'd.wait('+ value_atx_pattern + ', timeout=' + text_timeout + ', safe=' + safe +')\n';
}
