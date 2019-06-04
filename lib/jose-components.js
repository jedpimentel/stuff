/*
	JOSE'S COMPONENT LIBRARY
	- - - - - - - - - - - - -
*/


// FPS Counter, might not be an efficient use of resources
// <a-text fps-counter>
AFRAME.registerComponent('fps-counter', {
      schema: {
        refresh_ms: {type: 'number', default: 1000},
      },
      init: function() {
      	this._frame_counter = 0;
      	this._rate = 0;
      	const span_seconds = this.data.refresh_ms / 1000;

      	setInterval(() => {
  			// alert("Hello");
  			// this._rate = this._frame_counter / this.data.refresh_ms;
  			this.el.setAttribute('value', this._frame_counter / span_seconds)
  			this._frame_counter = 0;
  		}, this.data.refresh_ms);
      },
      tick: function() {
      	this._frame_counter++
      }
})