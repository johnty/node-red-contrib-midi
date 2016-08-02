/**
 * Copyright 2015 Urbiworx
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
	var midi = require('midi');
   var outputPort;
   
   function initMIDI(port) {
      outputPort = new midi.output();
      console.log("Open output port "+parseInt(port,10));
      console.log("   port name = " + outputPort.getPortName(parseInt(port,10)));
      console.log("Port count:"+outputPort.getPortCount());
      outputPort.openPort(parseInt(port,10));
   }

    function MidiOutNode(n) {
      RED.nodes.createNode(this,n);
		var that=this;
      this.name = n.name || "";
		this.port = (typeof(n.port)=="undefined")?"0":n.port;
      initMIDI(this.port);
		this.on("close",function() {
         outputPort.closePort();
		});

      this.on('input', function(msg) {
         console.log("MIDI OUT "+msg.payload);
         outputPort.sendMessage(msg.payload);
      });
         
    }
    RED.nodes.registerType("midi_out",MidiOutNode);

}
