import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TshirtDesignType {
  saveDesignID: number;
  designPath: string;
  designName: string;
  created_at: string;
  designData: object;
  user_id: number;
  isSuggestion: string;
}

const SuggestionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');
  const userID = localStorage.getItem('userID');
  const [tshirtDesigns, setTshirtDesigns] = useState<TshirtDesignType[]>([]);
  const [hoveredDesign, setHoveredDesign] = useState<number | null>(null);

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
    if (userRole === 'client') {
      navigate(
        `/client/create-design?tshirt=${encodeURIComponent(
          tshirt,
        )}&saveDesignID=${saveDesignID}&design=${encodeURIComponent(
          JSON.stringify(designData),
        )}&designName=${designName}`,
      );
    } else {
      navigate(
        `/create-design?tshirt=${encodeURIComponent(
          tshirt,
        )}&saveDesignID=${saveDesignID}&design=${encodeURIComponent(
          JSON.stringify(designData),
        )}&designName=${designName}`,
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header */}
      <header
        className={`sticky top-0 z-10 flex items-center justify-between p-4 px-6 bg-white rounded-bl-2xl ${
          userRole === 'admin' ? 'ml-6 ' : 'ml-0'
        }`}
      >
        <h1 className="text-2xl font-bold text-black">Sample Designs</h1>
        <Link to="/create-design">
          <Button className="transition-all hover:scale-105">
            <Plus size={16} className="mr-2" />
            Add new design
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {tshirtDesigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="rounded-full bg-gray-100 p-6 mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              No designs yet
            </h2>
            <p className="text-gray-500 max-w-md mb-6">
              Create your first t-shirt design by clicking the "Add new design"
              button above.
            </p>
            <Link to="/create-design">
              <Button>Get started</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tshirtDesigns
              .filter(
                (tshirt) =>
                  String(tshirt.user_id) === '0' &&
                  tshirt.isSuggestion === 'yes',
              )
              .map((design, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                  onMouseEnter={() => setHoveredDesign(design.saveDesignID)}
                  onMouseLeave={() => setHoveredDesign(null)}
                >
                  {/* Design Image */}
                  <div
                    className="relative w-full pt-[100%] overflow-hidden bg-gray-100 cursor-pointer"
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
                  >
                    <img
                      src={
                        design.designPath
                          ? `${import.meta.env.VITE_SERVER_LINK}/${
                              design.designPath
                            }`
                          : '/fallback-image.jpg'
                      }
                      alt={design.designName || 'T-shirt Design'}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay with actions on hover */}
                    <div
                      className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                        hoveredDesign === design.saveDesignID
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          design.designPath &&
                            handleTShirtClick(
                              `${import.meta.env.VITE_SERVER_LINK}/${
                                design.designPath
                              }`,
                              design.saveDesignID,
                              design.designData,
                              design.designName,
                            );
                        }}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          design.designPath &&
                            handleTShirtClick(
                              `${import.meta.env.VITE_SERVER_LINK}/${
                                design.designPath
                              }`,
                              design.saveDesignID,
                              design.designData,
                              design.designName,
                            );
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Design Info */}
                  <div className="p-4 flex flex-row items-center justify-between gap-3">
                    <h3
                      className="font-medium text-gray-800 truncate"
                      title={design.designName}
                    >
                      {design.designName || 'Untitled Design'}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SuggestionPage;
