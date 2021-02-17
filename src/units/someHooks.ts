import { useEffect, useRef } from "react"
import * as THREE from "three"

export const useThree = () => {
  const ref = useRef({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(45, 1, 0.1, 1000),
    renderer: new THREE.WebGLRenderer(),
  })
  return ref.current
}

export function usePrevValue<T> (value: T): T {
  const prev = useRef(value)

  useEffect(() => {
    prev.current = value
  }, [value])
  return prev.current
}