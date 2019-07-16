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
  	const span_seconds = this.data.refresh_ms / 1000;
  	setInterval(() => {
			this.el.setAttribute('value', this._frame_counter / span_seconds)
			this._frame_counter = 0;
		}, this.data.refresh_ms);
  },
  tick: function() {
  	this._frame_counter++
  }
})

// attach to tracked controller, 
// assumes you're using a camera wrapper in a flat scene
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

// EXPERIMENTAL
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


// import AFRAME from 'aframe'
// Line Drawer: line drawing tool
// todo: popover tool menu to change settings or swap presets (start /w just 2 presets)
// NOTE: two of these seperated by 1cm creates a nice effect
AFRAME.registerComponent('line-drawer', {
  schema: {
    // targetID: {type: 'string', default: 'n/a'}
    segments: {type: 'number', default: 72*4*4}//Oculus Quest target framerate: 72
    // segments: {type: 'number', default: 72*4}//Oculus Quest target framerate: 72
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

    document.addEventListener('abuttondown', e => this.active = this.new_trace = true);
    document.addEventListener('abuttonup', e => this.active = false);
  },
  tick: function() {
    if(this.active) {
      if(this.new_trace) {
        // used to avoid connected new traces with old trace
        this.el.object3D.getWorldPosition(this.position);
        this.new_trace = false;
      } else {
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
    } else {
      ;
    }
  }
});

//should be an option rather than its own component
// older version of line-drawer, kept for reference for now
AFRAME.registerComponent('line-drawer-with-gapfill', {
  schema: {
    // targetID: {type: 'string', default: 'n/a'}
    segments: {type: 'number', default: 72*4}//Oculus Quest target framerate: 72
    // segments: {type: 'number', default: 72*4}//Oculus Quest target framerate: 72
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

    document.addEventListener('abuttondown', e => this.active = true);
    document.addEventListener('abuttonup', e => this.active = false);
  },
  tick: function() {
    if(this.active) {
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


// function downloadJSON
// first use GLTFExporter to get object3D data
// then input it as file data
let file = window.file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
// make a objectURL link to it
URL.createObjectURL(file)
// revoke for memory reasons
// URL.revokeObjectURL(file)

// then use that URL inside of an anchor tag, in download mode

class GalleryImage {
  constructor(config) {
    this;
  }
}


// class ImageAsset {
//     constructor(dataURL) {
//       this.src = dataURL;
//     }
// }

// this is a test, work in progress
// Robot should be able to
class Robot {
  constructor() {
    this.history = new Array(0);
    this.grabbed = null;
    this.anchor = document.createElement('a')
    this.input = document.createElement('input')
    this.input.setAttribute('type', 'file')
    this.input.setAttribute('multiple', '')
    this.input.addEventListener('change', files => {
      console.log('aaaaaaaaaaaaaaaaaaa, a file!');
      this.files = files;//that didn't work as expected 
    })
    this.sceneEntities = new Array(0);
    this.filesAsJSON = new Array(0);

    window.addEventListener('DOMContentLoaded', e => {
      console.log('domcontent loaded')
      document.body.append(this.anchor)
      document.body.append(this.input)
      this.sceneEl = document.querySelector('a-scene')
    })
  };
  parseFiles() {
    this.parsedFiles = new Array(this.input.files.length)


    for(let i = 0; i < this.input.files.length; i++) {
      let file = this.input.files[i];
      if(file.type.includes('image/')) {
        console.log('type ok')
        // let imgURL = URL.createObjectURL(file);//lolwut? remember to release the url

        // https://codepen.io/matt-west/pen/CfilG
        let reader = new FileReader();
        let target = this.parsedFiles[i];
        let idx = i;
        reader.onload = (e) => {
          // this.parsedFiles[idx] = reader.result
          this.parsedFiles[idx] = {
            dataURL: reader.result,
            position: new Array(3),
          }
        }
        reader.readAsDataURL(file); 
      }
    }
  };
  parseRum() {
    let file = this.input.files[0];
    if(file.name.includes('.rum')) {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(e)
        this.parsedFiles = JSON.parse(reader.result)
      }
      // file data is saved as a JSON string, maybe refactor it all to a different type of file read method?
      reader.readAsText(file); 
    }
  };
  rumFromParsedFiles(name) {
    // save parsedFiles array as a .rum file
    let file = new File([JSON.stringify(this.parsedFiles)], `${name}.rum`, {
      type: "application/json",
    });

    // make a objectURL link to it
    let a = URL.createObjectURL(file)//<-- REMEMBER TO GARBAGE COLLECT THIS ???
    this.anchor.href = a;
    this.anchor.download = file.name
    this.anchor.click()
    console.log('lmao')

  };
  rumToParsedFiles(rumFile) {
    // load a .rum file onto parsedFiles 
    let file = rumFile;

    let reader = new FileReader();
    reader.onload = (e) => {
      this.parsedFiles = JSON.parse(reader.result)
    }
    reader.readAsDataURL(file); 
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
  grab(wut) {
    return this.grabbed = document.querySelector(wut) || null;
  };
  z(a) {
    window.console.log('console logging')
  };
  renderParsedFiles() {
    // only doing images for now, need to factor :)
    let offset = 0;
    for(let i = 0; i < this.parsedFiles.length; i++) {
      let chunk = this.parsedFiles[i]
      let file = chunk.dataURL
      // let pos = chunk.position.includes(null) ?  `${offset++} 1 -2` : chunk.position;
      let pos = `${offset++} 1 -2`;


      let entity = document.createElement('a-image')
      entity.setAttribute('src', chunk.dataURL)
      entity.setAttribute('position', pos)

      // gosh dangit is this some duplicate?
      this.sceneEntities.push(entity)
      document.querySelector('a-scene').appendChild(entity)

    }
  }
  imgParsedFileToEntity(imgParsedFile) {

    let file = imgParsedFile.dataURL
    let pos = imgParsedFile.position

    // let defaultPos = [0, 1, -2]
    let offset = 0;


    let entity = document.createElement('a-image')
    entity.setAttribute('src', imgParsedFile.dataURL)

    entity.setAttribute('position', pos || `${offset++} 1 -2`)

    this.sceneEntities.push(entity)
    document.querySelector('a-scene').appendChild(entity)



    // if(file.type.includes('image/')) {
    //   let imgURL = URL.createObjectURL(file);//lolwut?

    //   // https://codepen.io/matt-west/pen/CfilG
    //   let reader = new FileReader();
    //   reader.onload = (e) => {
    //     let entity = document.createElement('a-image')
    //     entity.setAttribute('src', reader.result)

    //     entity.setAttribute('position', pos || `${offset++} 1 -2`)

    //     this.sceneEntities.push(entity)
    //     document.querySelector('a-scene').appendChild(entity)
    //   }
    //   reader.readAsDataURL(file); 

    // }
  };
  fromBase64() {

  };
  toBase64() {

  };
  createRum() {
    // makes a new .rum file, to hold scene data
    // v 0.001 checks for images in <a-assets>, and makeas a scene elements for each
    // IM USING THE FORCE METHOD ON THIS #SORRYNOTSORRY
    // makeNewRum()

    // function makeNewRum() {

    // let files = this.input.files
    // let data = files.map(file => file)

    let fileList = this.input.files
    let data = {
      _note: "fileList is a list of files, as uploaded via bot interface, should be renderable",
      // fileList: JSON.parse(fileList),
      fileList: JSON.stringify(fileList),
    }

    let file = new File([data], "test.rum", {
      type: "application/javascript",
    });

    // // make a objectURL link to it
    // let a = URL.createObjectURL(file)//<-- REMEMBER TO UNDO THIS

    // // window.location.href = a;
    // this.anchor.href = a;
    // // console.log(file)
    // this.anchor.download = file.name
    // this.anchor.click()
    // console.log('lmao')


    this.saveBlobAsFile(file, file.name)

    // }

    function blankImgConf() {
      return {
        src: undefined,
        width: undefined,//get programaticaly?, meant for layouting
        height: undefined,//get programaticaly?
        pixelsPerMeter: 1000,
        position: new Array(3),
        rotation: new Array(3),
      }
    }
  };
  saveRum(name) {


  };
  // renderInputFiles
  // https://stackoverflow.com/questions/7951326/save-image-to-users-disk-using-javascript
  saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
  }
  saveBlobAsFile(blob, fileName) {

    var reader = new FileReader();

    reader.onloadend = function () {    
        var base64 = reader.result ;
        var link = document.createElement("a");

        link.setAttribute("href", base64);
        link.setAttribute("download", fileName);
        link.click();
    };

    reader.readAsDataURL(blob);
  }
  loadRum(rumFile) {
    // loads a .rum file that contains image names/srcs and position/rotation

  };
  loadFile(wut) {
    ;
  };
  saveFile(wut) {
    // function downloadJSON
    // first use GLTFExporter to get object3D data
    // then input it as file data
    let file = window.file = wut || new File(["foo"], "foo.txt", {
      type: "text/plain",
    });

    // make a objectURL link to it
    let a = URL.createObjectURL(file)//<-- REMEMBER TO UNDO THIS

    // window.location.href = a;
    this.anchor.href = a;
    // console.log(file)
    this.anchor.download = file.name
    this.anchor.click()
    console.log('lmao')



  };
  toGLTF(wut) {
    // https://threejs.org/docs/#examples/en/exporters/GLTFExporter
    // Instantiate a exporter (worth instantiating on each export?)
    var exporter = new THREE.GLTFExporter();
    var options = undefined

    let callback = thing => window.z = thing
    // Parse the input and generate the glTF output
    exporter.parse( wut, callback, options );
    // exporter.parse( wut, function ( gltf ) {
    //   console.log( gltf );
    //   console.log('parse that thins!')
    //   downloadJSON( gltf );
    // }, options );
  };
  replay() {
    var offset = undefined;
    if(this.history.length > 0) {
      offset = Date.now() - this.history[0].timestamp;
    }
    while(this.history.length > 0) {
      let action = this.history.shift();
      let now = Date.now();
      let when = now - action.timestamp;
      setTimeout(() => { this[action.action](action.params); }, when - offset);
    }
  };
}


  window.bot = new Robot()
// window.addEventListener('DOMContentLoaded', e => {
//   // document.querySelector('a-scene').object3D.add(particleSystem)
//   console.log('test')
//   window.bot = new Robot()
// })


// NodeApplicator
//
// https://humanwhocodes.com/blog/2019/01/computer-science-in-javascript-linked-list/
{
  const HEAD = Symbol("HEAD");
  const TAIL = Symbol("TAIL");

  class LinkedListNode {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  class LinkedList {
    constructor() {
      this[HEAD] = this[TAIL] = null;
    }

    add(data) {
      const newNode = new LinkedListNode(data);
      if(this[HEAD] === null) {
        this[HEAD] = this[TAIL] = newNode;
      } else {
        this[TAIL] = this[TAIL].next = newNode;
      }
    }
  }
}

class Particle {
  constructor(args) {
    this.positon = (new Vector3()).copy(args.position);
    // this.marker = 
  }
}


// https://aerotwist.com/tutorials/creating-particles-with-three-js/
// ^ above article is waaaay outdated but has some good styling pointers
// https://threejs.org/docs/#api/en/objects/Points
// 1800 20m particles over a 500m cube looks glitchy in a good way
let particleCount = 1800;
let particles = new THREE.Geometry();
let pMaterial = new THREE.ParticleBasicMaterial({
  color: 0xFFFFFF,
  // color: 0x666666,
  size: 0.001,
  // blending: THREE.AdditiveBlending,
  // blending: THREE.NormalBlending,
  transparent: true
});

for (var p = 0; p < particleCount; p++) {
  // var pX = Math.random() * 500 - 250,
  //     pY = Math.random() * 500 - 250,
  //     pZ = Math.random() * 500 - 250,
  //     particle = new THREE.Vertex(
  //       new THREE.Vector3(pX, pY, pZ)
  //     );
  let x = Math.random() - 0.5 - 2;
  let y = Math.random() - 0.5 + 1;
  let z = Math.random() - 0.5;
  let v = new THREE.Vector3(x, y, z);

  particles.vertices.push(v);
}

// create the particle system
// var particleSystem = new THREE.ParticleSystem(
var particleSystem = new THREE.Points(particles, pMaterial);

// add it to the scene


// PARTICLE CLOUD
// FROM POSITION ARRAY
//   - takes an array of [x, y, z] positions
//   - particle count taken from array length
// TO POSITION ARRAY
  

// DYNAMIC LENGTH
//   - replace with a larger geometry as needed,
//   - 


function drawParticleCloud(XYZArray) {
  let total = XYZArray.length;
  let particles = new THREE.Geometry();
  let pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 0.1,
  });
  for(let i = 0; i < XYZArray.length; i++) {
    let v = new THREE.Vector3(XYZArray[i][0], XYZArray[i][1], XYZArray[i][2]);
    particles.vertices.push(v);
  }
  let particleSystem = new THREE.Points(particles, pMaterial);
  const scene = document.querySelector('a-scene')
  window.addEventListener('DOMContentLoaded', e => {
    document.querySelector('a-scene').object3D.add(particleSystem)
  })
}

function randInRange(from, to) {
  let diff = to - from;
  return from + diff*Math.random()
}

function randThing(count) {
  let arr = [];

}

let thang = [
  [0, 0, 0],
  [0.5, Math.sqrt(2)/2, 0],
  [1, 0, 0],
  [0, 0, 0],
]

drawParticleCloud(thang)




window.addEventListener('DOMContentLoaded', (event) => {
  // console.log('yolo')
  // const scene = document.querySelector('a-scene');
  // console.log(scene.object3D)
  // scene.appendChild(particleSystem);
  scene.object3D.add(particleSystem);
});


// experimental
AFRAME.registerComponent('particle-applicator', {
  schema: {
    segments: {type: 'number', default: 1024}
  },
  init: function() {
    this.particle_index = 0;
    this.position = new THREE.Vector3();

    this.geometry = new THREE.Geometry();
    this.material = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 0.001,
    });

    for(let i = 0; i < this.data.segments; i++) {
      this.geometry.vertices.push(new THREE.Vector3());
    }
    const particles = new THREE.Points(this.geometry, this.material);
    // const particles = new THREE.LineSegments(this.geometry, this.material);
    this.el.sceneEl.object3D.add(particles);

    document.addEventListener('bbuttondown', e => this.active = true);
    document.addEventListener('bbuttonup', e => this.active = false);
  },
  tick: function() {
    if(this.active) {
      if(this.particle_index === this.data.segments) { this.particle_index = 0; };
      this.el.object3D.getWorldPosition(this.position);
      this.geometry.vertices[this.particle_index].copy(this.position);
      this.geometry.computeBoundingSphere();//needed as with lines?
      this.geometry.verticesNeedUpdate = true;//needed as with lines?
      this.particle_index++;
      // console.log('a')
    }
  }
});