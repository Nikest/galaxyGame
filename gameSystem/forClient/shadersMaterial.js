function ShadersMaterialModule() {

    let coreAPI;

    this.init = function (getCoreAPI) {
        coreAPI = getCoreAPI;
        this.init = afterInit;
    };

    this.getStarsFieldMaterial = function () {
        const vertexShader = `
            uniform float amplitude;
            attribute float size;
            attribute vec3 customColor;            
            varying vec3 vColor;            
            void main() {            
                vColor = customColor;            
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );            
                gl_PointSize = size * (100.0 / length( mvPosition.xyz ));            
                gl_Position = projectionMatrix * mvPosition;            
            }
        `;

        const fragmentShader = `
            uniform vec3 color;
            uniform sampler2D texture;        
            varying vec3 vColor;        
            void main() {        
                gl_FragColor = vec4( color * vColor, 1.0 );
                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );       
            }
        `;

        let imageData = 'data:image/png;base64,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';

        return new THREE.ShaderMaterial({
            uniforms: {
                amplitude: { type: "f", value: 1.0 },
                color:     { type: "c", value: new THREE.Color(0xffffff) },
                texture:   { type: "t", value: new THREE.TextureLoader().load(imageData)}
            },
            vertexShader:   vertexShader,
            fragmentShader: fragmentShader,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        });
    };

    this.getCircleMaterial = function () {
        const vertexShader = `
            attribute float size;
            attribute vec3 ca;            
            varying vec3 vColor;            
            void main() {            
                vColor = ca;                
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );                
                gl_PointSize = size;
                gl_PointSize = size * ( 100.0 / length( mvPosition.xyz ) );                
                gl_Position = projectionMatrix * mvPosition;            
            }
        `;

        const fragmentShader = `
            uniform vec3 color;
            uniform sampler2D texture;            
            varying vec3 vColor;            
            void main() {        
                gl_FragColor = vec4( color * vColor, 1.0 );
                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );        
            }
        `;

        function generateCircleTexture() {
            let canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            let context = canvas.getContext('2d');

            for(let i = 1; i < 33; i++) {
                context.beginPath();
                context.arc(64 / 2, 64 / 2, (64 / 4) + (i / 2), 0, 2 * Math.PI, false);
                context.fillStyle = "rgba(255, 255, 255, " + (1 / i + 0.8) + ")";
                context.fill();
            }

            return canvas;
        }

        let circleTexture = new THREE.Texture(generateCircleTexture());
        circleTexture.needsUpdate = true;

        return new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { type: "f", value: 1.0 },
                color: { type: "c", value: new THREE.Color(0xffffff) },
                texture: { type: "t", value: circleTexture }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true
        });
    };

    function afterInit() {
        console.error('Modules was initializes');
    }
}
