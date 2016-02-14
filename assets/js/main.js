(function(window, document) {
  // Extend function
  function extend(a, b){
    for(var key in b) {
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }
  
  // Main function
  function drawOnScroll(parameters) {
    
    // Defaults
    var defaults = {
      containerClass: ".js-show-inview",
      inviewClass: "is-inview"
    },
    options = extend(defaults, parameters);
    
    var body = document.querySelector(options.containerClass),
    html = document.documentElement,
    windowHeight    = window.innerHeight,
    documentHeight  = Math.max( document.querySelector(options.containerClass).scrollHeight, document.querySelector(options.containerClass).offsetHeight),
    allContainers = document.querySelectorAll(options.containerClass),
    elements = [];
    
    // Element function
    function Element(target) {
      
      var children = [],
      element = target,
      height = null,
      offset = null,
      inview = null,
      inviewset = false;
      
      // This element property
      Object.defineProperty(this, "element", {
        get: function() {
          return element;
        }
      });
      
      // Parent property 
      Object.defineProperty(this, "height", {
        get: function() {
          //console.log(target.offsetHeight);
          return target.offsetHeight;
        }
      });
      
      // Offset property 
      Object.defineProperty(this, "offset", {
        get: function() {
          return target.getBoundingClientRect().top;
        }
      });
      
      // Inview property 
      Object.defineProperty(this, "inview", {
        get: function() {
          var rect = target.getBoundingClientRect();
          return (
              rect.top - windowHeight <= 0
          );
        }
      });

      // Inview property 
      Object.defineProperty(this, "inviewset", {
        set: function(bool) {
          inviewset = true;
        },
        get: function() {
          return inviewset;
        }
      });

      //console.log(this.inview);

      this.draw = function(order) {
        if(inviewset == false) {
          element.className += " " + options.inviewClass + " " + options.inviewClass + "-" + order + "";
          inviewset = true;
        }
      }
    }
    
    // Push all things into an array
    for (var i = 0, l = allContainers.length; i < l; i++) {
      
      var theseSvgs = allContainers[i].querySelectorAll(options.svgClass);
      var container = new Element(allContainers[i]);

      elements.push(container);
      
    }
    
    // Add scroll listener
    var ok = function() {
      for (var i = 0, l = elements.length; i < l; i++) {
        
        // If container in view
        if (elements[i].inview) {
          elements[i].draw(i);
        }
        
      }
    };

    window.addEventListener("scroll", ok);
    window.addEventListener("load", ok)
  }
  
  drawOnScroll();
  
})(window, document);