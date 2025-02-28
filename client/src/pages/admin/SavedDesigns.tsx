import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface TshirtDesignType {
  saveDesignID: number;
  designPath: string;
  designName: string;
  created_at: string;
  designData: object;
}

const SavedDesigns = () => {
  const navigate = useNavigate();

  const [tshirtDesigns, setTshirtDesigns] = useState<TshirtDesignType[]>([]);

  const fetchDesigns = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/designs`,
      );
      console.log(res.data);

      setTshirtDesigns(res.data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  }, []);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  const deleteDesign = async (id: number) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_LINK}/designs/delete/${id}`,
      );
      console.log(res.data);

      toast({
        title: 'Design Deleted',
        description: 'Your design has been successfully deleted.',
      });

      fetchDesigns();
    } catch (error) {
      console.error('Error deleting design ID:', id, error);
    }
  };

  const handleTShirtClick = (
    tshirt: string,
    saveDesignID: number,
    designData: object,
    designName: string,
  ) => {
    navigate(
      `/create-design?tshirt=${encodeURIComponent(
        tshirt,
      )}&saveDesignID=${saveDesignID}&design=${encodeURIComponent(
        JSON.stringify(designData),
      )}&designName=${designName}`,
    );
  };

  return (
    <>
      {/* Header section */}
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">Sample designs</h1>
        <Link to="/create-design">
          <Button>
            <Plus size={16} className="mr-2" />
            Add new design
          </Button>
        </Link>
      </div>

      {/* T-shirt designs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {tshirtDesigns.map((design, index) => (
          <div key={index} className="flex flex-col">
            <div className="text-sm font-medium">{design.designName}</div>
            <Button
              onClick={() => {
                deleteDesign(design.saveDesignID);
              }}
              variant="destructive"
            >
              Delete
            </Button>
            {/* <div className="text-xs text-gray-500 mb-2">{design.subtitle}</div> */}
            <div className={` rounded overflow-hidden`}>
              <div className="relative aspect-square">
                <img
                  onClick={() =>
                    design.designPath &&
                    handleTShirtClick(
                      `${import.meta.env.VITE_SERVER_LINK}/${
                        design.designPath
                      }`,
                      design.saveDesignID,
                      design.designData,
                      design.designName,
                    )
                  }
                  src={
                    design.designPath
                      ? `${import.meta.env.VITE_SERVER_LINK}/${
                          design.designPath
                        }`
                      : '/fallback-image.jpg'
                  }
                  alt={design.designName || 'T-shirt Design'}
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedDesigns;
