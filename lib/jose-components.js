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
// rename to grip locomotion?
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


// first click starts movement, second click stops movement
AFRAME.registerComponent('click-to-reposition', {
  init: function() {
    this.active = false;
    this.pos = this.el.object3D.position;
    this.pos_start = new THREE.Vector3();

    this.clicker_start = new THREE.Vector3();
    this.clicker_pos = new THREE.Vector3();
    this.clickerEl = undefined;

    

    this.el.addEventListener('click', (e) => {
      this.active = !this.active;
      if(this.active) {
        this.clickerEl = e.detail.cursorEl;
        this.clickerEl.object3D.getWorldPosition(this.clicker_start)
        this.pos_start.copy(this.el.object3D.position)
      }
    })
  },
  tick: function() {
    if(this.active) {
      this.clickerEl.object3D.getWorldPosition(this.clicker_pos)
      this.pos.copy(this.pos_start).add(this.clicker_pos).sub(this.clicker_start)
    }
  }
});



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
// TODO?: Dynamic segment count to do stuff like having a 1-second trail even when laggy
AFRAME.registerComponent('pos-trail-line', {
  schema: {
    // targetID: {type: 'string', default: 'n/a'}
    segments: {type: 'number', default: 72*4}//Oculus Quest target framerate: 72
  },
  init: function() {
    this.segment_index = 0;
    this.position = new THREE.Vector3();
    this.last_pos = new THREE.Vector3();

    this.geometry = new THREE.Geometry();
    this.material = new THREE.LineBasicMaterial({color: 0xff0000});
    for(let i = 0; i < this.data.segments * 2; i++) {
      this.geometry.vertices.push(new THREE.Vector3());
    }
    const line_segments = new THREE.LineSegments(this.geometry, this.material);
    // const line_segments = new THREE.LineSegments(this.geometry, this.material);
    this.el.sceneEl.object3D.add(line_segments);
  },
  tick: function() {
    if(this.segment_index === this.data.segments) { this.segment_index = 0; };
    this.last_pos.copy(this.position)
    this.el.object3D.getWorldPosition(this.position);
    this.geometry.vertices[this.segment_index * 2    ].copy(this.last_pos);
    this.geometry.vertices[this.segment_index * 2 + 1].copy(this.position);
    this.geometry.computeBoundingSphere();
    this.geometry.verticesNeedUpdate = true;
    this.segment_index++;
    // console.log('a')
  } 
});

// log text into a scene
AFRAME.registerComponent('debug-menu', {
  init: function() {
    this.line_y = 0
    this.log = function(val) {
      const text = document.createElement('a-text')
      text.setAttribute('value', val)
      this.line_y -= 0.2
      text.setAttribute('position', `0 ${this.line_y} 0`)
      this.el.appendChild(text)
    }
    document.addEventListener('debug-menu-log', (e) => {
      this.log('space')
      this.log(JSON.stringify(e.detail))
    })
  }
})
// encapsulate this as a globally available system?
// this.log = function(a) {
//   let evt = new CustomEvent('debug-menu-log', {
//     detail: {
//       text: a
//     }
//   })
//   document.dispatchEvent(evt)
// }

// this is a test
class Robot {
  constructor() {
    this.history = new Array(0);
  };
  say(wut) {
    let timestamp = Date.now();
    console.log(wut);
    this.history.push({
      timestamp: timestamp,
      action: "say",
      params: wut,
    })
  };
  replay() {
    while(this.history.length > 0) {
      let action = this.history.shift();
      let now = Date.now();
      let when = now - action.timestamp;
      setTimeout(() => { this[action.action](action.params); }, when);
    }
  };
}
window.bot = new Robot()