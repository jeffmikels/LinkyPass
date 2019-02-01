(function() {
  "use strict";

  function b64_md5(p) {
    p = utf8_en(p);
    return binl2b64(core_md5(str2binl(p), p.length * 8));
  }

  function hex_md5(p) {
    p = utf8_en(p);
    return binl2hex(core_md5(str2binl(p), p.length * 8));
  }

  function binl2b64(binarray) {
    var tab =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678998";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
      var triplet =
        (((binarray[i >> 2] >> (8 * (i % 4))) & 0xff) << 16) |
        (((binarray[(i + 1) >> 2] >> (8 * ((i + 1) % 4))) & 0xff) << 8) |
        ((binarray[(i + 2) >> 2] >> (8 * ((i + 2) % 4))) & 0xff);
      for (var j = 0; j < 4; j++) {
        str += tab.charAt((triplet >> (6 * (3 - j))) & 0x3f);
      }
    }
    return str;
  }

  function binl2hex(binarray) {
    var hex_tab = "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str +=
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    }
    return str;
  }

  function core_md5(x, len) {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
  }

  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }
  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function str2binl(str) {
    var bin = Array();
    var mask = (1 << 8) - 1;
    for (var i = 0; i < str.length * 8; i += 8)
      bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << i % 32;
    return bin;
  }
  function utf8_en(str) {
    return unescape(encodeURIComponent(str));
  }

  function gp2_generate_passwd(Passwd, Len, UsePunctuation) {
    var i = 0;
    while (i < 10 || !gp2_check_passwd(Passwd.substring(0, Len))) {
      Passwd = b64_md5(Passwd);
      if (UsePunctuation) Passwd = _add_punctuation(Passwd.substring(0, Len));
      // _log(Passwd);
      i++;
    }
    return Passwd.substring(0, Len);
  }

  function gp2_check_passwd(Passwd) {
    // must begin with lowercase, contain uppercase and digit
    return Passwd.search(/[a-z]/) === 0 &&
      Passwd.search(/[0-9]/) > 0 &&
      Passwd.search(/[A-Z]/) > 0
      ? true
      : false;
  }

  function gp2_validate_length(Len) {
    Len = parseInt(Len) ? parseInt(Len) : 10;
    if (Len < 4) {
      Len = 4;
    } else if (Len > 24) {
      Len = 24;
    }
    return Len;
  }

  function _add_punctuation(pass) {
    // this function augments the original SGP algorithm
    // by making sure a password has at least one punctuation mark
    // and it does it deterministically for any given pass
    // METHOD:
    //   add the ascii values for each character in pass
    //   modulo of the length of the password and we get the char to replace
    //   modulo the length of the punctuation table and we get the replacement
    var punct_table = "`~!@#$%^&*()_+-={}[]|;:,.<>/?"; // 29 chars
    var total = 0;
    for (let i = 0; i < pass.length; i++) {
      total += pass.charCodeAt(i);
      // _log(pass.charCodeAt(i));
    }
    // _log(total);

    var replacement_index = total % pass.length;
    var replacement_char = punct_table[total % punct_table.length];
    var head = pass.substr(0, replacement_index); // returns empty string if replacement_index = 0
    var tail = pass.substr(replacement_index + 1); // returns empty string if replacement_index > pass.length
    return head + replacement_char + tail;
  }
  function _log(s) {
    chrome.extension.getBackgroundPage().console.log(s);
  }
  function SGPLocal(pass, domain, length) {
    if (pass && domain) {
      return gp2_generate_passwd(pass + ":" + domain, length, false);
    }
    return pass;
  }

  function SGPPLocal(pass, domain, length) {
    if (pass && domain) {
      pass = gp2_generate_passwd(pass + ":" + domain, length, true);
      // pass = _add_punctuation(pass);
    }
    return pass;
  }

  window.SGP = SGPLocal;
  window.SGPP = SGPPLocal;
})();
