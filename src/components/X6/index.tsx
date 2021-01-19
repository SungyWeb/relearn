import { useEffect, useRef } from 'react'
import { Graph, Node, Point } from '@antv/x6'
import '@antv/x6-react-shape'

const NodeComp = (props: any) => {
  console.log(props)
  return (
    <div style={{backgroundColor: '#abc'}}>
      <div style={{backgroundColor: 'orange'}}>表单触发</div>
      <div>表单中内容更新</div>
      <div>文件状态等于已归档</div>
    </div>
  )
}
export default function X6() {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const run = () => {
      console.log('run')
      Graph.registerNode(
        'org-node',
        {
          width: 180,
          height: 60,
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'image',
              selector: 'avatar',
            },
            {
              tagName: 'text',
              selector: 'rank',
            },
            {
              tagName: 'text',
              selector: 'name',
            },
          ],
          attrs: {
            body: {
              refWidth: '100%',
              refHeight: '100%',
              fill: '#FFFFFF',
              stroke: '#000000',
              strokeWidth: 2,
              rx: 4,
              ry: 4,
              pointerEvents: 'visiblePainted',
            },
            avatar: {
              width: 48,
              height: 48,
              refX: 8,
              refY: 6,
            },
            rank: {
              refX: 0.9,
              refY: 0.2,
              fontFamily: 'Courier New',
              fontSize: 14,
              textAnchor: 'end',
              textDecoration: 'underline',
            },
            name: {
              refX: 0.9,
              refY: 0.6,
              fontFamily: 'Courier New',
              fontSize: 14,
              fontWeight: '800',
              textAnchor: 'end',
            },
          },
        },
        true,
      )


      Graph.registerEdge(
        'org-edge',
        {
          zIndex: -1,
          attrs: {
            line: {
              fill: 'none',
              strokeLinejoin: 'round',
              strokeWidth: '2',
              stroke: '#4b4a67',
              sourceMarker: null,
              targetMarker: null,
            },
          },
        },
        true,
      )

      const graph = new Graph({
        container: container.current as HTMLDivElement,
        grid: true,

        connecting: {
          anchor: 'orth',
        },
      })

      graph.addNode({
        x: 40,
        y: 40,
        width: 100,
        height: 40,
        shape: 'react-shape',
        component: <NodeComp color="red" />,
      })
      function member(
        x: number,
        y: number,
        rank: string,
        name: string,
        image: string,
        background: string,
        textColor: string = '#000',
      ) {
        return graph.addNode({
          x,
          y,
          shape: 'org-node',
          attrs: {
            body: {
              fill: background,
              stroke: 'none',
            },
            avatar: {
              opacity: 0.7,
              'xlink:href': image,
            },
            rank: {
              text: rank,
              fill: textColor,
              wordSpacing: '-5px',
              letterSpacing: 0,
            },
            name: {
              text: name,
              fill: textColor,
              fontSize: 13,
              fontFamily: 'Arial',
              letterSpacing: 0,
            },
          },
        })
      }

      function link(source: Node, target: Node, vertices: Point.PointLike[]) {
        return graph.addEdge({
          vertices,
          source: { cell: source },
          target: { cell: target },
          shape: 'org-edge',
        })
      }

      const male =
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ'
      const female =
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*f6hhT75YjkIAAAAAAAAAAAAAARQnAQ'

      const bart = member(300, 70, 'CEO', 'Bart Simpson', male, '#30d0c6')
      const homer = member(
        90,
        200,
        'VP Marketing',
        'Homer Simpson',
        male,
        '#7c68fd',
        '#f1f1f1',
      )
      const marge = member(
        300,
        200,
        'VP Sales',
        'Marge Simpson',
        female,
        '#7c68fd',
        '#f1f1f1',
      )
      const lisa = member(
        500,
        200,
        'VP Production',
        'Lisa Simpson',
        female,
        '#7c68fd',
        '#f1f1f1',
      )
      const maggie = member(400, 350, 'Manager', 'Maggie Simpson', female, '#feb563')
      const lenny = member(190, 350, 'Manager', 'Lenny Leonard', male, '#feb563')
      const carl = member(190, 500, 'Manager', 'Carl Carlson', male, '#feb563')

      link(bart, marge, [{ x: 385, y: 180 }])
      link(bart, homer, [
        { x: 385, y: 180 },
        { x: 175, y: 180 },
      ])
      link(bart, lisa, [
        { x: 385, y: 180 },
        { x: 585, y: 180 },
      ])
      link(homer, lenny, [{ x: 175, y: 380 }])
      link(homer, carl, [{ x: 175, y: 530 }])
      link(marge, maggie, [{ x: 385, y: 380 }])

      graph.on('node:click', ({ e, x, y, node, view }) => {
        console.log(node)
      })
    }
    container.current && run()
  }, [container.current])
  return (
    <div id="aa" ref={container} style={{height: 1000}}>

    </div>
  )
}
