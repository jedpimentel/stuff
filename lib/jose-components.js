/*
	JOSE'S COMPONENT LIBRARY
	- - - - - - - - - - - - -

	Welcome traveler, use Ctrl+F (find) to navigate this document.

	Chapters

  Mixins vs standalone components
*/

// FPS Counter, or remix into some type of HUD
// add attribute to an a-text, ex: <a-text fps-counter>
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

/*
      ██████╗ ███████╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗
      ██╔══██╗██╔════╝██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝
      ██║  ██║█████╗  █████╗  ███████║██║   ██║██║     ██║   
      ██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║   ██║██║     ██║   
      ██████╔╝███████╗██║     ██║  ██║╚██████╔╝███████╗██║   
      ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   
       - Default Control Scheme for keeping my dear sanity -
       - Targets:
                  - Oculus Quest
                  - Mouse & Keyboard- 
*/
AFRAME.registerComponent("joses-default-interface", {
  init: function() {
    console.log('initting joses-default-interface')
    // copied from stuff\demo\oculus-quest\index.html as-was

    // weak test, but enough for between desktop/quest
    const has_positional = AFRAME.utils.device.checkHasPositionalTracking()

    // added 
    // cursor="rayOrigin: mouse" 
    // and disabled pointer lock
    // so things are usable on desktop without the finglonger laser
    const POSITIONAL_UI = `
      <a-entity id="camera-wrapper">
        <a-camera cursor="rayOrigin: mouse" look-controls="pointerLockEnabled: false" near="0.001">
            <a-text opacity="0.1" value="frames-per-second" width="0.8" position="0.2 -0.3 -0.9"></a-text>
            <a-text opacity="0.1" fps-counter position="0.2 -0.4 -0.9"></a-text>
            <a-cylinder id="fing-longer" position="0.2 -0.4 -0.9" radius="0.01" height= "1.0" rotation="90 0 0" color="beige" opacity="1.0"></a-cylinder>
        </a-camera>
        <a-entity pos-trail-line laser-controls="hand: left" grip-to-move="targetID: camera-wrapper" raycaster="objects: .clickable; far:4">
          <a-box  height="0.1" width="0.1" depth="0.1" opacity="0.2"></a-box>
          <!-- link back to home page for oculus quest  -->
          <a-box id="home-button" class="clickable" height="0.02" width="0.05" depth="0.05" position="0 -0.05 0" color="red"></a-box>
        </a-entity>
        <a-entity pos-trail-line laser-controls="hand: right" grip-to-move="targetID: camera-wrapper" raycaster="objects: .clickable; far:4">
          <a-sphere line-drawer particle-applicator radius="0.0005" position="-0.05 -0.05 -0.05"></a-sphere>
          <a-box height="0.1" width="0.1" depth="0.1" opacity="0.2"></a-box>
        </a-entity>
      </a-entity>
    `

    // omni-ui for keyboard+mouse (cellphone UI pending) sDoes NOT have laser controlls
    const MOUSE_AND_KEYBOARD_UI = `
      <a-entity id="camera-wrapper">
        <a-camera cursor="rayOrigin: mouse" look-controls="pointerLockEnabled: false" near="0.001">
            <a-text opacity="0.1" value="frames-per-second" width="0.8" position="0.2 -0.3 -0.9"></a-text>
            <a-text opacity="0.1" fps-counter position="0.2 -0.4 -0.9"></a-text>
            <a-cylinder id="fing-longer" position="0.2 -0.4 -0.9" radius="0.01" height= "1.0" rotation="90 0 0" color="beige" opacity="1.0"></a-cylinder>
        </a-camera>
        <a-entity pos-trail-line laser-controls="hand: left" grip-to-move="targetID: camera-wrapper" raycaster="objects: .clickable; far:4">
          <a-box  height="0.1" width="0.1" depth="0.1" opacity="0.2"></a-box>
          <!-- link back to home page for oculus quest  -->
          <a-box id="home-button" class="clickable" height="0.02" width="0.05" depth="0.05" position="0 -0.05 0" color="red"></a-box>
        </a-entity>
        <a-entity pos-trail-line laser-controls="hand: right" grip-to-move="targetID: camera-wrapper" raycaster="objects: .clickable; far:4">
          <a-sphere line-drawer particle-applicator radius="0.0005" position="-0.05 -0.05 -0.05"></a-sphere>
          <a-box height="0.1" width="0.1" depth="0.1" opacity="0.2"></a-box>
        </a-entity>
      </a-entity>
    `

    this.el.innerHTML = POSITIONAL_UI;
    // this.el.innerHTML += POSITIONAL_UI;

    {
      let button = document.querySelector("#home-button")
      button.addEventListener("click", () => {
        // window.location.href = 'https://supermedium.com/supercraft/';
        window.location.href = 'https://jedpimentel.github.io/stuff/demo/oculus-quest/index.html';
      }); 
    }

    // link="href: /"

          // <a-link class="clickable" position="0 -0.05 0" href="/" title="HOME"></a-link>
  }
})





// SLIDER - a line with an interactable entity that slides from left to right

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
    segments: {type: 'number', default: 72}//Oculus Quest target framerate: 72
  },
  init: function() {
    this.segment_index = 0;
    this.position = new THREE.Vector3();
    this.last_pos = new THREE.Vector3();

    this.geometry = new THREE.Geometry();
    this.material = new THREE.LineBasicMaterial({color: 0x404040});
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
    segments: {type: 'number', default: 1024 * 16}
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

const vtool = {// not used, started but didn't finish
  // takes an array of THREE.Vector3 from/to pairs and draws them
  drawSegments: function(traces) {
    const geometry = new THREE.Geometry();
    const material = new THREE.LineBasicMaterial({color: 0x888888});
    for(let [from, to] of traces) {
      geometry.vertices.push(from)
      geometry.vertices.push(to)
    }
    const line_segments = new THREE.LineSegments(geometry, material);

    // not yet sure if this will work
    // console.log('diong drawSegments', line_segments)
    document.querySelector('a-scene').sceneEl.object3D.add(line_segments);
  }
}

{

  let a = [];
  let line;


  const from = new THREE.Vector3(0, 0, 0);
  const to = new THREE.Vector3(1, 0, 0);

  const step = new THREE.Vector3(0, 0.1, 0);
  for(let i = 0; i < 10; i++) {
    a.push([from.clone(), to.clone()]);

    from.add(step);
    to.add(step);
  }

  console.log('yo')
  document.addEventListener('DOMContentLoaded', () => {
    // keeping for reference, this was somehow causing breakage, I dunno why
    // vtool.drawSegments(a)
  })

  {
    // make a 10x10 floor grid from (-5, 0, 5) to (5, 0, -5)
    let grid = []
    const from = new THREE.Vector3(-5, 0, 5);

    const xOffset = new THREE.Vector3(10, 0, 0);
    const zStep =  new THREE.Vector3(0, 0, -1);

    const zOffset = new THREE.Vector3(0, 0, 10);
    const xStep = new THREE.Vector3(1, 0, 0);

    // draw x-wise lines
    for(let i = 0; i < 10; i++) {
      grid.push([
        from.clone(),
        from.clone().add(xOffset)
      ])
      from.add(zStep);
    }
    // draw topmost line without doing zStep after
    grid.push([from.clone(), from.clone().add(xOffset)])
    // draw z-wise lines 
    for(let j = 0; j <= 10; j++) {
      grid.push([
        from.clone(),
        from.clone().add(zOffset)
      ]);
      from.add(xStep);// goes over at end but is not an issue
    }
    document.addEventListener('DOMContentLoaded', () => {
      vtool.drawSegments(grid)
      vtool.drawSegments(a)
    })
  }

  // takes a list of [from, to] THREE.Vector3 pairs, and an offset THREE.Vector3
  function offsetSegments(segments, offset) {
    for(let [from, to] of segments) {
      from.add(offset)
      to.add(offset)
    }
  }
}


// console.log('yeet')

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
// see comment below for an example debug-menu log
AFRAME.registerComponent('debug-menu', {
  //
  init: function() {
    let line_y = 0;

    const Y_STEP = 0.2;
    const Y_FLOOR = -8;

    this.log = function(val) {
      const text = document.createElement('a-text');
      text.setAttribute('value', val);
      line_y -= Y_STEP;
      text.setAttribute('position', `0 ${line_y} 0`);
      this.el.appendChild(text);

      if(line_y < Y_FLOOR) {
        this.object3D.position.y += line_y;
      }

    }
    document.addEventListener('debug-menu-log', (e) => {
      this.log('space');
      this.log(JSON.stringify(e.detail));
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

// console.log('yeet')

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
    this.input.setAttribute('accept', 'image/*')

    this.input.addEventListener('input', files => this.parseFiles());

    this.sceneEntities = new Array(0);
    this.filesAsJSON = new Array(0);

    this._help = "use '.downloadScene()' method to download image scenes. (first drag image files into the scene window)"

    this.target = {
      x: 0,
      y: 1,
      z:-2
    }

    window.addEventListener('DOMContentLoaded', e => {
      document.body.append(this.anchor)
      document.body.append(this.input)
      this.sceneEl = document.querySelector('a-scene')//is this even being used???
      // handle dropping files into scene
      // let thing = e => {
      //   console.log(e)
      //   e.preventDefault()
      // }

      // document.querySelector('body').setAttribute('ondragover', e => {
      document.querySelector('body').ondragover = e => {
        // console.log(e)
        e.preventDefault();
      };
      document.querySelector('body').ondrop = e => {
        console.log(e)
        e.preventDefault();
        if (e.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          console.log('marco')
          for (var i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
              var file = e.dataTransfer.items[i].getAsFile();
              this.parseDroppedFile(file)
              // console.log('... file[' + i + '].name = ' + file.name);
            }
          }
        } else {
          // Use DataTransfer interface to access the file(s)
          console.log('polo')
          // for (var i = 0; i < e.dataTransfer.files.length; i++) {
          //   console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          // }
        }
      };
    });
    document.addEventListener('ybuttondown', e => {
      this.askUserForFiles();
    });
    document.addEventListener('xbuttondown', e => {
      this.rumFromParsedFiles('test');
    });

    this.dinger = document.createElement('audio')
    this.dinger.src = '../../sine-432hz-pluck.flac';

  };
  askForFiles() {
    this.input.click();
  }
  downloadScene(name) {
    this.rumFromParsedFiles(name);
  }
  parseDroppedFile(file) {
    if(file.type.includes('image/')) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let parsedFile = {
          dataURL: reader.result,
          position: `${this.target.x++} ${this.target.y+.30} ${this.target.z}`,
        }
        this.rumBlobToEntity(parsedFile);
      }
      reader.readAsDataURL(file); 
    }
  }
  parseFiles() {
    this.parsedFiles = new Array(this.input.files.length)
    let files = this.input.files;
    if(files.length === 1 && files[0].name.includes('.rum')) {
      this.parseRum(files[0]);
    } else {
      for(let i = 0; i < this.input.files.length; i++) {
        let file = this.input.files[i];
        if(file.type.includes('image/')) {
          let reader = new FileReader();
          let idx = i;
          reader.onload = (e) => {
            let parsedFile = this.parsedFiles[idx] = {
              dataURL: reader.result,
              position: `${i} 1 -2`,
            }
            this.rumBlobToEntity(parsedFile);
          }
          reader.readAsDataURL(file); 
        }
      }
    }
  };
  parseRum(rumFile) {
    if(rumFile.name.includes('.rum')) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.parsedFiles = JSON.parse(reader.result);
        this.renderParsedFiles();
      }
      reader.readAsText(rumFile); 
    }
  };
  rumFromParsedFiles(name) {
    let file = new File([JSON.stringify(this.parsedFiles)], `${name}.rum`);
    this.downloadFile(file)
  };
  downloadFile(file) {
    let a = URL.createObjectURL(file)//<-- check if garbage collection is needed?
    // will file still be referenced elsewhere ???
    this.anchor.href = a;
    this.anchor.download = file.name
    this.anchor.click()
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
    for(let i = 0; i < this.parsedFiles.length; i++) {
      this.rumBlobToEntity(this.parsedFiles[i]);
    }
  }
  rumBlobToEntity(rumBlob) {
    let entity = document.createElement('a-image')
    entity.setAttribute('src', rumBlob.dataURL)
    entity.setAttribute('position', rumBlob.position)
    this.sceneEntities.push(entity)
    document.querySelector('a-scene').appendChild(entity)
  };
  fromBase64() {

  };
  toBase64() {

  };
  saveRum(name) {


  };
  // renderInputFiles
  // https://stackoverflow.com/questions/7951326/save-image-to-users-disk-using-javascript
  toGLTF(wut) {
    // TODO: REMOVE THIS, and remove the exporter js file
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
  ding() {
    if (this.dinger.paused) {
      this.dinger.play();
    } else {
      this.dinger.currentTime = 0;
    }
  }
}


window.bot = new Robot()
// window.addEventListener('DOMContentLoaded', e => {
//   // document.querySelector('a-scene').object3D.add(particleSystem)
//   console.log('test')
//   window.bot = new Robot()
// })

// console.log('yeet')

// zoidberg visualizes quicksort ==> move this to a better file than this one
if (false) {// ignore this block


  // data: array of ints
  // x, y, z: floats
  // highlight_indeces: array of indeces to highlight
  function numColumn(data, x, y, z, highlight_indeces=[]) {
    this.line = 0;
    const LINE_HEIGHT = 0.2;
    const scene = document.querySelector('a-scene')

    for (let i = 0; i < data.length; i++) {

      const text = document.createElement('a-text');
      text.setAttribute('value', data[i]);
      text.setAttribute('position', `${x} ${y - this.line*LINE_HEIGHT} ${z}`);
      if(highlight_indeces.includes(i)) {
        text.setAttribute('color', 'red');
      }
      this.line++
      scene.appendChild(text);
    }
  }


  let x = -4
  let y = 3;
  let z = -8;
  const X_SPAN = 1.2

  function sort(arr) {
    numColumn(arr, x, y, z);
    x += X_SPAN

    qSort(arr)

    numColumn(arr, x, y, z);
    x += X_SPAN
  }

  function qSort(arr, l = 0, r = arr.length - 1) {

      if (r - l < 1) return;


      // toggle for debugging
      // let zlog = console.log;
      let zlog = () => { };

      const pivot_index = l + Math.floor((r - l) / 2);
      const pivot = arr[pivot_index];
      zlog(arr)
      zlog('pivot value is', pivot, 'range indeces:', l, '->', r)



      // print the unsorted segment, highlighting the pivot
      let prettyArr = arr.map((val, idx) => (l <= idx && idx <= r) ? val : " ")
      // numColumn(prettyArr, x, y, z, [pivot_index]);
      x += X_SPAN

      zlog(arr)
      let left = l;
      let right = r;

      zlog("AA#", l, left, right, r)

      let done = false;
      while (!done && right - left >= 1) {
          done = true;

          // indeces that contain the pivot value aren't touched
          
          if (arr[left] <= pivot && right - left > 1) {
              // can this be optimized by also doing a while <pivot
              left++;
              done = false;
              zlog("LE#", l, left, right, r)
          }
          if (arr[right] >= pivot && right - left > 1) {
              right--;
              done = false;
              zlog("RI#", l, left, right, r)
          }
          // if (!done && arr[left] > pivot || arr[right] < pivot) {
          if (arr[left] >= pivot && arr[right] <= pivot && arr[left] !== arr[right]) {
              zlog('swapping indices', left, 'and', right)
              swap(arr, left, right);
              zlog(arr)
          }
      }
      zlog("FA#", l, left, right, r)

      if (arr[left] > pivot) {
          left--;
          right--;
      }

      zlog("FE#", l, left, right, r)

      // print the work done on this iteration
      prettyArr = arr.map((val, idx) => (l <= idx && idx <= r) ? val : " ")
      // numColumn(prettyArr, x, y, z);
      x += X_SPAN
      // and a little bit more, to render as column pairs
      x += 0.15

      if (r - l < 2) {
          // exit if we were only sorting two indeces
          // zlog("exiting")
          return;
      } else {
          // values up until index (left-1) will include the pivot
          // const left_count = r - l
          if (l < left && left < r) {
              zlog('sort left of', "###", l, left, right, r);
              qSort(arr, l, left);
          }
          
          if (l < right && right < r) {
              zlog('sort right of', "###", l, left, right, r);
              qSort(arr, right, r);
          }
      }
      function swap(arr, i, j) {
          const hold = arr[i]
          arr[i] = arr[j];
          arr[j] = hold;
      }
  }

  {
    // let arr = `51403690 6801342 51823919 7333805 93468017 85782415 58118169 30631790 32727891 83917600 
    // 19839156 37224683 98232752 29122289 9105772 36107106 78312243 453735 8420576 43854024 49240721 5861120
    //  36555031 77979692 43491918 74255615 45922216 6141342 24228750 97424973 106118 28148792 56742667 4446390
    //   35482598 50210684 90228805 46117119 33358826 75473048 82551071 53197983 65214083 80783823 34836624
    //    26836208 69407282 13148867 27289943 30344210 57002892 76530664 88721683 46074275 7026708 84729953 
    //    72846242 52948924 90871296 97074992 2890249 90977414 77740137 12149268 95423804 13222735 62359952 
    //    38168961 11856206 95718779 66158362 94407278 1433114 31372445 27707453 36269738 58208653 49631087
    //     49418606 38014949 79975298 58937850 67061965 21213333 5012125 74088674 5943286 30374720 79553950
    //      96814582 27449712 34960552 40308349 57706201 47109820 88248505 23445288 61986125 26417467 35301495 
    //      57704904 92575829 29708773 59138018 76464626 9932578 47924108 87189632 59563666 49859066 25204581
    //       92055316 61313268 92266546 13268649 18841746 18871572 19211935 49216466 98425523 68542870 29182530 
    //       85902427 8851219 86888732 33012247 49616076 10334020 94998372 76033543 45635515 5219628 21125724
    //        27860640 16873998 50106703 37793219 64798107 37296335 97356885 67173525 15017268 89412201 28486794 
    //        7283814 55197202 47328540 26155387 74409137 96545006 77097262 95468359 25727536 15516041 56835930
    //         12616268 48528288 6452007 75466641 96043013 35001902 21102156 53778993 8643979 48962797 70652992 
    //         58750682 39272368 87967451 96047017 36629253 55140976 63580637 78557806 36144122 70864451 33755008 
    //         83472662 49536190 60680497 80017668 79149804 56148857 58261557 94665845 65501139 70877825 95710486 
    //         71953146 46344466 44269851 59471401 19962975 98048844 68115380 21442124 21218188 26866062 60714492 991`.split(' ').map(x => Number(x))
    // let arr = `51403690 6801342 51823919 7333805 93468017 85782415 58118169 30631790 32727891 83917600 60714492 991`.split(' ').map(x => Number(x))

    let arr = [6,2,5,3,8,1,5,3,9,8,3]

    document.addEventListener('DOMContentLoaded', () => {
      console.log('doing the thing with', arr)
      sort(arr)
    });
  }
}
// console.log('yeet')

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




// experimental
AFRAME.registerComponent('particle-applicator', {
  schema: {
    segments: {type: 'number', default: 1024 * 16}
  },
  init: function() {
    this.particle_index = 0;
    this.position = new THREE.Vector3();

    this.geometry = new THREE.Geometry();
    this.material = new THREE.ParticleBasicMaterial({
      color: 0x0000FF,
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