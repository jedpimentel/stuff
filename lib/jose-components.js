/*
	JOSE'S COMPONENT LIBRARY
	- - - - - - - - - - - - -

	Welcome traveler, use Ctrl+F (find) to navigate this document.

	Chapters
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
    this._anchor_el.setAttribute('color', 'white');
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



// import AFRAME from 'aframe'
// Line Drawer: line drawing tool
// todo: popover tool menu to change settings or swap presets (start /w just 2 presets)
AFRAME.registerComponent('line-drawer', {
  init: function() {
    // Internal state for the component
    this.active = false;
    this.from = new THREE.Vector3();
    this.to = new THREE.Vector3();
    // Create an entity for drawing the line
    this.line = document.createElement('a-entity');
    this.line.setAttribute('visible', false);

    console.log(this)
    this.el.sceneEl.appendChild(this.line);
    // Register event handlers
    document.addEventListener('keydown', this.start_draw.bind(this));
    document.addEventListener('keyup', this.end_draw.bind(this));
  },
 
  start_draw: function() {
    if(!this.active) {

      this.active = true;
      this.el.object3D.getWorldPosition(this.from);
      this.line.setAttribute('line', 'start', (this.from.x +' '+this.from.y+' '+this.startPos.z));
      this.line.setAttribute('visible', true);
    }
  },
 
  end_draw: function() {
    console.log('end')
    this.active = false;
    
    this.line.setAttribute('visible', false);
  },
 
  tick: function() {
    if (this.active) {
      this.el.object3D.getWorldPosition(this.to);
      this.line.setAttribute('line', 'end', (this.to.x +' '+this.to.y+' '+this.to.z));
    }
  }
 
}); 

// TODO: factor out the line insertion code from this, into something using threejs directly
// TODO: direction could be encoded as the trail's color 3primaries+3secondaries
AFRAME.registerComponent('pos-trail-effect', {
  init: function() {
    this.trail_line_count = 1024;

    this.element_train = new Array(this.trail_line_count);
    this.index = 0;

    this.pos = new THREE.Vector3();
    this.last_pos = new THREE.Vector3();

    for(let i = 0; i < this.trail_line_count; i++) {
      this.element_train[i] = document.createElement('a-entity');
      this.el.sceneEl.appendChild(this.element_train[i]);
    }
  },
  tick: function() {
    if(++this.index === this.trail_line_count) { this.index = 0; };
    this.last_pos.copy(this.pos)
    this.el.object3D.getWorldPosition(this.pos);
    this.element_train[this.index].setAttribute('line', 'start', (this.last_pos.x +' '+this.last_pos.y+' '+this.last_pos.z))
    this.element_train[this.index].setAttribute('line', 'end', (this.pos.x +' '+this.pos.y+' '+this.pos.z))
  }
}); 
