import { useThrottle, useThrottleFn } from 'ahooks'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
} from 'three'
import { usePrevValue, useThree } from '../../units/someHooks'

const Three02: React.FC = () => {
  const box = useRef<HTMLDivElement>(null)
  const { scene, camera, renderer } = useThree()
  const w = Number(box.current?.clientWidth || 0)
  const h = Number(box.current?.clientHeight || 0)
  useEffect(() => {
    const init = () => {
      scene.add(camera)
      const axes = new AxesHelper(1000)
      scene.add(axes)
      renderer.setClearColor(0xEEEEEE)

      const planeGeometry = new PlaneGeometry(60, 40, 1, 1)
      const planeMaterial = new MeshLambertMaterial()
      const plane = new Mesh(planeGeometry, planeMaterial)
      plane.position.set(0, 0, 0)
      plane.rotation.x = -Math.PI / 2
      scene.add(plane)

      const ambientLight = new AmbientLight(0xffffff)
      scene.add(ambientLight)

      const spotLight = new SpotLight(0xffffff)
      spotLight.position.set(-80, 120, 60)
      scene.add(spotLight)

      camera.position.set(-40, 60, 30)
      camera.lookAt(scene.position)
      console.count('init')
    }
    init()
  }, [])

  useEffect(() => {
    console.log(w, h)
    if(w && h) {
      camera.aspect = w/h
      renderer.setSize(w, h)
      console.log(box.current?.hasChildNodes())
      if(!box.current?.hasChildNodes()) {
        box.current!.appendChild(renderer.domElement)
      }
      renderer.render(scene, camera)
    }
  }, [w, h])
  const addCube = () => {
    let size = Math.ceil(Math.random() * 3) + 1,
      cubeGeometry = new BoxGeometry(size, size, size),
      cubeMaterial = new MeshLambertMaterial({ color: 0xffff00 }),
      cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true
    cube.name = 'cube-' + scene.children.length
    cube.position.x = -30 + Math.round((Math.random() * 30))
    cube.position.y = 0
    cube.position.z = -20 + Math.round((Math.random() * 20))
    scene.add(cube)
    renderer.render(scene, camera)
    console.log(scene.children.length)
  }
  return <>
    <div ref={box} style={{height: '100%', position: 'relative'}} ></div>
    <div style={{position: 'absolute', top: 0, right: 0, width: 200, height: 200, backgroundColor: '#ABC'}}>
      <div><button onClick={() => addCube()}>plus</button></div>
      <div>{scene.children.length}</div>
    </div>
  </>

}

export default Three02