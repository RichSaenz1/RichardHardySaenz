(function() {
  var mobileQuery = window.matchMedia("(max-width: 760px)");
  var skipSelector = "script, style, noscript, input, textarea, select, option, .honeypot, [name='bot-field']";
  var pending = false;

  function shouldProtect(node) {
    if (!node || !node.nodeValue || !/[A-Za-z0-9]-[A-Za-z0-9]/.test(node.nodeValue)) return false;
    var parent = node.parentElement;
    return !!parent && !parent.closest(skipSelector);
  }

  function protectTextNode(node) {
    if (!shouldProtect(node)) return;
    node.nodeValue = node.nodeValue.replace(/([A-Za-z0-9])-(?=[A-Za-z0-9])/g, "$1\u2011");
  }

  function protectHyphenatedWords(root) {
    if (!mobileQuery.matches || !document.body) return;
    var start = root && root.nodeType === 1 ? root : document.body;
    var walker = document.createTreeWalker(start, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        return shouldProtect(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(protectTextNode);
  }

  function scheduleProtect(root) {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(function() {
      pending = false;
      protectHyphenatedWords(root || document.body);
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    protectHyphenatedWords(document.body);
    window.setTimeout(function() { protectHyphenatedWords(document.body); }, 400);
    window.setTimeout(function() { protectHyphenatedWords(document.body); }, 1200);

    var observer = new MutationObserver(function(mutations) {
      if (!mobileQuery.matches) return;
      for (var i = 0; i < mutations.length; i += 1) {
        if (mutations[i].type === "characterData") {
          protectTextNode(mutations[i].target);
          continue;
        }
        if (mutations[i].addedNodes && mutations[i].addedNodes.length) {
          scheduleProtect(document.body);
          return;
        }
      }
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  });

  document.addEventListener("tfs:langchange", function() {
    window.setTimeout(function() { protectHyphenatedWords(document.body); }, 60);
  });
})();
