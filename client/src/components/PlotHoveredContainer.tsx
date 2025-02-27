import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { createPortal } from 'react-dom';
import axios from 'axios';

interface PlotProps {
  id: string;
  d: string;
  onClick: () => void;
  selectedPatay: string;
}

interface GraveItem {
  grave_id: number;
  fullname: string;
  birthday: string;
  date_of_death: string;
  age: number;
  created_at: string;
  plot_no: number;
}

export default function Plot({ id, d, onClick, selectedPatay }: PlotProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement>(null);

  const [graves, setGraves] = useState<GraveItem[]>([]);

  const fetchGraves = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/grave/${id}`,
      );

      console.log(res.data, 'selected graves');

      setGraves(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGraves();
  }, []);

  useEffect(() => {
    if (pathRef.current && showTooltip) {
      const rect = pathRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  }, [showTooltip]);

  const renderTooltip = () => {
    if (!showTooltip) return null;

    return createPortal(
      <div
        style={{
          position: 'fixed',
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          transform: 'translate(-50%, -100%)',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <div className="relative flex flex-col items-center">
          <div className="bg-white text-black rounded-lg px-3 py-2 shadow-lg mb-1">
            <span className="text-sm whitespace-nowrap text-black">{id}</span>

            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white text-black transform rotate-45" />
          </div>
          <MapPin className="text-white" size={24} />
        </div>
      </div>,
      document.body,
    );
  };

  return (
    <>
      <path
        ref={pathRef}
        id={id}
        d={d}
        // fill={graves.length >= 5 ? 'red' : fill}
        // fill={
        //   selectedPatay.length > 0
        //     ? selectedPatay === id
        //       ? 'orange'
        //       : fill
        //     : graves.length >= 5
        //     ? 'red'
        //     : fill
        // }

        fill={
          selectedPatay === id
            ? '#eab308'
            : graves.length === 0
            ? '#000000'
            : graves.length >= 5
            ? '#ef4444'
            : '#22c55e'
        }
        fillOpacity="1"
        fillRule="nonzero"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      />
      {renderTooltip()}
    </>
  );
}
