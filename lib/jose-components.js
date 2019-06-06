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

// attach to tracked controller, 
// assumes you're using a camera wrapper and the scene uses a flat ground 
// (could be fixed by ensuring the wrapper is a certain height from the "floor")
AFRAME.registerComponent('grip-to-move', {
	schema: {
		targetID: {type: 'string', default: 'n/a'}
		// speed: {type: 'number', default: 1}
	},
	init: function() {
		if(this.data.targetID === 'n/a') {
			throw 'grip-to-move requires a targetID parameter, with ID of camera rig/wrapper'
		}

    this._anchor_el = document.createElement('a-sphere');
    this._anchor_el.setAttribute('color', 'yellow');
    this._anchor_el.setAttribute('radius', '0.05');

    this._active = this._anchor_el.object3D.visible = false;

  	this._camera_rig = document.getElementById(this.data.targetID);
    this._camera_rig.appendChild(this._anchor_el);

    this.el.addEventListener('gripdown', (e) => {
      this._anchor_el.object3D.position.copy(this.el.object3D.position);
      this._active = this._anchor_el.object3D.visible = true;
    })

    this.el.addEventListener('gripup', (e) => {
      this._active = this._anchor_el.object3D.visible = false;
    })
	},
	tick: function() {
		if(this._active) {
		  this._camera_rig.object3D.position.x += this.el.object3D.position.x - this._anchor_el.object3D.position.x;
		  // this._camera_rig.object3D.position.y += this.el.object3D.position.y - this._anchor_el.object3D.position.y;
		  this._camera_rig.object3D.position.z += this.el.object3D.position.z - this._anchor_el.object3D.position.z;
		}

	}
})