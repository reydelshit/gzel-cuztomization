import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const tshirtDesigns = [
  {
    id: 1,
    title: 'Black line in green shirt',
    subtitle: 'Green shirt with black line',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-gray-800',
  },
  {
    id: 2,
    title: 'Curly black design',
    subtitle: 'White shirt with Curly line design',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-blue-800',
  },
  {
    id: 3,
    title: 'Two line',
    subtitle: 'Lines in a white shirt',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-red-600',
  },
  {
    id: 4,
    title: "Ninong Ry's and friends",
    subtitle: 'Group photo',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-red-600',
  },

  {
    id: 5,
    title: 'Black line in green shirt',
    subtitle: 'Green shirt with black line',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-gray-800',
  },
  {
    id: 6,
    title: 'Curly black design',
    subtitle: 'White shirt with Curly line design',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-blue-800',
  },
  {
    id: 7,
    title: 'Two line',
    subtitle: 'Lines in a white shirt',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-red-600',
  },
  {
    id: 8,
    title: "Ninong Ry's and friends",
    subtitle: 'Group photo',
    imageUrl: '/placeholder.svg?height=300&width=300',
    bgColor: 'bg-red-600',
  },
];

const SavedDesigns = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {tshirtDesigns.map((design) => (
          <div key={design.id} className="flex flex-col">
            <div className="text-sm font-medium">{design.title}</div>
            <div className="text-xs text-gray-500 mb-2">{design.subtitle}</div>
            <div className={`${design.bgColor} rounded overflow-hidden`}>
              <div className="relative aspect-square">
                <img
                  src={design.imageUrl}
                  alt={design.title}
                  className="object-cover"
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
