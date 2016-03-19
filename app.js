(function() {
  'use strict';
  var IDLE_TIME = 1000 * 30 * 1;
  var ANIMATION_BETWEEN = 1000 * 6;
  var ANIMATION_DURATION = 1000 * 3;
  var POSITIONS = [
    {x: 1100, y: 1500, z: 5},
    {x: 3834, y: 1907, z: 9},
    {x: 1250, y: 2300, z: 9}
  ];
  var thr0w = window.thr0w;
  document.addEventListener('DOMContentLoaded', ready);
  function ready() {
    var frameEl = document.getElementById('my_frame');
    // thr0w.setBase('http://localhost'); // DEV
    thr0w.setBase('http://192.168.1.2'); // PROD
    thr0w.addAdminTools(frameEl, connectCallback, messageCallback);
    function connectCallback() {
      var interacting = false;
      var idle = true;
      var currentPosition = 0;
      /* DEV
      var grid = new thr0w.Grid(
        document.getElementById('my_frame'),
        document.getElementById('my_content'),
        [
          [0]
        ]
      );
      */
      var grid = new thr0w.FlexGrid(
        document.getElementById('my_frame'),
        document.getElementById('my_content'),
        [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8, 9]
        ],
        [
          {
            width: 1920,
            height: 1080,
            spacing: 28,
            scale: 0.84,
            margin: 20
          },
          {
            width: 1920,
            height: 1080,
            spacing: 28,
            scale: 0.84,
            margin: 60
          },
          {
            width: 1080,
            height: 1920,
            spacing: 112,
            padding: 111
          }
        ]
      );
      var svg = new thr0w.svg.Svg(
        grid,
        document.getElementById('my_svg'),
        10
      );
      window.setInterval(checkIdle, IDLE_TIME);
      var animationInterval = window.setInterval(animation, ANIMATION_BETWEEN);
      frameEl.addEventListener('touchstart', interact);
      frameEl.addEventListener('touchmove', interact);
      function checkIdle() {
        if (!interacting && !idle) {
          animationInterval = window.setInterval(animation, ANIMATION_BETWEEN);
          idle = true;
        }
        interacting = false;
      }
      function animation() {
        currentPosition++;
        currentPosition = currentPosition < POSITIONS.length ?
          currentPosition : 0;
        svg.moveTo(
          ANIMATION_DURATION,
          POSITIONS[currentPosition].x,
          POSITIONS[currentPosition].y,
          POSITIONS[currentPosition].z
        );
      }
      function interact() {
        if (!interacting) {
          interacting = true;
          idle = false;
          svg.moveStop();
          window.clearInterval(animationInterval);
        }
      }
    }
    function messageCallback() {
    }
  }
})();
