import { useThrottle, useThrottleFn } from 'ahooks'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Stats from 'stats.js'
import {
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  AmbientLight,
  SpotLight,
  WebGLRenderer,
  AxesHelper,
  BoxGeometry,
  Color,
} from 'three'
import { usePrevValue, useThree } from '../../units/someHooks'
import * as dat from 'dat.gui'
import { render } from '@testing-library/react'


const Three02: React.FC = () => {
  const box = useRef<HTMLDivElement>(null)
  // const { scene, camera, renderer } = useThree()
  useEffect(() => {
    const init = () => {
      if(!box) return
      const w = Number(box.current?.clientWidth || 0)
      const h = Number(box.current?.clientHeight || 0)
      const stats = initStats()

      const scene = new Scene()
      const camera = new PerspectiveCamera(45, w/h, 0.1, 1000)
      scene.add(camera)
      const renderer = new WebGLRenderer()
      renderer.setSize(w, h)
      renderer.setClearColor(new Color(0xEEEEEE))
      renderer.shadowMap.enabled = true

      const axes = new AxesHelper(1000)
      scene.add(axes)

      const planeGeometry = new PlaneGeometry(60, 40, 1, 1)
      const planeMaterial = new MeshLambertMaterial({ color: 0xffffff })
      const plane = new Mesh(planeGeometry, planeMaterial)
      plane.position.set(0, 0, 0)
      plane.rotation.x = -Math.PI / 2
      plane.receiveShadow = true
      scene.add(plane)

      const ambientLight = new AmbientLight(0x0c0c0c)
      scene.add(ambientLight)

      const spotLight = new SpotLight(0xffffff)
      spotLight.position.set(-40, 60, -10)
      spotLight.castShadow = true
      scene.add(spotLight)

      camera.position.set(-30, 40, 30)
      camera.lookAt(scene.position)

      box.current?.appendChild(renderer.domElement)

      let step = 0

      class Controls {
        rotationSpeed = 0.5
        numberOfObjects = scene.children.length

        removeCube() {
          const allChild = scene.children, lastObj = allChild[allChild.length - 1]
          if(lastObj instanceof Mesh) {
            scene.remove(lastObj)
            this.numberOfObjects = scene.children.length
          }
        }

        addCube() {
          let size = Math.ceil(Math.random() * 3)
          const cubeGeometry = new BoxGeometry(size, size, size)
          const cubeMaterial = new MeshLambertMaterial({color: Math.random() * 0xffffff})
          const cube = new Mesh(cubeGeometry, cubeMaterial)
          cube.castShadow = true
          cube.name = 'cube-' + scene.children.length

          cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width))
          cube.position.y = Math.round((Math.random() * 5))
          cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height))

          scene.add(cube)
          this.numberOfObjects = scene.children.length
        }
        output() {
          console.log(scene.children.length)
        }
      }

      const controls = new Controls()

      const gui = new dat.GUI()
      gui.add(controls, 'rotationSpeed', 0, 0.5)
      gui.add(controls, 'addCube')
      gui.add(controls, 'removeCube')
      gui.add(controls, 'output')
      gui.add(controls, 'numberOfObjects').listen()

      render()

      function render() {
        stats.update()

        scene.traverse(e => {
          if(e instanceof Mesh && e !== plane) {
            e.rotation.x += controls.rotationSpeed
            e.rotation.y += controls.rotationSpeed
            e.rotation.z += controls.rotationSpeed
          }
        })

        requestAnimationFrame(render)
        renderer.render(scene, camera)
      }


      function initStats () {
        const stats = new Stats()
        stats.showPanel(0)
        stats.dom.style.position = 'absolute'
        stats.dom.style.top = '0px'
        stats.dom.style.right = '0px'
        stats.dom.style.left = 'unset'

        document.body.appendChild(stats.dom)
        return stats
      }
    }
    init()
  }, [])
  return <>
    <div ref={box} style={{height: '100%', position: 'relative'}} >
    </div>
    <div id="stats">
    </div>
  </>

}

export default Three02