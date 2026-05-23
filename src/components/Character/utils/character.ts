import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;

            // Assign specific colors to character parts based on mesh/node names
            const skinColor = new THREE.Color("#d28268");
            const shirtColor = new THREE.Color("#1f1f1f");
            const pantColor = new THREE.Color("#111111");
            const hatColor = new THREE.Color("#e0e0e0");
            const brimColor = new THREE.Color("#111111");
            const shoeColor = new THREE.Color("#ffffff");

            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                if (mesh.material) {
                  // Clone material so we can uniquely color meshes sharing the 'default' material
                  mesh.material = (mesh.material as THREE.Material).clone();
                  const mat = mesh.material as any;

                  if (mat.color) {
                    const name = (mesh.name + (mesh.parent ? mesh.parent.name : "")).toLowerCase();

                    if (name.includes("body.shirt") || name.includes("shirt")) {
                      mat.color.copy(shirtColor);
                    } else if (name.includes("pant")) {
                      mat.color.copy(pantColor);
                    } else if (name.includes("shoe") || name.includes("sole")) {
                      mat.color.copy(shoeColor);
                    } else if (name.includes("plane.007")) {
                      mat.color.copy(brimColor); // Hat brim
                    } else if (name.includes("cube.002") || name.includes("hat")) {
                      mat.color.copy(hatColor); // Hat top
                    } else if (name.includes("ear") || name.includes("hand") || name.includes("neck") || name.includes("face")) {
                      mat.color.copy(skinColor);
                    } else if (name.includes("hair") || name.includes("eyebrow")) {
                      mat.color.setHex(0x111111);
                    } else if (mat.name === "default") {
                      // Fallback for any other default material part (likely the face/head if unnamed)
                      mat.color.copy(skinColor);
                    }
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
