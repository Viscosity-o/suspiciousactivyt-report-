import { useRef, useEffect, useState } from "react";
// @ts-ignore
import ForceGraph2D from "react-force-graph-2d";

interface NodeType {
  id: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface LinkType {
  source: NodeType | string;
  target: NodeType | string;
  value: number;
}

interface GraphData {
  nodes: NodeType[];
  links: LinkType[];
}

export default function TransactionGraph() {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto zoom fit
  useEffect(() => {
    if (fgRef.current) {
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 80);
      }, 500);
    }
  }, [size, graphData]);

  // Fetch graph data
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const [nodesRes, linksRes] = await Promise.all([
          fetch("/api/nodes"),
          fetch("/api/links"),
        ]);

        const nodesData: NodeType[] = await nodesRes.json();
        const linksData: LinkType[] = await linksRes.json();

        setGraphData({ nodes: nodesData, links: linksData });
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, []);

  // Zoom controls
  const handleZoomIn = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom * 1.2);
    }
  };

  const handleZoomOut = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom / 1.2);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">

      {/* Zoom Buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm shadow-sm hover:bg-gray-50"
        >
          +
        </button>

        <button
          onClick={handleZoomOut}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm shadow-sm hover:bg-gray-50"
        >
          -
        </button>
      </div>

      {/* Graph */}
      {size.width > 0 && size.height > 0 && (
        <ForceGraph2D
          ref={fgRef}
          width={size.width}
          height={size.height}
          graphData={graphData}
          backgroundColor="#F9FAFB"

          // Node label
          nodeLabel={(node: NodeType) => `Account: ${node.id}`}

          // Custom node drawing
          nodeCanvasObject={(
            node: NodeType,
            ctx: CanvasRenderingContext2D,
            globalScale: number
          ) => {
            if (node.x === undefined || node.y === undefined) return;

            const label = node.id;
            const fontSize = 8 / globalScale;

            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "#1F3A5F";

            ctx.beginPath();
            ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillText(label, node.x + 6, node.y + 3);
          }}

          // Link styles
          linkDirectionalArrowLength={8}
          linkDirectionalArrowRelPos={1}

          linkWidth={(link: LinkType) => (link.value > 5000 ? 3 : 1.5)}

          linkColor={(link: LinkType) =>
            link.value > 5000 ? "#EF4444" : "#3B82F6"
          }

          linkCanvasObjectMode={() => "after"}

          // Custom link drawing
          linkCanvasObject={(
            link: LinkType,
            ctx: CanvasRenderingContext2D,
            globalScale: number
          ) => {
            const start = link.source as NodeType;
            const end = link.target as NodeType;

            if (!start?.x || !start?.y || !end?.x || !end?.y) return;

            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);

            ctx.strokeStyle = link.value > 5000 ? "#EF4444" : "#3B82F6";
            ctx.lineWidth = link.value > 5000 ? 2 : 1;
            ctx.stroke();

            const label = `₹${link.value}`;
            const fontSize = 6 / globalScale;

            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "#6B7280";

            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;

            ctx.fillText(label, midX, midY);
          }}

          // Physics
          d3VelocityDecay={0.3}
          d3AlphaDecay={0.02}
          cooldownTicks={100}

          onEngineStop={() => fgRef.current?.zoomToFit(400, 80)}

          // Interaction
          enablePanInteraction={true}
          enableZoomInteraction={true}

          minZoom={0.2}
          maxZoom={5}

          onNodeDragEnd={(node: NodeType) => {
            node.fx = node.x;
            node.fy = node.y;
          }}

          onNodeClick={(node: NodeType) =>
            alert(`Account ${node.id}`)
          }

          onLinkClick={(link: LinkType) =>
            alert(`Transaction: ₹${link.value}`)
          }
        />
      )}
    </div>
  );
}
