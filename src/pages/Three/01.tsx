import Stats from 'stats.js'
import { useEffect, useRef, useState } from 'react'
// @ts-ignore
import AsciiEffect from 'three-asciieffect'

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  SpotLight,
  MeshLambertMaterial,
} from 'three'

interface Instances {
    scene: Scene,
    camera: PerspectiveCamera,
    rendener: WebGLRenderer,
}

const w = 1000, h = 500

const Three01: React.FC = () => {
  const container = useRef<HTMLDivElement>(null)
  const [ins, setIns] = useState<Instances>(() => ({
    scene: new Scene(),
    camera: new PerspectiveCamera(45, w / h, 0.1, 1000),
    rendener: new WebGLRenderer(),
  }))
  useEffect(() => {
    const stats = new Stats()
    stats.showPanel(1)
    document.body.appendChild(stats.dom)

    const draw = () => {
      console.count('draw')
      stats.begin()
      const { scene, camera, rendener } = ins

      rendener.setClearColor(0xEEEEEE, 1.0)
      rendener.setSize(w, h)
      rendener.shadowMap.enabled = true

      const axes = new AxesHelper(20)
      scene.add(axes)

      const planeGeometry = new PlaneGeometry(60, 20, 1, 1)
      const planeMaterial = new MeshLambertMaterial({ color: 0xCCCCCC })

      const plane = new Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -0.5 * Math.PI
      plane.position.set(15, 0, 0)
      plane.receiveShadow = true
      scene.add(plane)

      const cubeGeometry = new BoxGeometry(4, 4, 4)
      const cubeMaterial = new MeshLambertMaterial({ color: 0xff0000 })
      const cube = new Mesh(cubeGeometry, cubeMaterial)
      cube.castShadow = true
      scene.add(cube)

      const sphereGeometry = new SphereGeometry(4, 20, 20)
      const sphereMaterial = new MeshLambertMaterial({ color: 0x777777ff })
      const sphere = new Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(20, 4, 2)
      sphere.castShadow = true
      scene.add(sphere)

      const spotLight = new SpotLight(0xffffff)
      spotLight.position.set(-40, 60, -10)
      spotLight.castShadow = true
      scene.add(spotLight)

      camera.position.set(-30, 40, 30)
      camera.lookAt(scene.position)

      container.current!.appendChild(rendener.domElement)

      /*
      S-AsciiEffect 将图形用文本形式渲染
      const effect = new AsciiEffect(rendener)
      effect.setSize(w, h)
      container.current!.appendChild(effect.domElement)
      E-AsciiEffect
      */
      stats.end()

      let step = 0
      const render = () => {
        rendener.render(scene, camera)
        /*
        S-AsciiEffect
        effect.render(scene, camera)
        E-AsciiEffect
        */
        requestAnimationFrame(render)
        // cube.rotation.x += 0.2
        // cube.rotation.y += 0.2
        cube.rotation.z += 0.2
        step += 0.05
        sphere.position.x = 20 + (10 * (Math.cos(step)))
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))

      }
      render()
    }
    container.current && draw()
    return () => {
      ins.rendener.forceContextLoss()
    }
  }, [ins])
  return (
    <div ref={container}></div>
  )
}

export default Three01
